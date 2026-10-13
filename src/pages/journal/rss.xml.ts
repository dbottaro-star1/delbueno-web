import type { APIRoute } from 'astro';
import { getJournal } from '../../lib/content';
import { BRAND } from '../../lib/site';
import { absoluteUrl } from '../../lib/url';

const escape = (value: string) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const posts = await getJournal();
  const self = absoluteUrl('/journal/rss.xml', site);
  const home = absoluteUrl('/journal/', site);

  const items = posts
    .map((post) => {
      const link = absoluteUrl(`/${post.id}/`, site);
      return `    <item>
      <title>${escape(post.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${post.data.pubDate.toUTCString()}</pubDate>
      <dc:creator>${escape(post.data.author)}</dc:creator>
      <category>${escape(post.data.category)}</category>
      <description>${escape(post.data.description)}</description>
    </item>`;
    })
    .join('\n');

  const lastBuild = (posts[0]?.data.updatedDate ?? posts[0]?.data.pubDate ?? new Date()).toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(BRAND.name)} journal</title>
    <link>${home}</link>
    <description>Notes on designing complex B2B software from ${escape(BRAND.name)}.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
    <atom:link href="${self}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
