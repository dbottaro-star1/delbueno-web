/**
 * Sätteri (Astro's Markdown processor) plugin: links in Markdown bodies that leave the site get
 * rel="noopener noreferrer". They stay in the same tab, so readers are never moved without warning (WCAG 3.2.5).
 * Internal links (/about/, #hash), mailto: and tel: links are left alone, and so are absolute links to the
 * site's own domain.
 */
import { defineMdastPlugin } from 'satteri';

const OWN_HOSTS = new Set(['delbuenostudio.com', 'www.delbuenostudio.com']);

const isExternal = (value) => {
  if (typeof value !== 'string') return false;
  if (!/^(?:https?:)?\/\//i.test(value)) return false;
  try {
    return !OWN_HOSTS.has(new URL(value, 'https://delbuenostudio.com').hostname);
  } catch {
    return false;
  }
};

export function externalLinks() {
  return defineMdastPlugin({
    name: 'delbueno-external-links',
    link(node, ctx) {
      if (!isExternal(node.url)) return;
      const data = node.data ?? {};
      ctx.setProperty(node, 'data', {
        ...data,
        hProperties: { ...(data.hProperties ?? {}), rel: 'noopener noreferrer' },
      });
    },
  });
}
