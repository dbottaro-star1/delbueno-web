import type { APIRoute } from 'astro';
import { IS_PREVIEW, WELCOMED_BOTS } from '../lib/site';
import { absoluteUrl } from '../lib/url';

export const GET: APIRoute = ({ site }) => {
  let body: string;

  if (IS_PREVIEW) {
    // Preview builds must never be indexed.
    body = ['# Preview build: not for indexing.', 'User-agent: *', 'Disallow: /', ''].join('\n');
  } else {
    const welcomed = WELCOMED_BOTS.map((bot) => `User-agent: ${bot}\nAllow: /`).join('\n\n');
    body = [
      'User-agent: *',
      'Allow: /',
      '',
      '# Search and AI crawlers are welcome.',
      welcomed,
      '',
      `Sitemap: ${absoluteUrl('/sitemap-index.xml', site)}`,
      '',
    ].join('\n');
  }

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
