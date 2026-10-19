/** Languages the site is published in. English lives at the root, Spanish under /es/. */
export const LANGS = ['en', 'es'] as const;
export type Lang = (typeof LANGS)[number];

export const DEFAULT_LANG: Lang = 'en';

export interface LangMeta {
  /** Value of the `lang` attribute, hreflang and JSON-LD `inLanguage`. */
  tag: string;
  /** Open Graph locale. `es_LA` is the Facebook locale for neutral Latin American Spanish. */
  og: string;
  /** Name of the language in that language, for the switcher. */
  native: string;
  /** Two letter label used by the switcher. */
  short: string;
}

export const LANG_META: Record<Lang, LangMeta> = {
  en: { tag: 'en', og: 'en_US', native: 'English', short: 'EN' },
  es: { tag: 'es', og: 'es_LA', native: 'Español', short: 'ES' },
};

export const isLang = (value: unknown): value is Lang => LANGS.includes(value as Lang);

/** The other language. Only meaningful while there are exactly two. */
export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'es' : 'en');

/** A value for each language. Page copy and localized data use this shape, so a missing translation fails the type check. */
export type Localized<T> = Record<Lang, T>;

/** Language of a site-relative path: everything under /es/ is Spanish, the rest is English. */
export const langOfPath = (sitePath: string): Lang => (/^\/es(\/|$)/.test(sitePath) ? 'es' : 'en');

/** Key used by the browser to remember the visitor's language choice (see src/scripts/lang.ts). */
export const LANG_STORAGE_KEY = 'delbueno-lang';
