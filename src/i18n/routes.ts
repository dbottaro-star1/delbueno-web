/**
 * The single mapping between English and Spanish URLs. Every link, hreflang alternate, language switcher target,
 * sitemap alternate and social card name in the project is derived from the tables in this file.
 *
 * English stays at the root and Spanish lives under /es/ with Spanish slugs. Paths are site-relative with a trailing
 * slash (the base path is added later by url()). Case study slugs are client names and are the same in both languages.
 * Journal posts keep their English root URLs and the translated ones live at /es/blog/<spanish-slug>/ (POST_SLUGS).
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
  author: { en: '/about/dani-bottaro/', es: '/es/nosotros/dani-bottaro/' },
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

/**
 * Journal posts that have a Spanish translation: English slug (served at /<slug>/) to Spanish slug (served at
 * /es/blog/<slug>/). Posts not listed here are English only. Each Spanish post is a file in src/content/journal-es
 * named after its Spanish slug, with `translationOf` set to the English slug. The build fails when this table and
 * those files disagree (see getJournalEs in src/lib/content.ts).
 */
export const POST_SLUGS: Readonly<Record<string, string>> = {
  'rbac-ux-permissions-design': 'diseno-ux-permisos-rbac',
  'complex-ux-design': 'ux-dashboards-saas-complejos',
  'saas-onboarding-ux-patterns': 'onboarding-saas-patrones-ux',
  'ai-agent-ux-human-in-the-loop': 'ux-agentes-ia-human-in-the-loop',
  'fintech-ux-irreversible-actions': 'ux-fintech-acciones-irreversibles',
  'how-to-build-an-ai-mvp': 'como-construir-un-mvp-de-ia',
};

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

/** Path of a post in a language: the root for English, /es/blog/ for Spanish. `slug` is the English slug. */
export const postPath = (slug: string, lang: Lang): string =>
  lang === 'en' ? `/${slug}/` : `${PAGES.journal.es}${POST_SLUGS[slug]}/`;

/** The other language's path for a journal post path, or undefined when the post is not translated. */
function postTwin(path: string, from: Lang, to: Lang): string | undefined {
  const prefix = from === 'en' ? '/' : PAGES.journal.es;
  if (!path.startsWith(prefix) || path === prefix) return undefined;
  const slug = path.slice(prefix.length).replace(/\/$/, '');
  if (!slug || slug.includes('/')) return undefined;
  if (from === 'en') return Object.hasOwn(POST_SLUGS, slug) ? postPath(slug, to) : undefined;
  const english = Object.keys(POST_SLUGS).find((en) => POST_SLUGS[en] === slug);
  return english ? postPath(english, to) : undefined;
}

/** Splits "/a/b/#x?y" into the path and the "#x?y" tail. */
function split(path: string): [string, string] {
  const i = path.search(/[?#]/);
  return i === -1 ? [path, ''] : [path.slice(0, i), path.slice(i)];
}

/**
 * The same page in the other language, or undefined when the page has no twin (journal posts without a translation,
 * paginated or category journal pages, the 404 page). A "#hash" or "?query" tail is kept.
 */
export function twinPath(sitePath: string, to: Lang): string | undefined {
  const [path, tail] = split(sitePath);
  const from = langOfPath(path);
  if (from === to) return sitePath;

  for (const page of Object.values(PAGES)) {
    if (page[from] === path) return page[to] + tail;
  }
  const post = postTwin(path, from, to);
  if (post) return post + tail;
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
 * Where the language switcher points. The twin when there is one. Otherwise the closest page: the fallback the page
 * passes (journal pages without a translation go to the Spanish blog), else the home page of that language.
 */
export function switchPath(sitePath: string, to: Lang, fallback?: string): string {
  return twinPath(sitePath, to) ?? fallback ?? PAGES.home[to];
}

/** Maps an English site path (as written in data and components) into a language. Unknown paths pass through. */
export function localize(sitePath: string, lang: Lang): string {
  return twinPath(sitePath, lang) ?? sitePath;
}
