/**
 * Visitor analytics, all disclosed in the privacy policy:
 *
 *   - Hotjar: heatmaps and session recordings. Sets its own cookies, so it is skipped when the browser sends
 *     Global Privacy Control.
 *   - Umami Cloud: cookieless page views with country, region, city and device, plus three click events (see
 *     trackClicks). It loads from cloud.umami.is and reports to gateway.umami.is.
 *
 * Both vendor snippets are moved into this bundled module, so they need no inline script and no new CSP hash. The hosts
 * they use are listed in security/csp.json. Nothing here runs outside the production domain: previews, localhost and
 * the dev server never load either tool. (Cloudflare Web Analytics is the third tool; Cloudflare injects it at the
 * edge, so it is not here.)
 */
import { LINKS, PROD_ORIGIN } from '../lib/site';

const HOTJAR_ID = 5084351;
const HOTJAR_SNIPPET_VERSION = 6;
const UMAMI_WEBSITE_ID = '676bd6aa-68b4-482c-834d-8bc45ad807e7';

type HotjarQueue = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    umami?: { track: (event: string, data?: Record<string, string>) => void };
    hj?: HotjarQueue;
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

/**
 * Click events for the weekly report: "Book a call", "Email" and "Outbound link" (with the host). One delegated
 * listener, so no template needs tracking attributes. Umami sends with fetch keepalive, so the event survives the
 * navigation that follows the click.
 */
function trackClicks(): void {
  document.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element | null)?.closest?.('a[href]');
      if (!(link instanceof HTMLAnchorElement) || !window.umami) return;
      const href = link.href;
      if (href.startsWith(LINKS.book)) window.umami.track('Book a call', { page: location.pathname });
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
  initUmami();
  trackClicks();
  initHotjar();
}
