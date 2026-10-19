import type { APIRoute } from 'astro';
import { t } from '../i18n';
import { renderOg } from '../lib/og-render';

/** The fallback social card for pages without their own. Keeps the long-standing /og-default.png URL. */
export const GET: APIRoute = async () =>
  new Response(await renderOg({ title: t('en', 'brand.tagline'), kicker: t('en', 'brand.kicker') }), {
    headers: { 'Content-Type': 'image/png' },
  });
