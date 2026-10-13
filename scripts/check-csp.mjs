#!/usr/bin/env node
/**
 * Checks the built site against security/csp.json, the one place the Content-Security-Policy is defined.
 *
 * Fails when a page has:
 *   - an inline <script> (not JSON-LD or another data block) whose sha256 is not in the policy
 *   - any <style> element (the policy says style-src 'self')
 *   - style="" attributes, unless the policy allows them with style-src-attr 'unsafe-inline'
 *   - an on*= event-handler attribute, or a javascript: URL
 *   - a script or stylesheet loaded from another origin
 *   - a missing or different CSP <meta> tag, or one that comes after the first inline script or stylesheet link
 * And fails when docs/security/cloudflare.md does not quote the exact header policy.
 *
 * Usage: npm run build && npm run check:csp [dist-dir]
 * After editing the boot script in BaseLayout.astro the check prints the new hash to paste into security/csp.json.
 */
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { readdir, readFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';
import { allowsStyleAttributes, cspString, scriptHashes } from '../security/csp.mjs';

const dist = resolve(process.argv[2] ?? 'dist');
if (!existsSync(dist)) {
  console.error(`check:csp: ${dist} does not exist. Run "npm run build" first.`);
  process.exit(2);
}

const DATA_TYPES = /^(?:application\/(?:ld\+)?json|importmap|speculationrules|text\/(?:plain|template))$/i;
const allowedHashes = new Set(scriptHashes());
const styleAttrsAllowed = allowsStyleAttributes();
const expectedMeta = cspString({ meta: true });

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else if (entry.name.endsWith('.html')) yield path;
  }
}

const decode = (text) =>
  text
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&');
const attr = (tag, name) => {
  const match = new RegExp(`\\s${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`, 'i').exec(tag);
  return match ? decode(match[1] ?? match[2] ?? match[3] ?? '') : null;
};
const isForeign = (value) => /^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(value ?? '');

/** Legacy-URL redirect stubs from redirects/legacy.mjs: a meta refresh and a link, nothing else. */
const isRedirectStub = (html) => /<meta http-equiv="refresh"/i.test(html) && !/<script\b|<main\b/i.test(html);
const problems = [];
const seenHashes = new Map();
const unknownScripts = new Map();
let pages = 0;
let styleAttrCount = 0;

for await (const file of walk(dist)) {
  pages++;
  const name = relative(dist, file);
  const html = await readFile(file, 'utf8');
  if (isRedirectStub(html)) {
    pages--;
    continue;
  }
  const fail = (message) => problems.push(`${name}: ${message}`);

  // Inline scripts: hash them, then blank the script bodies so later regexes only see markup.
  let firstInline = Infinity;
  const markup = html.replace(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi, (all, attrs, body, offset) => {
    const type = attr(`<script ${attrs}`, 'type');
    const src = attr(`<script ${attrs}`, 'src');
    if (src !== null) {
      if (isForeign(src)) fail(`script loaded from another origin: ${src}`);
    } else if (!type || !DATA_TYPES.test(type)) {
      firstInline = Math.min(firstInline, offset);
      const hash = 'sha256-' + createHash('sha256').update(body, 'utf8').digest('base64');
      seenHashes.set(hash, (seenHashes.get(hash) ?? 0) + 1);
      if (!allowedHashes.has(hash)) {
        const known = unknownScripts.get(hash) ?? { pages: [], start: body.trim().slice(0, 50).replace(/\s+/g, ' ') };
        known.pages.push(name);
        unknownScripts.set(hash, known);
      }
    }
    return '<script></script>';
  });

  if (/<style[\s>]/i.test(markup)) fail('contains a <style> element (set build.inlineStylesheets to "never")');

  const tags = markup.match(/<[a-z][^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (/\son[a-z]+\s*=/i.test(tag)) fail(`event-handler attribute in ${tag.slice(0, 80)}`);
    if (/\s(?:href|src|action|formaction|xlink:href)\s*=\s*["']?\s*(?:javascript|vbscript):/i.test(tag)) {
      fail(`javascript: URL in ${tag.slice(0, 80)}`);
    }
    if (/\sstyle\s*=/i.test(tag)) styleAttrCount++;
    if (/^<link\b/i.test(tag) && /rel\s*=\s*["']?stylesheet/i.test(tag) && isForeign(attr(tag, 'href'))) {
      fail(`stylesheet loaded from another origin: ${attr(tag, 'href')}`);
    }
  }
  if (!styleAttrsAllowed && tags.some((tag) => /\sstyle\s*=/i.test(tag))) {
    fail('has style="" attributes but the policy has no style-src-attr allowance');
  }

  // The meta CSP must be the policy, and must come before any executable inline code.
  const metaTag = tags.find(
    (tag) => /^<meta\b/i.test(tag) && /http-equiv\s*=\s*["']?content-security-policy/i.test(tag),
  );
  if (!metaTag) fail('has no Content-Security-Policy <meta> tag');
  else {
    if (attr(metaTag, 'content') !== expectedMeta) fail('CSP <meta> tag differs from security/csp.json');
    const metaAt = html.indexOf(metaTag);
    const firstLink = html.search(/<link\b[^>]*rel\s*=\s*["']?stylesheet/i);
    if (metaAt > firstInline) fail('CSP <meta> tag comes after the first inline script');
    if (firstLink !== -1 && metaAt > firstLink) fail('CSP <meta> tag comes after the first stylesheet link');
  }
}

for (const [hash, { pages: where, start }] of unknownScripts) {
  problems.push(
    `inline <script> with hash '${hash}' is not in security/csp.json. Found on ${where.length} page(s), first ${where[0]}. ` +
      `It starts: ${start}...\n    If you changed the boot script on purpose, put this hash into script-src in security/csp.json.`,
  );
}
for (const hash of allowedHashes) {
  if (pages && !seenHashes.has(hash))
    problems.push(`security/csp.json: hash '${hash}' matches no inline script in the build (stale?)`);
}

// The documented header must be the same policy.
const docPath = 'docs/security/cloudflare.md';
const docs = await readFile(docPath, 'utf8');
if (!docs.split('\n').includes(cspString())) {
  problems.push(
    `${docPath}: the Content-Security-Policy line does not match security/csp.json. Expected:\n    ${cspString()}`,
  );
}

if (problems.length) {
  console.error(`check:csp: ${problems.length} problem(s) in ${dist}:\n`);
  for (const p of problems) console.error(`  ${p}`);
  process.exit(1);
}
const hashList = [...seenHashes].map(([h, n]) => `${h} x${n}`).join(', ');
console.log(
  `check:csp ok: ${pages} pages, inline scripts: ${hashList || 'none'}, no <style> elements, ` +
    `${styleAttrCount} style attributes (allowed by style-src-attr), meta CSP matches security/csp.json, docs match.`,
);
