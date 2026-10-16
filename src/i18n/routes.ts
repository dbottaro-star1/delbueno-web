/**
 * The single mapping between English and Spanish URLs. Every link, hreflang alternate, language switcher target,
 * sitemap alternate and social card name in the project is derived from the tables in this file.
 *
 * English stays at the root and Spanish lives under /es/ with Spanish slugs. Paths are site-relative with a trailing
 * slash (the base path is added later by url()). Case study slugs are client names and are the same in both languages.
 */
import { LANGS, langOfPath, type Lang } from './config';

/** Pages with exactly one English and one Spanish URL. */
export const PAGES = {
  home: { en: '/', es: '/es/' },
  work: { en: '/work/', es: '/es/trabajo/' },
  playground: { en: '/playground/', es: '/es/playground/' },
  services: { en: '/services/', es: '/es/servicios/' },
  engagements: { en: '/engagements/', es: '/es/modelos-de-trabajo/' },
  stack: { en: '/tech-stack/', es: '/es/tecnologias/' },
  industries: { en: '/industries/', es: '/es/industrias/' },
  about: { en: '/about/', es: '/es/nosotros/' },
  contact: { en: '/contact/', es: '/es/contacto/' },
  journal: { en: '/blog/', es: '/es/blog/' },
  audit: { en: '/free-ux-audit/', es: '/es/auditoria-ux-gratis/' },
  careers: { en: '/careers/', es: '/es/trabaja-con-nosotros/' },
  terms: { en: '/terms/', es: '/es/terminos/' },
  privacy: { en: '/privacy/', es: '/es/privacidad/' },
  accessibility: { en: '/accessibility/', es: '/es/accesibilidad/' },
} as const satisfies Record<string, Record<Lang, string>>;

export type PageKey = keyof typeof PAGES;

/** Services: English slug to Spanish slug. The keys are checked against the data in src/data/services.ts. */
export const SERVICE_SLUGS = {
  'product-strategy': 'estrategia-de-producto',
  'product-design': 'diseno-de-producto',
  'web-design': 'diseno-web',
  build: 'desarrollo-de-mvp',
} as const;

/** Industries: English slug to Spanish slug. */
export const INDUSTRY_SLUGS = {
  cloud: 'nube',
  cybersecurity: 'ciberseguridad',
  devops: 'devops',
  ai: 'ia',
  fintech: 'fintech',
} as const;

/** Sections whose pages are `<prefix><slug>/`. Without a `slugs` table the slug is the same in both languages. */
const SECTIONS: { en: string; es: string; slugs?: Record<string, string> }[] = [
  { en: PAGES.work.en, es: PAGES.work.es },
  { en: PAGES.services.en, es: PAGES.services.es, slugs: SERVICE_SLUGS },
  { en: PAGES.industries.en, es: PAGES.industries.es, slugs: INDUSTRY_SLUGS },
];

export const serviceSlug = (slug: keyof typeof SERVICE_SLUGS, lang: Lang): string =>
  lang === 'en' ? slug : SERVICE_SLUGS[slug];
export const industrySlug = (slug: keyof typeof INDUSTRY_SLUGS, lang: Lang): string =>
  lang === 'en' ? slug : INDUSTRY_SLUGS[slug];

/** Path of a page in a language. */
export const pagePath = (key: PageKey, lang: Lang): string => PAGES[key][lang];
export const servicePath = (slug: keyof typeof SERVICE_SLUGS, lang: Lang): string =>
  `${lang === 'en' ? PAGES.services.en : PAGES.services.es}${serviceSlug(slug, lang)}/`;
export const industryPath = (slug: keyof typeof INDUSTRY_SLUGS, lang: Lang): string =>
  `${lang === 'en' ? PAGES.industries.en : PAGES.industries.es}${industrySlug(slug, lang)}/`;
export const workPath = (slug: string, lang: Lang): string => `${PAGES.work[lang]}${slug}/`;

const invert = (map: Record<string, string>): Record<string, string> =>
  Object.fromEntries(Object.entries(map).map(([en, es]) => [es, en]));

/** Splits "/a/b/#x?y" into the path and the "#x?y" tail. */
function split(path: string): [string, string] {
  const i = path.search(/[?#]/);
  return i === -1 ? [path, ''] : [path.slice(0, i), path.slice(i)];
}

/**
 * The same page in the other language, or undefined when the page has no twin (journal posts, paginated or category
 * journal pages, the 404 page). A "#hash" or "?query" tail is kept.
 */
export function twinPath(sitePath: string, to: Lang): string | undefined {
  const [path, tail] = split(sitePath);
  const from = langOfPath(path);
  if (from === to) return sitePath;

  for (const page of Object.values(PAGES)) {
    if (page[from] === path) return page[to] + tail;
  }
  for (const section of SECTIONS) {
    const prefix = section[from];
    if (!path.startsWith(prefix) || path === prefix) continue;
    const slug = path.slice(prefix.length).replace(/\/$/, '');
    if (!slug || slug.includes('/')) continue;
    const mapped = section.slugs ? (from === 'en' ? section.slugs : invert(section.slugs))[slug] : slug;
    if (mapped) return `${section[to]}${mapped}/${tail}`;
  }
  return undefined;
}

/** True when the page has a twin in every language, which is when hreflang alternates are published. */
export const hasTwins = (sitePath: string): boolean => LANGS.every((lang) => twinPath(sitePath, lang) !== undefined);

/** Every language version of a page, keyed by language. Empty when the page has no twin. */
export function alternates(sitePath: string): Partial<Record<Lang, string>> {
  if (!hasTwins(sitePath)) return {};
  return Object.fromEntries(LANGS.map((lang) => [lang, twinPath(sitePath, lang)])) as Record<Lang, string>;
}

/**
 * Where the language switcher points. The twin when there is one. Otherwise the closest page: the blog for anything
 * in the journal (posts have no Spanish twin), else the home page of that language.
 */
export function switchPath(sitePath: string, to: Lang, fallback?: string): string {
  return twinPath(sitePath, to) ?? fallback ?? PAGES.home[to];
}

/** Maps an English site path (as written in data and components) into a language. Unknown paths pass through. */
export function localize(sitePath: string, lang: Lang): string {
  return twinPath(sitePath, lang) ?? sitePath;
}
