#!/usr/bin/env node
/**
 * Pulls new shots from the owner's Dribbble account into the `shots` content collection.
 *
 *   DRIBBBLE_TOKEN=xxxx npm run sync:dribbble
 *
 * What it does:
 *   - Calls GET https://api.dribbble.com/v2/user/shots (paged, 100 per page).
 *   - For every shot that has no src/content/shots/<id>.json yet, downloads the image to
 *     src/assets/shots/<id>.<ext> and writes the JSON file.
 *   - For shots that already exist, it only refreshes `order` (position in the profile) and fills
 *     `video` if it was missing. Manual fields such as `featured`, `imageAlt`, `title` and `tags` are kept.
 *   - It never deletes files.
 *
 * Without DRIBBBLE_TOKEN it prints setup help and exits 0, so it is safe to run anywhere.
 * Only Node built-ins are used (Node 24 has fetch).
 *
 * The API response is untrusted input, so the script checks it before using it:
 *   - the shot page URL must be https://dribbble.com/shots/<id>... (it becomes a link on the site)
 *   - images are downloaded only from https://cdn.dribbble.com (also across redirects), with a 30 second
 *     timeout, a 15 MB size limit, and a check that the bytes are really a PNG, JPEG, GIF or WebP
 *   - the bearer token is only ever sent to https://api.dribbble.com
 */
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentDir = path.join(root, 'src/content/shots');
const assetsDir = path.join(root, 'src/assets/shots');
const API = process.env.DRIBBBLE_API_URL ?? 'https://api.dribbble.com/v2/user/shots';
const PER_PAGE = 100;
const MAX_PAGES = 50;
const TIMEOUT_MS = 30_000;
const MAX_IMAGE_BYTES = 15 * 1024 * 1024;
const IMAGE_HOST = 'cdn.dribbble.com';
const MAX_REDIRECTS = 3;
const SHOT_PAGE = /^https:\/\/dribbble\.com\/shots\/\d+(?:[-/][^\s]*)?$/;

const token = process.env.DRIBBBLE_TOKEN;

// The token goes to whatever host API points at, so the override may only name Dribbble's own API.
if (!API.startsWith('https://api.dribbble.com/')) {
  console.error('DRIBBBLE_API_URL must start with https://api.dribbble.com/ . Refusing to send the token elsewhere.');
  process.exit(1);
}

if (!token) {
  console.log(`DRIBBBLE_TOKEN is not set, so there is nothing to sync.

To get a token:
  1. Sign in at https://dribbble.com and open https://dribbble.com/account/applications/new
  2. Create an application (any name and website). Use https://dribbble.com as the callback URL.
  3. Open the application and generate a client access token with the "public" scope.
  4. Run it locally:   DRIBBBLE_TOKEN=your_token npm run sync:dribbble
     Or in GitHub:     Settings > Secrets and variables > Actions > New repository secret
                       Name: DRIBBBLE_TOKEN

See the "Playground shots" section of README.md for the full steps.`);
  process.exit(0);
}

/** Replace dashes and middots in copied text, per the site copy rules. */
const cleanCopy = (text) =>
  text
    .replace(/\s*[\u2014\u2013\u2015\u00b7]\s*/g, ': ')
    .replace(/\s+/g, ' ')
    .trim();

const stripHtml = (html) =>
  cleanCopy(
    String(html ?? '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, ' '),
  );

/** Read pixel size from a PNG, JPEG, GIF or WebP buffer. Returns null if unknown. */
function imageSize(buf) {
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  if (buf.length > 10 && buf.toString('ascii', 0, 3) === 'GIF') {
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) };
  }
  if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const kind = buf.toString('ascii', 12, 16);
    if (kind === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (kind === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (kind === 'VP8L') {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) {
        i += 1;
        continue;
      }
      const marker = buf[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      }
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return null;
}

function extensionFor(contentType, url) {
  const type = (contentType ?? '').split(';')[0].trim().toLowerCase();
  const byType = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif' };
  if (byType[type]) return byType[type];
  const fromUrl = path.extname(new URL(url).pathname).slice(1).toLowerCase().replace('jpeg', 'jpg');
  return ['png', 'jpg', 'webp', 'gif'].includes(fromUrl) ? fromUrl : null;
}

/** True when the bytes start like a PNG, JPEG, GIF or WebP file. */
function hasImageSignature(buf) {
  if (buf.length < 12) return false;
  const isPng = buf.readUInt32BE(0) === 0x89504e47;
  const isJpeg = buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff;
  const isGif = buf.toString('ascii', 0, 3) === 'GIF';
  const isWebp = buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP';
  return isPng || isJpeg || isGif || isWebp;
}

/** Parse a URL and accept it only if it is https on the allowed image host. */
function allowedImageUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname === IMAGE_HOST && !url.username && !url.password ? url : null;
  } catch {
    return null;
  }
}

