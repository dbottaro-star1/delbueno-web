/**
 * Language choice. Two small jobs, both optional for the visitor:
 *
 *  1. Remember a language picked with the switcher.
 *  2. Show the suggestion banner when the browser prefers the other language and the visitor has not chosen yet.
 *
 * Nothing here redirects. The banner offers a link, the visitor decides, and any choice (accepting, staying, or using
 * the switcher) is stored in localStorage so the banner never comes back. Storage can be blocked (private modes,
 * strict settings), so every access is wrapped: without it the banner simply can show again on the next page view.
 */
import { LANG_STORAGE_KEY, isLang, type Lang } from '../i18n/config';

function readChoice(): string | null {
  try {
    return localStorage.getItem(LANG_STORAGE_KEY);
  } catch {
    return null;
  }
}

function saveChoice(lang: Lang): void {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    // Blocked storage: the choice only lasts for this page view.
  }
}

/** The first language of the browser's preference list that the site is published in. */
export function preferredLang(languages: readonly string[]): Lang | undefined {
  for (const tag of languages) {
    const primary = tag.toLowerCase().split('-')[0];
    if (isLang(primary)) return primary;
  }
  return undefined;
}

export function initLang(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[data-lang-switch]').forEach((link) => {
    link.addEventListener('click', () => {
      const lang = link.dataset.langSwitch;
      if (isLang(lang)) saveChoice(lang);
    });
  });

  const banner = document.querySelector<HTMLElement>('[data-lang-banner]');
  if (!banner) return;
  const pageLang = banner.dataset.pageLang;
  const suggested = banner.dataset.suggestedLang;
  if (!isLang(pageLang) || !isLang(suggested)) return;

  if (readChoice() !== null) return;
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  if (preferredLang(languages) !== suggested) return;

  const accept = banner.querySelector<HTMLAnchorElement>('[data-lang-accept]');
  const stay = banner.querySelector<HTMLButtonElement>('[data-lang-stay]');

  const hide = () => {
    banner.classList.remove('is-in');
    window.setTimeout(() => (banner.hidden = true), 700);
    document.removeEventListener('keydown', onKey);
  };
  const onKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && banner.contains(document.activeElement)) {
      saveChoice(pageLang);
      hide();
    }
  };

  accept?.addEventListener('click', () => saveChoice(suggested));
  stay?.addEventListener('click', () => {
    saveChoice(pageLang);
    hide();
  });
  document.addEventListener('keydown', onKey);

  // Wait until the page has settled so the banner never competes with the first paint or the hero intro.
  const show = () => {
    banner.hidden = false;
    // Two frames: the element must be rendered before the transition to .is-in can run.
    requestAnimationFrame(() => requestAnimationFrame(() => banner.classList.add('is-in')));
  };
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const delay = reduced ? 600 : 2200;
  const start = () => window.setTimeout(show, delay);
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start, { once: true });
}
