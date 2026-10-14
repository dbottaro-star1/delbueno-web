/**
 * Copy for the language switcher and the language suggestion banner. Each entry is written in the language it
 * speaks: the banner on an English page is Spanish, because it is addressed to a Spanish reader, and the other
 * way round. That is why this is not part of the page dictionaries in en.ts and es.ts.
 */
import type { Lang, Localized } from './config';

export interface SwitchCopy {
  /** Accessible name of the link that switches to this language. */
  link: string;
  /** Banner copy, spoken in this language. */
  question: string;
  accept: string;
  stay: string;
  /** Accessible name of the banner region. */
  region: string;
}

export const SWITCH: Localized<SwitchCopy> = {
  en: {
    link: 'View this page in English',
    question: 'Prefer to see the site in English?',
    accept: 'View in English',
    stay: 'Stay in Spanish',
    region: 'Language suggestion',
  },
  es: {
    link: 'Ver esta página en español',
    question: '¿Prefieres ver el sitio en español?',
    accept: 'Ver en español',
    stay: 'Seguir en inglés',
    region: 'Sugerencia de idioma',
  },
};

/** Accessible name of the switcher group, in the language of the current page. */
export const SWITCH_GROUP: Localized<string> = { en: 'Language', es: 'Idioma' };

export const switchCopy = (lang: Lang): SwitchCopy => SWITCH[lang];
