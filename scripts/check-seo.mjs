#!/usr/bin/env node
/**
 * SEO gate for the built site. Parses every HTML page in the build output and fails on:
 *   - a <title> over 65 characters
 *   - a meta description outside 70 to 165 characters
 *   - duplicate titles or duplicate descriptions
 *   - a missing canonical link or og:image
 *   - an og:image or twitter:image that is not an absolute URL
 *   - a missing og:image width, height or alt
 *   - an <h1> count other than 1
 *   - a JSON-LD block that does not parse, or an inner page without a BreadcrumbList
 *   - a <html lang> that does not match the page's language (Spanish pages live under /es/), or an og:locale that
 *     disagrees with it
 *   - hreflang alternates that are incomplete (en, es and x-default are all required once any is present), that do
 *     not include the page itself, that point at a missing page, or that are not reciprocal
 *   - an internal link to a page path without its trailing slash (GitHub Pages answers it with a redirect)
 *   - on Spanish pages only, the tighter authoring targets: a title over 60 characters, a description outside 140 to 155
 *
 * The authoring targets are tighter than the gate (titles of 60 or fewer, descriptions of 140 to 155), so a
 * page that slips a little still passes while a real regression fails.
 *
 * Usage: npm run build && npm run check:seo [dist-dir]
 * Add --report to print every title and description with its length.
 */
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const args = process.argv.slice(2);
const report = args.includes('--report');
const dist = resolve(args.find((a) => !a.startsWith('--')) ?? 'dist');

if (!existsSync(dist)) {
  console.error(`check:seo: ${dist} does not exist. Run "npm run build" first.`);
  process.exit(2);
}

const TITLE_MAX = 65;
const DESC_MIN = 70;
const DESC_MAX = 165;
// Spanish pages are held to the authoring targets, not just the gate.
const ES_TITLE_MAX = 60;
const ES_DESC_MIN = 140;
const ES_DESC_MAX = 155;

const LANGS = { en: 'en_US', es: 'es_LA' };
const langOfPage = (page) => (/^\/es(\/|$)/.test(page) ? 'es' : 'en');

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', trade: '™' };

function decode(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => ENTITIES[name.toLowerCase()] ?? match);
}

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else if (entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}

/** Content of the first <meta> whose name or property attribute equals key. */
function meta(head, key) {
  for (const tag of head.match(/<meta\b[^>]*>/gi) ?? []) {
    const id = tag.match(/\b(?:name|property)="([^"]*)"/i)?.[1];
    if (id !== key) continue;
    const content = tag.match(/\bcontent="([^"]*)"/i)?.[1];
    return content === undefined ? undefined : decode(content);
  }
  return undefined;
}

const isAbsolute = (value) => /^https?:\/\//i.test(value ?? '');

const files = (await walk(dist)).sort();
const problems = [];
const titles = new Map();
const descriptions = new Map();
const rows = [];
const alternates = new Map();
let jsonLdBlocks = 0;

/** Legacy-URL redirect stubs from redirects/legacy.mjs: a meta refresh and a link, nothing else. */
const isRedirectStub = (html) => /<meta http-equiv="refresh"/i.test(html) && !/<script\b|<main\b/i.test(html);
const fail = (page, message) => problems.push(`${page}: ${message}`);

