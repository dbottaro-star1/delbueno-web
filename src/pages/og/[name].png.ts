import type { APIRoute, GetStaticPaths } from 'astro';
import { getOgCards, type OgCard } from '../../lib/og';
import { renderOg } from '../../lib/og-render';

/** One branded social card per page that has no hero image. See src/lib/og.ts. */
export const getStaticPaths = (async () => {
  const cards = await getOgCards();
  return cards.map((card) => ({ params: { name: card.name }, props: { card } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute<{ card: OgCard }> = async ({ props }) =>
  new Response(await renderOg(props.card), { headers: { 'Content-Type': 'image/png' } });