/**
 * Download an image from the Dribbble CDN. Returns { bytes, contentType, finalUrl }, or throws a short Error.
 * Redirects are followed by hand so that every hop is checked against the host allowlist.
 */
async function downloadImage(imageUrl) {
  let url = allowedImageUrl(imageUrl);
  if (!url) throw new Error(`image URL is not https://${IMAGE_HOST}`);
  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    const res = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(TIMEOUT_MS) });
    if (res.status >= 300 && res.status < 400) {
      const next = allowedImageUrl(new URL(res.headers.get('location') ?? '', url).href);
      if (!next) throw new Error('image redirected to a host that is not allowed');
      url = next;
      continue;
    }
    if (!res.ok) throw new Error(`image download answered ${res.status}`);
    const declared = Number(res.headers.get('content-length') ?? 0);
    if (declared > MAX_IMAGE_BYTES) throw new Error(`image is larger than ${MAX_IMAGE_BYTES / 1024 / 1024} MB`);
    // Read the body in pieces so a missing or false content-length cannot get past the limit.
    const chunks = [];
    let total = 0;
    for await (const chunk of res.body) {
      total += chunk.length;
      if (total > MAX_IMAGE_BYTES) throw new Error(`image is larger than ${MAX_IMAGE_BYTES / 1024 / 1024} MB`);
      chunks.push(chunk);
    }
    return { bytes: Buffer.concat(chunks), contentType: res.headers.get('content-type'), finalUrl: url.href };
  }
  throw new Error('image redirected too many times');
}

