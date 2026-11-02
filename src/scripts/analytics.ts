/**
 * Visitor analytics, all disclosed in the privacy policy:
 *
 *   - Hotjar: heatmaps and session recordings. Sets its own cookies, so it is skipped when the browser sends
 *     Global Privacy Control.
 *   - Umami Cloud: cookieless page views with country, region, city and device, plus three click events (see
 *     trackClicks). It loads from cloud.umami.is and reports to gateway.umami.is.
 *
 *   - OpenAI Ads Measurement Pixel: measures which visits from ads in ChatGPT end in a request (see trackConversion).
 *     Sets first party cookies (__oppref, __obref), so like Hotjar it is skipped when the browser sends Global Privacy
 *     Control. It loads from bzrcdn.openai.com and reports to bzr.openai.com. Docs:
 *     https://developers.openai.com/ads/measurement-pixel
 *
 * All vendor snippets are moved into this bundled module, so they need no inline script and no new CSP hash. The hosts
 * they use are listed in security/csp.json. Nothing here runs outside the production domain: previews, localhost and
 * the dev server never load either tool. (Cloudflare Web Analytics is the third tool; Cloudflare injects it at the
 * edge, so it is not here.)
 */
import { LINKS, PROD_ORIGIN } from '../lib/site';

const HOTJAR_ID = 5084351;
const HOTJAR_SNIPPET_VERSION = 6;
const UMAMI_WEBSITE_ID = '676bd6aa-68b4-482c-834d-8bc45ad807e7';
/** Pixel ID from OpenAI Ads Manager, Conversions, Data Source. Empty means the pixel does not load. */
const OPENAI_PIXEL_ID = '7wedYDL5oAEYhHqRCUse44';

type OaiqQueue = ((...args: unknown[]) => void) & { q: unknown[][] };

type HotjarQueue = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
    hj?: HotjarQueue;
    oaiq?: OaiqQueue;
    _hjSettings?: { hjid: number; hjsv: number };
  }
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}

function loadScript(src: string, attributes: Record<string, string> = {}): void {
  const script = document.createElement('script');
  script.async = true;
  script.src = src;
  for (const [name, value] of Object.entries(attributes)) script.setAttribute(name, value);
  document.head.appendChild(script);
}

function initHotjar(): void {
  if (navigator.globalPrivacyControl === true || window.hj) return;
  const queue: HotjarQueue = (...args: unknown[]) => {
    (queue.q ??= []).push(args);
  };
  window.hj = queue;
  window._hjSettings = { hjid: HOTJAR_ID, hjsv: HOTJAR_SNIPPET_VERSION };
  loadScript(`https://static.hotjar.com/c/hotjar-${HOTJAR_ID}.js?sv=${HOTJAR_SNIPPET_VERSION}`);
}

function initUmami(): void {
  if (document.querySelector('script[data-website-id]')) return;
  loadScript('https://cloud.umami.is/script.js', {
    'data-website-id': UMAMI_WEBSITE_ID,
    'data-domains': new URL(PROD_ORIGIN).hostname,
  });
}

function initOpenAIPixel(): void {
  if (!OPENAI_PIXEL_ID || navigator.globalPrivacyControl === true || window.oaiq) return;
  const queue = ((...args: unknown[]) => {
    queue.q.push(args);
  }) as OaiqQueue;
  queue.q = [];
  window.oaiq = queue;
  loadScript('https://bzrcdn.openai.com/sdk/oaiq.min.js');
  window.oaiq('init', { pixelId: OPENAI_PIXEL_ID });
}

/**
 * Conversion events for ChatGPT Ads. `lead` is a free audit request sent through the form (standard event
 * lead_created). WhatsApp and booking link clicks are custom events, because a click is not yet a lead.
 * Does nothing when the pixel is not loaded (other domains, Global Privacy Control, no Pixel ID).
 */
export function trackConversion(event: 'lead' | 'whatsapp_click' | 'booking_click'): void {
  if (!window.oaiq) return;
  if (event === 'lead') window.oaiq('measure', 'lead_created', { type: 'customer_action' });
  else window.oaiq('measure', 'custom', { type: 'custom' }, { custom_event_name: event });
}

/**
 * Click events for the weekly report: "Book a call", "WhatsApp", "Email" and "Outbound link" (with the host). The
 * booking and WhatsApp clicks also go to the OpenAI pixel. One delegated
 * listener, so no template needs tracking attributes. Umami sends with fetch keepalive, so the event survives the
 * navigation that follows the click.
 */
function trackClicks(): void {
  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element | null)?.closest?.('a[href]');
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.href;
      if (href.startsWith(LINKS.book)) trackConversion('booking_click');
      else if (href.startsWith(LINKS.whatsapp)) trackConversion('whatsapp_click');
      if (!window.umami) return;
      if (href.startsWith(LINKS.book)) window.umami.track('Book a call', { page: location.pathname });
      else if (href.startsWith(LINKS.whatsapp)) window.umami.track('WhatsApp', { page: location.pathname });
      else if (href.startsWith('mailto:')) window.umami.track('Email', { page: location.pathname });
      else if (link.origin !== location.origin && /^https?:/.test(href))
        window.umami.track('Outbound link', { host: link.hostname });
    },
    { capture: true, passive: true },
  );
}

export function initAnalytics(): void {
  if (!import.meta.env.PROD || __PREVIEW__) return;
  if (location.origin !== PROD_ORIGIN) return;
  initOpenAIPixel();
  initUmami();
  trackClicks();
  initHotjar();
}
