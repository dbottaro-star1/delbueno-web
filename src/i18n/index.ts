/**
 * Interface strings and small formatting helpers.
 *
 *   const t = translator(lang);
 *   t('cta.book');                       // "Book a call" or "Agenda una llamada"
 *   t('a11y.homeLink', { brand: 'x' });  // placeholders are written {name}
 *
 * Keys are checked at compile time: `t('cta.nope')` does not type check.
 */
import { en } from './en';
import { es } from './es';
import type { Lang } from './config';

export { DEFAULT_LANG, LANGS, LANG_META, isLang, langOfPath, otherLang, type Lang, type Localized } from './config';

type Dict = typeof en;

/** Dotted paths to every string in the dictionary, for example "nav.work". */
type Leaves<T, Prefix extends string = ''> = {
  [K in keyof T & string]: T[K] extends string ? `${Prefix}${K}` : Leaves<T[K], `${Prefix}${K}.`>;
}[keyof T & string];

export type TranslationKey = Leaves<Dict>;

const dictionaries: Record<Lang, Dict> = { en, es };

function lookup(dict: Dict, key: string): string {
  let node: unknown = dict;
  for (const part of key.split('.')) node = (node as Record<string, unknown> | undefined)?.[part];
  if (typeof node !== 'string') throw new Error(`Missing translation key "${key}"`);
  return node;
}

export type Vars = Record<string, string | number>;

/** The string for `key` in `lang`, with `{name}` placeholders replaced from `vars`. */
export function t(lang: Lang, key: TranslationKey, vars?: Vars): string {
  const text = lookup(dictionaries[lang], key);
  if (!vars) return text;
  return text.replace(/\{(\w+)\}/g, (match, name: string) => (name in vars ? String(vars[name]) : match));
}

/** `t` with the language bound, for components: `const t = translator(lang)`. */
export const translator =
  (lang: Lang) =>
  (key: TranslationKey, vars?: Vars): string =>
    t(lang, key, vars);

/** Fills `{name}` placeholders in copy that does not live in the dictionary. */
export function fill(text: string, vars: Vars): string {
  return text.replace(/\{(\w+)\}/g, (match, name: string) => (name in vars ? String(vars[name]) : match));
}

const INTL_LOCALE: Record<Lang, string> = { en: 'en-US', es: 'es-419' };

const longDate = (lang: Lang) =>
  new Intl.DateTimeFormat(INTL_LOCALE[lang], { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
const shortDate = (lang: Lang) =>
  new Intl.DateTimeFormat(INTL_LOCALE[lang], { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });

/** "October 13, 2026" or "13 de octubre de 2026". */
export const formatLongDate = (date: Date, lang: Lang): string => longDate(lang).format(date);
/** "Oct 13, 2026" or "13 oct 2026". */
export const formatShortDate = (date: Date, lang: Lang): string => shortDate(lang).format(date);
