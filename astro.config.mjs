// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { readFileSync, readdirSync } from 'node:fs';
import { contentGuard, contentGuardBuild } from './plugins/satteri-content-guard.mjs';
import { baseLinks } from './plugins/satteri-base-links.mjs';
import { legacyRedirects } from './redirects/legacy.mjs';
import { LANG_META, LANGS } from './src/i18n/config.ts';
import { alternates } from './src/i18n/routes.ts';
import { externalLinks } from './plugins/satteri-external-links.mjs';

/**
 * Deployment is controlled by three environment variables:
 *   SITE_URL   origin the build is served from (default https://delbuenostudio.com)
 *   BASE_PATH  path prefix the build is served under (default /)
 *   PREVIEW    "true" marks the build as a non-indexable preview
 * See README.md for the preview and production values.
 */
const SITE_URL = (process.env.SITE_URL || 'https://delbuenostudio.com').replace(/\/+$/, '');
const rawBase = (process.env.BASE_PATH || '/').trim();
const BASE_PATH = rawBase === '/' || rawBase === '' ? '/' : '/' + rawBase.replace(/^\/+|\/+$/g, '');
const IS_PREVIEW = process.env.PREVIEW === 'true';

/** Journal posts marked `noindex: true` stay reachable but are left out of the sitemap. */
const HIDDEN_POSTS = readdirSync('./src/content/journal')
  .filter((f) => /\.mdx?$/.test(f) && /^noindex:\s*true\s*$/m.test(readFileSync(`./src/content/journal/${f}`, 'utf8')))
  .map((f) => f.replace(/\.mdx?$/, ''));
/** Sitemap lastmod: a post's updatedDate (or pubDate), and the build date for every other page. */
const BUILD_DATE = new Date();
const POST_LASTMOD = new Map(
  readdirSync('./src/content/journal')
    .filter((f) => /\.mdx?$/.test(f))
    .map((f) => {
      const source = readFileSync(`./src/content/journal/${f}`, 'utf8');
      const field = (/** @type {string} */ key) => source.match(new RegExp(`^${key}:\\s*["']?([0-9-]+)`, 'm'))?.[1];
      const date = new Date(field('updatedDate') ?? field('pubDate') ?? BUILD_DATE);
      return /** @type {[string, Date]} */ ([
        f.replace(/\.mdx?$/, ''),
        Number.isNaN(date.valueOf()) ? BUILD_DATE : date,
      ]);
    }),
);
/**
 * Adds lastmod, and for pages that exist in both languages the hreflang alternates. The sitemap integration's own
 * `i18n` option pairs pages by swapping the locale prefix, which cannot work with translated slugs, so the pairs come
 * from the one mapping table in src/i18n/routes.ts.
 * @param {import('@astrojs/sitemap').SitemapItem} item
 */
const withLastmod = (item) => {
  const { origin, pathname } = new URL(item.url);
  const sitePath = pathname.slice(BASE_PATH === '/' ? 0 : BASE_PATH.length) || '/';
  const slug = sitePath.replace(/^\/|\/$/g, '');
  item.lastmod = (POST_LASTMOD.get(slug) ?? BUILD_DATE).toISOString();

  const twins = alternates(sitePath);
  if (LANGS.every((lang) => twins[lang])) {
    const href = (/** @type {string} */ path) => `${origin}${BASE_PATH === '/' ? '' : BASE_PATH}${path}`;
    item.links = [
      ...LANGS.map((lang) => ({ url: href(twins[lang] ?? sitePath), lang: LANG_META[lang].tag })),
      { url: href(twins.en ?? sitePath), lang: 'x-default' },
    ];
  }
  return item;
};
/** @param {string} page */
const isHiddenPage = (page) => HIDDEN_POSTS.some((slug) => new URL(page).pathname.endsWith(`/${slug}/`));

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  // Old WordPress URLs (redirects/redirects.csv). See redirects/legacy.mjs.
  redirects: legacyRedirects(),
  // Optional overrides so parallel local builds don't share one output or cache folder.
  ...(process.env.OUT_DIR ? { outDir: process.env.OUT_DIR } : {}),
  ...(process.env.CACHE_DIR ? { cacheDir: process.env.CACHE_DIR } : {}),
  trailingSlash: 'always',
  // English is served from the root and Spanish from /es/. The Spanish pages are explicit files in src/pages/es with
  // their own slugs (see src/i18n/routes.ts), so Astro only needs to know the locales for Astro.currentLocale.
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  build: {
    format: 'directory',
    // Every stylesheet is a file, so the CSP can say style-src 'self' with no inline styles (see security/csp.json).
    inlineStylesheets: 'never',
  },
  markdown: {
    // Smart punctuation is off so that "--" in a post can never turn into a dash character.
    processor: satteri({
      features: { smartPunctuation: false },
      // The guard goes first so it sees the raw tree before anything rewrites it.
      mdastPlugins: [contentGuard(), baseLinks(BASE_PATH), externalLinks()],
    }),
  },
  integrations: [
    contentGuardBuild(),
    mdx(),
    // Previews are noindex, so they do not publish a sitemap.
    ...(IS_PREVIEW
      ? []
      : [sitemap({ filter: (page) => !/\/404\/?$/.test(page) && !isHiddenPage(page), serialize: withLastmod })]),
  ],
  vite: {
    define: {
      __PREVIEW__: JSON.stringify(IS_PREVIEW),
    },
  },
});
