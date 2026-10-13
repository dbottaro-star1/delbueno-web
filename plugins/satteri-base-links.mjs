/**
 * Sätteri (Astro's Markdown processor) plugin: prefix root-relative links in markdown with the
 * site base path, so [text](/about/) keeps working on the GitHub Pages preview (BASE_PATH=/delbueno-web).
 * Absolute URLs, protocol-relative URLs, hashes and already-prefixed paths are left alone.
 */
import { defineMdastPlugin } from 'satteri';

export function baseLinks(base = '/') {
  const prefix = base === '/' ? '' : base.replace(/\/+$/, '');

  const fix = (value) => {
    if (!prefix || typeof value !== 'string') return value;
    if (!value.startsWith('/') || value.startsWith('//')) return value;
    if (value === prefix || value.startsWith(prefix + '/')) return value;
    return prefix + value;
  };

  return defineMdastPlugin({
    name: 'delbueno-base-links',
    link(node, ctx) {
      const next = fix(node.url);
      if (next !== node.url) ctx.setProperty(node, 'url', next);
    },
  });
}
