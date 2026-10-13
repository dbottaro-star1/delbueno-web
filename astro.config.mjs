// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import { readFileSync, readdirSync } from 'node:fs';
import { baseLinks } from './plugins/satteri-base-links.mjs';

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
/** @param {string} page */
const isHiddenPage = (page) => HIDDEN_POSTS.some((slug) => new URL(page).pathname.endsWith(`/${slug}/`));

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  markdown: {
    // Smart punctuation is off so that "--" in a post can never turn into a dash character.
    processor: satteri({
      features: { smartPunctuation: false },
      mdastPlugins: [baseLinks(BASE_PATH)],
    }),
  },
  integrations: [
    mdx(),
    // Previews are noindex, so they do not publish a sitemap.
    ...(IS_PREVIEW ? [] : [sitemap({ filter: (page) => !/\/404\/?$/.test(page) && !isHiddenPage(page) })]),
  ],
  vite: {
    define: {
      __PREVIEW__: JSON.stringify(IS_PREVIEW),
    },
  },
});