for (const file of files) {
  const page =
    '/' +
    relative(dist, file)
      .replace(/index\.html$/, '')
      .replace(/\\/g, '/');
  const html = await readFile(file, 'utf8');
  if (isRedirectStub(html)) continue;
  const head = html.match(/<head[\s\S]*?<\/head>/i)?.[0] ?? '';

  const title = decode(head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '');
  const description = meta(head, 'description') ?? '';
  const noindex = /noindex/i.test(meta(head, 'robots') ?? '');
  rows.push({ page, title, description });
  const lang = langOfPage(page);
  const spanish = lang === 'es';

  // Internal page links must end in a slash: GitHub Pages redirects /contact to /contact/, and every page that links
  // to a redirect is flagged by crawlers. Files (a dot in the last segment) and fragments are left alone.
  for (const [, href] of html.matchAll(/<a\b[^>]*\shref="([^"]+)"/gi)) {
    const path = href.replace(/^https:\/\/delbuenostudio\.com/, '').split(/[?#]/)[0];
    if (path.startsWith('/') && !path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path))
      fail(page, `link to ${href} has no trailing slash (it redirects)`);
  }

  if (!title) fail(page, 'missing <title>');
  else if (title.length > TITLE_MAX) fail(page, `title is ${title.length} characters (max ${TITLE_MAX}): ${title}`);
  else if (spanish && title.length > ES_TITLE_MAX) {
    fail(page, `Spanish title is ${title.length} characters (max ${ES_TITLE_MAX}): ${title}`);
  }

  if (!description) fail(page, 'missing meta description');
  else if (description.length < DESC_MIN || description.length > DESC_MAX) {
    fail(page, `description is ${description.length} characters (allowed ${DESC_MIN} to ${DESC_MAX}): ${description}`);
  } else if (spanish && (description.length < ES_DESC_MIN || description.length > ES_DESC_MAX)) {
    fail(
      page,
      `Spanish description is ${description.length} characters (allowed ${ES_DESC_MIN} to ${ES_DESC_MAX}): ${description}`,
    );
  }

  if (title) titles.set(title, [...(titles.get(title) ?? []), page]);
  if (description) descriptions.set(description, [...(descriptions.get(description) ?? []), page]);

  if (!/<link\b[^>]*\brel="canonical"[^>]*\bhref="[^"]+"/i.test(head)) fail(page, 'missing canonical link');

  const ogImage = meta(head, 'og:image');
  if (!ogImage) fail(page, 'missing og:image');
  else if (!isAbsolute(ogImage)) fail(page, `og:image is not an absolute URL: ${ogImage}`);
  const twitterImage = meta(head, 'twitter:image');
  if (!twitterImage) fail(page, 'missing twitter:image');
  else if (!isAbsolute(twitterImage)) fail(page, `twitter:image is not an absolute URL: ${twitterImage}`);
  if (ogImage) {
    if (!meta(head, 'og:image:width') || !meta(head, 'og:image:height'))
      fail(page, 'missing og:image:width or og:image:height');
    if (!meta(head, 'og:image:alt')) fail(page, 'missing og:image:alt');
  }
  if (meta(head, 'twitter:card') !== 'summary_large_image') fail(page, 'twitter:card is not summary_large_image');

  const htmlLang = html.match(/<html\b[^>]*\blang="([^"]*)"/i)?.[1];
  if (htmlLang !== lang) fail(page, `<html lang="${htmlLang}"> but the page is ${lang}`);
  const ogLocale = meta(head, 'og:locale');
  if (ogLocale !== LANGS[lang]) fail(page, `og:locale is ${ogLocale}, expected ${LANGS[lang]}`);

  const canonical = head.match(/<link\b[^>]*\brel="canonical"[^>]*\bhref="([^"]+)"/i)?.[1];
  const links = [...head.matchAll(/<link\b[^>]*\brel="alternate"[^>]*\bhreflang="([^"]+)"[^>]*\bhref="([^"]+)"/gi)];
  if (links.length) {
    const map = Object.fromEntries(links.map(([, code, href]) => [code, href]));
    alternates.set(page, { map, canonical });
    for (const code of ['en', 'es', 'x-default']) if (!map[code]) fail(page, `hreflang "${code}" is missing`);
    if (canonical && map[lang] !== canonical) fail(page, `hreflang "${lang}" is not the page's own canonical URL`);
    if (map['x-default'] !== map.en) fail(page, 'hreflang x-default does not point at the English page');
    if (!meta(head, 'og:locale:alternate')) fail(page, 'page has hreflang alternates but no og:locale:alternate');
  }

  const body = html.slice(html.indexOf('</head>'));
  const h1 = (body.match(/<h1[\s>]/gi) ?? []).length;
  if (h1 !== 1) fail(page, `found ${h1} <h1> elements, expected 1`);

  const types = new Set();
  const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  for (const [, raw] of scripts) {
    jsonLdBlocks += 1;
    try {
      const data = JSON.parse(raw);
      const walkNode = (node) => {
        if (Array.isArray(node)) return node.forEach(walkNode);
        if (!node || typeof node !== 'object') return;
        for (const type of [].concat(node['@type'] ?? [])) types.add(type);
        Object.values(node).forEach(walkNode);
      };
      walkNode(data);
    } catch (error) {
      fail(page, `JSON-LD block does not parse: ${error.message}`);
    }
  }
  if (!types.has('Organization') || !types.has('WebSite'))
    fail(page, 'sitewide Organization or WebSite JSON-LD is missing');
  if (page !== '/' && page !== '/es/' && !noindex && !types.has('BreadcrumbList'))
    fail(page, 'inner page has no BreadcrumbList JSON-LD');
}

// Every alternate must exist and list the page back.
const toPage = (href) => new URL(href).pathname;
for (const [page, { map }] of alternates) {
  for (const [code, href] of Object.entries(map)) {
    const target = toPage(href);
    const theirs = alternates.get(target);
    if (!theirs) {
      fail(
        page,
        `hreflang "${code}" points at ${target}, which has no hreflang alternates (missing or not reciprocal)`,
      );
      continue;
    }
    if (toPage(theirs.map[langOfPage(page)] ?? '') !== page) {
      fail(page, `hreflang "${code}" target ${target} does not link back to this page`);
    }
  }
}

for (const [map, label] of [
  [titles, 'title'],
  [descriptions, 'description'],
]) {
  for (const [value, pages] of map) {
    if (pages.length > 1) fail(pages.join(', '), `duplicate ${label}: ${value}`);
  }
}

if (report) {
  for (const { page, title, description } of rows) {
    console.log(
      `${page}\n  [${String(title.length).padStart(2)}] ${title}\n  [${String(description.length).padStart(3)}] ${description}`,
    );
  }
  console.log('');
}

if (problems.length) {
  console.error(`check:seo: ${problems.length} problem${problems.length === 1 ? '' : 's'} in ${files.length} pages:\n`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}
console.log(
  `check:seo ok: ${files.length} pages, ${jsonLdBlocks} JSON-LD blocks parse, titles and descriptions are unique and within limits.`,
);
