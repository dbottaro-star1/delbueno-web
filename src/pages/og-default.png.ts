import type { APIRoute } from 'astro';
import { renderOg } from '../lib/og-render';
import { BRAND } from '../lib/site';

/** The fallback social card for pages without their own. Keeps the long-standing /og-default.png URL. */
export const GET: APIRoute = async () =>
  new Response(await renderOg({ title: BRAND.tagline, kicker: 'Product design studio' }), {
    headers: { 'Content-Type': 'image/png' },
  });
