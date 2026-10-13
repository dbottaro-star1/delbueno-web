#!/usr/bin/env node
/**
 * Builds every icon the site needs from one source SVG.
 *
 *   node scripts/build-icons.mjs [path/to/mark.svg]
 *   npm run build:icons
 *
 * Source: src/assets/brand/mark.svg (a square viewBox, ideally 512 by 512, text already converted to paths).
 * Output, all written to public/:
 *   favicon.svg               the source, copied as is (keep any prefers-color-scheme rules in the source)
 *   favicon.ico               16, 32 and 48 px
 *   apple-touch-icon.png      180 px, full bleed on the theme color (iOS rounds the corners itself)
 *   icon-192.png, icon-512.png  the mark as drawn, corners transparent
 *   icon-maskable-512.png     full bleed on the theme color with the mark inside the safe zone
 *   logo.png                  512 px, used as the Organization logo in JSON-LD
 *   site.webmanifest          name, colors and the icons above
 *
 * Rasters are drawn with @resvg/resvg-js, which ignores prefers-color-scheme, so they always show the default
 * (light-mode) styling of the source. Run it again whenever the source changes, then commit the files in public/.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(process.argv[2] ?? `${root}/src/assets/brand/mark.svg`);
const out = `${root}/public`;

/** Brand values. Keep in sync with BRAND in src/lib/site.ts. */
const THEME = '#0A0A0F';
const NAME = 'delbueno™ Studio';
const SHORT_NAME = 'delbueno';
/** Share of a maskable icon the mark may fill. Android masks crop to a circle of 80% of the icon. */
const MASKABLE_SCALE = 0.8;

const svg = await readFile(source, 'utf8');
const open = svg.match(/<svg\b[^>]*>/i)?.[0];
const viewBox = open?.match(/viewBox="([^"]+)"/i)?.[1];
if (!open || !viewBox) {
  console.error(`build-icons: ${source} needs an <svg> with a viewBox.`);
  process.exit(1);
}
const [vx, vy, vw, vh] = viewBox.split(/[\s,]+/).map(Number);
if (Math.abs(vw - vh) > 0.5) console.warn(`build-icons: the viewBox is ${vw} by ${vh}. A square mark works best.`);
const inner = svg.slice(svg.indexOf(open) + open.length, svg.lastIndexOf('</svg>'));

const render = (markup, size) =>
  new Resvg(markup, { fitTo: { mode: 'width', value: size }, background: 'rgba(0,0,0,0)' }).render().asPng();

/** The mark as drawn. */
const plain = (size) => render(svg, size);

/** The mark on a solid theme color square, scaled and centered. */
function onBackground(size, scale) {
  const box = size * scale;
  const offset = (size - box) / 2;
  return render(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
      `<rect width="${size}" height="${size}" fill="${THEME}"/>` +
      `<svg x="${offset}" y="${offset}" width="${box}" height="${box}" viewBox="${vx} ${vy} ${vw} ${vh}">${inner}</svg>` +
      `</svg>`,
    size,
  );
}

/** An ICO file that holds PNG images (supported by every browser that still asks for favicon.ico). */
function ico(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + images.length * 16;
  const entries = images.map(({ size, png }) => {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(png.length, 8);
    entry.writeUInt32LE(offset, 12);
    offset += png.length;
    return entry;
  });
  return Buffer.concat([header, ...entries, ...images.map((i) => i.png)]);
}

const manifest = {
  name: NAME,
  short_name: SHORT_NAME,
  description: 'Product design and development studio for B2B SaaS teams and startups.',
  // Relative URLs resolve against the manifest, so they keep working under a base path (the GitHub Pages preview).
  start_url: './',
  scope: './',
  display: 'browser',
  theme_color: THEME,
  background_color: THEME,
  icons: [
    { src: 'icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
    { src: 'icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    { src: 'icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
  ],
};

await mkdir(out, { recursive: true });
const files = {
  'favicon.svg': svg,
  'favicon.ico': ico([16, 32, 48].map((size) => ({ size, png: plain(size) }))),
  'apple-touch-icon.png': onBackground(180, 1),
  'icon-192.png': plain(192),
  'icon-512.png': plain(512),
  'icon-maskable-512.png': onBackground(512, MASKABLE_SCALE),
  'logo.png': plain(512),
  'site.webmanifest': JSON.stringify(manifest, null, 2) + '\n',
};
for (const [name, data] of Object.entries(files)) {
  await writeFile(`${out}/${name}`, data);
  console.log(`  public/${name} (${data.length} bytes)`);
}
console.log(`build-icons ok: ${Object.keys(files).length} files from ${source.replace(root + '/', '')}`);
