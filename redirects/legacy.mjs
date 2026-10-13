/**
 * Legacy WordPress URLs as Astro redirects, read from redirects/redirects.csv (the same file
 * imported into Cloudflare Bulk Redirects).
 *
 * GitHub Pages cannot send HTTP 301s, so Astro writes a tiny page at each old path with an
 * instant meta refresh and a canonical link to the new URL. Search engines treat that as a
 * permanent redirect. When Cloudflare proxies the domain, its Bulk Redirects answer first with
 * a real 301 and these pages are never reached; they are the fallback that always works.
 */
import { readFileSync } from 'node:fs';
import { URL } from 'node:url';

const CSV = new URL('./redirects.csv', import.meta.url);

/** @returns {Record<string, string>} old path to new path, both root-relative */
export function legacyRedirects() {
  /** @type {Record<string, string>} */
  const map = {};
  for (const line of readFileSync(CSV, 'utf8').split('\n')) {
    const [source, target] = line.trim().split(',');
    if (!source || !target || !source.startsWith('https://')) continue;
    const from = new URL(source).pathname;
    const to = new URL(target).pathname;
    // Feeds and old XML sitemaps are not pages; an HTML refresh at those paths would not help.
    if (from === '/' || from === to || /\.xml$|\/feed\/$/.test(from)) continue;
    map[from] = to;
  }
  return map;
}
