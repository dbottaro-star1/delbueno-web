import type { APIRoute } from 'astro';
import { renderKabbalahOg } from '../../kabbalah/og';

/** Social card shared by every Kabbalah app page (src/layouts/KabbalahLayout.astro). */
export const GET: APIRoute = async () =>
  new Response(await renderKabbalahOg(), { headers: { 'Content-Type': 'image/png' } });
