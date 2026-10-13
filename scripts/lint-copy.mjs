#!/usr/bin/env node
/**
 * Copy lint for the built site.
 *
 * House rule: no "AI punctuation" in site copy. This scans the built output for
 * em dashes, en dashes and middle dots in visible text, in the text-bearing
 * attributes (meta content, alt, title, aria-label, placeholder), in JSON-LD,
 * and in llms.txt, llms-full.txt and the RSS feed. Write ranges as "2 to 4 weeks".
 *
 * Usage: npm run build && npm run lint:copy [dist-dir]
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

const dist = resolve(process.argv[2] ?? 'dist');

const BANNED = [
  { char: '\u2014', name: 'em dash' },
  { char: '\u2013', name: 'en dash' },
  { char: '\u2015', name: 'horizontal bar' },
  { char: '\u00b7', name: 'middle dot' },
  { char: '\u22c5', name: 'dot operator' },
  { char: '\u2027', name: 'hyphenation point' },
];

const NAMED_ENTITIES = { mdash: '\u2014', ndash: '\u2013', middot: '\u00b7', horbar: '\u2015', sdot: '\u22c5' };

function decodeEntities(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (match, name) => NAMED_ENTITIES[name.toLowerCase()] ?? match);
}

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

/** Pull out every string of author-written copy from a built HTML document. */
function extractHtmlCopy(html) {
  const chunks = [];

  // JSON-LD carries descriptions, so it counts as copy.
  for (const m of html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    chunks.push({ where: 'json-ld', text: m[1] });
  }

  // Text-bearing attributes.
  for (const m of html.matchAll(/\s(content|alt|title|aria-label|placeholder)=("([^"]*)"|'([^']*)')/gi)) {
    chunks.push({ where: `attribute ${m[1].toLowerCase()}`, text: m[3] ?? m[4] ?? '' });
  }

  // Visible text: drop non-visible blocks, then tags.
  const visible = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg|template)\b[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<title\b[^>]*>([\s\S]*?)<\/title>/gi, ' $1 ')
    .replace(/<[^>]+>/g, ' ');
  chunks.push({ where: 'text', text: visible });

  return chunks;
}

function findProblems(label, where, rawText) {
  const text = decodeEntities(rawText);
  const problems = [];
  for (const { char, name } of BANNED) {
    let index = text.indexOf(char);
    while (index !== -1) {
      const start = Math.max(0, index - 40);
      const end = Math.min(text.length, index + 41);
      const snippet = text.slice(start, end).replace(/\s+/g, ' ').trim();
      problems.push({ label, where, name, snippet });
      index = text.indexOf(char, index + 1);
    }
  }
  return problems;
}

if (!existsSync(dist)) {
  console.error(`lint:copy: ${dist} does not exist. Run "npm run build" first.`);
  process.exit(2);
}

const files = await walk(dist);
const targets = files.filter(
  (f) => /\.html$/.test(f) || /\/llms(-full)?\.txt$/.test(f) || (/\.xml$/.test(f) && /rss/.test(f)),
);
const problems = [];

for (const file of targets) {
  const label = relative(process.cwd(), file);
  const source = await readFile(file, 'utf8');
  if (file.endsWith('.html')) {
    for (const chunk of extractHtmlCopy(source)) problems.push(...findProblems(label, chunk.where, chunk.text));
  } else {
    problems.push(...findProblems(label, 'text', source));
  }
}

if (problems.length) {
  console.error(`lint:copy found ${problems.length} banned punctuation mark(s):\n`);
  for (const p of problems) console.error(`  ${p.label} [${p.where}] ${p.name}: "...${p.snippet}..."`);
  console.error('\nRewrite with plain punctuation. Ranges: "2 to 4 weeks". Separators: commas, colons or periods.');
  process.exit(1);
}

console.log(`lint:copy ok: scanned ${targets.length} files, no em dashes, en dashes or middle dots.`);
