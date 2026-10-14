/**
 * Hotjar (heatmaps and session recordings), disclosed in the privacy policy.
 *
 * This is Hotjar's tracking code moved into a bundled module, so it needs no inline script and no new CSP hash. The
 * Hotjar hosts it loads from are listed in security/csp.json. It only runs on the production domain: previews,
 * localhost and the dev server never load it. Visitors whose browser sends Global Privacy Control are not tracked.
 */
import { PROD_ORIGIN } from '../lib/site';

const HOTJAR_ID = 5084351;
const HOTJAR_SNIPPET_VERSION = 6;

type HotjarQueue = ((...args: unknown[]) => void) & { q?: unknown[][] };

declare global {
  interface Window {
    hj?: HotjarQueue;
    _hjSettings?: { hjid: number; hjsv: number };
  }
  interface Navigator {
    globalPrivacyControl?: boolean;
  }
}

export function initAnalytics(): void {
  if (!import.meta.env.PROD || __PREVIEW__) return;
  if (location.origin !== PROD_ORIGIN) return;
  if (navigator.globalPrivacyControl === true) return;
  if (window.hj) return;

  const queue: HotjarQueue = (...args: unknown[]) => {
    (queue.q ??= []).push(args);
  };
  window.hj = queue;
  window._hjSettings = { hjid: HOTJAR_ID, hjsv: HOTJAR_SNIPPET_VERSION };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://static.hotjar.com/c/hotjar-${HOTJAR_ID}.js?sv=${HOTJAR_SNIPPET_VERSION}`;
  document.head.appendChild(script);
}
