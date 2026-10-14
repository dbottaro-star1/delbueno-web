#!/usr/bin/env node
/**
 * Confirms that every target in redirects/redirects.csv and redirects/es-subdomain.csv exists in the built site.
 * Usage: npm run build && npm run check:redirects
 */
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const dist = resolve(process.argv[2] ?? 'dist');
if (!existsSync(dist)) {
  console.error(`check:redirects: ${dist} does not exist. Run "npm run build" first.`);
  process.exit(2);
}

const FILES = ['redirects/redirects.csv', 'redirects/es-subdomain.csv'];
const rows = (await Promise.all(FILES.map((file) => readFile(file, 'utf8'))))
  .flatMap((text) => text.split('\n'))
  .map((line) => line.trim())
  .filter(Boolean)
  .map((line) => line.split(','));

const missing = [];
const seen = new Set();
for (const [source, target] of rows) {
  if (seen.has(source)) console.warn(`duplicate source: ${source}`);
  seen.add(source);
  // Targets are percent-encoded URLs, the built folders are not.
  const path = decodeURIComponent(new URL(target).pathname);
  if (!existsSync(join(dist, path, 'index.html')) && !existsSync(join(dist, path))) missing.push({ source, path });
}

if (missing.length) {
  console.error(`check:redirects: ${missing.length} of ${rows.length} targets are missing from ${dist}:\n`);
  for (const m of missing) console.error(`  ${m.source} -> ${m.path}`);
  process.exit(1);
}
console.log(`check:redirects ok: all ${rows.length} targets exist.`);