async function api(page) {
  const res = await fetch(`${API}?per_page=${PER_PAGE}&page=${page}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' },
    redirect: 'error', // never forward the token to another host
    signal: AbortSignal.timeout(TIMEOUT_MS),
  });
  if (!res.ok) {
    const hint = res.status === 401 ? ' (the token is invalid or expired)' : '';
    throw new Error(`Dribbble API answered ${res.status}${hint}`);
  }
  return res.json();
}

async function fetchAllShots() {
  const shots = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const batch = await api(page);
    if (!Array.isArray(batch)) throw new Error('Dribbble API returned something other than a list');
    shots.push(...batch);
    if (batch.length < PER_PAGE) return shots;
  }
  console.warn(`Stopped after ${MAX_PAGES} pages (${shots.length} shots). Raise MAX_PAGES if this is expected.`);
  return shots;
}

/** Only video files served by Dribbble's own CDN are accepted (the site CSP allows nothing else). */
const VIDEO_URL = /^https:\/\/cdn\.dribbble\.com\/[^\s?#]+\.(webm|mp4)(\?[^\s#]*)?$/i;

/**
 * Animated shots carry a `video` object. Its files are WebM. The large preview is
 * light enough for looping cards; the full file is the fallback.
 */
function videoUrlFor(shot) {
  const v = shot.video ?? {};
  const candidates = [v.large_preview_url, v.xlarge_preview_url, v.url, v.small_preview_url];
  return candidates.find((u) => typeof u === 'string' && VIDEO_URL.test(u));
}

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}

const writeJson = (file, data) => writeFile(file, `${JSON.stringify(data, null, 2)}\n`);

await mkdir(contentDir, { recursive: true });
await mkdir(assetsDir, { recursive: true });

const existing = new Set(
  (await readdir(contentDir)).filter((f) => f.endsWith('.json') && !f.startsWith('_')).map((f) => f.slice(0, -5)),
);

const shots = await fetchAllShots();
console.log(`Dribbble returned ${shots.length} shots. ${existing.size} already in the repo.`);

let created = 0;
let updated = 0;

for (const [index, shot] of shots.entries()) {
  const id = String(shot.id);
  // The id becomes a file name, so refuse anything that is not a plain number.
  if (!/^\d+$/.test(id)) {
    console.warn(`Skipping a shot with an unexpected id: ${JSON.stringify(shot.id)}`);
    continue;
  }
  if (!SHOT_PAGE.test(String(shot.html_url ?? ''))) {
    console.warn(`Skipping ${id}: html_url is not a https://dribbble.com/shots/ link`);
    continue;
  }
  const order = index + 1;
  const file = path.join(contentDir, `${id}.json`);
  const video = videoUrlFor(shot);
  if (!video && (shot.animated || shot.video)) {
    // Field names and hosts only, so the log shows the API shape without dumping the payload.
    const v = shot.video && typeof shot.video === 'object' ? shot.video : {};
    const hosts = Object.values(v)
      .filter((u) => typeof u === 'string' && u.startsWith('http'))
      .map((u) => `${new URL(u).host}${path.extname(new URL(u).pathname)}`);
    const imgs = Object.entries(shot.images ?? {})
      .filter(([, u]) => typeof u === 'string' && u.startsWith('http'))
      .map(([k, u]) => `${k}:${new URL(u).host}${path.extname(new URL(u).pathname)}`);
    console.log(
      `no usable video for ${id}: animated=${Boolean(shot.animated)} video keys=[${Object.keys(v).join(', ')}] files=[${hosts.join(', ')}] images=[${imgs.join(', ')}]`,
    );
  }

  if (existing.has(id)) {
    const entry = await readJson(file);
    let changed = false;
    if (entry.order !== order) {
      entry.order = order;
      changed = true;
    }
    if (video && !entry.video) {
      entry.video = video;
      changed = true;
    }
    if (changed) {
      await writeJson(file, entry);
      updated += 1;
      console.log(`updated ${id}`);
    }
    continue;
  }

  const imageUrl = shot.images?.hidpi ?? shot.images?.normal;
  if (!imageUrl) {
    console.warn(`skipped ${id}: no image in the API response`);
    continue;
  }
  let download;
  try {
    download = await downloadImage(imageUrl);
  } catch (error) {
    console.warn(`skipped ${id}: ${error.message}`);
    continue;
  }
  const { bytes, contentType, finalUrl } = download;
  if (!hasImageSignature(bytes)) {
    console.warn(`skipped ${id}: the download is not a PNG, JPEG, GIF or WebP image`);
    continue;
  }
  const ext = extensionFor(contentType, finalUrl);
  if (!ext) {
    console.warn(`skipped ${id}: unsupported image type`);
    continue;
  }
  const size = imageSize(bytes) ?? { width: shot.width, height: shot.height };
  if (!Number.isFinite(size.width) || !Number.isFinite(size.height) || size.width < 1 || size.height < 1) {
    console.warn(`skipped ${id}: could not read the image size`);
    continue;
  }
  await writeFile(path.join(assetsDir, `${id}.${ext}`), bytes);

  const title = cleanCopy(shot.title ?? `Shot ${id}`);
  const description = stripHtml(shot.description);
  const entry = {
    title,
    url: shot.html_url,
    image: `../../assets/shots/${id}.${ext}`,
    // Placeholder. Replace with a sentence about what the UI shows before merging.
    imageAlt: description ? description.slice(0, 200) : `Dribbble shot: ${title}`,
    ...(video ? { video } : {}),
    width: size.width,
    height: size.height,
    ...(shot.published_at ? { publishedAt: shot.published_at.slice(0, 10) } : {}),
    tags: (shot.tags ?? []).map(cleanCopy),
    featured: false,
    order,
  };
  await writeJson(file, entry);
  created += 1;
  console.log(`created ${id}: ${title}`);
}

console.log(`Done. ${created} created, ${updated} updated.`);
