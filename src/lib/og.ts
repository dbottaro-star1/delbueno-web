/**
 * Social card registry. Every page that has no hero image of its own gets a generated card at /og/<name>.png.
 * BaseLayout asks ogCardFor(path) for the card of the page it renders and falls back to /og-default.png (English) or the Spanish home card.
 * The endpoint src/pages/og/[name].png.ts renders exactly the cards listed here.
 */
import { categorySlug, getCategories } from '../components/journal/reading';
import { getIndustries } from '../data/industries';
import { getServices } from '../data/services';
import { LANGS } from '../i18n/config';
import { OG_SECTION, OG_STATIC } from '../i18n/pages/og';
import { industryPath, pagePath, servicePath } from '../i18n/routes';
import { BRAND } from './site';
import { getJournal } from './content';
import type { OgText } from './og-render';

export interface OgCard extends OgText {
  /** Site path of the page the card belongs to, with a trailing slash. */
  path: string;
  /** File name without extension: /og/<name>.png. */
  name: string;
  alt: string;
}

/**
 * Card file name for a page path: "/" is "home", "/services/build/" is "services-build" and the Spanish home page
 * "/es/" is "es-home".
 */
export const ogName = (path: string): string => {
  const name = path.replace(/^\/|\/$/g, '').replace(/\//g, '-');
  return name === 'es' ? 'es-home' : name || 'home';
};

let cache: Promise<OgCard[]> | undefined;

async function build(): Promise<OgCard[]> {
  const cards: Omit<OgCard, 'name' | 'alt'>[] = [
    ...LANGS.flatMap((lang) => [
      ...OG_STATIC.map((c) => ({ path: pagePath(c.page, lang), kicker: c.kicker[lang], title: c.title[lang] })),
      ...getServices(lang).map((s) => ({
        path: servicePath(s.slug, lang),
        kicker: OG_SECTION.services[lang],
        title: s.name,
      })),
      ...getIndustries(lang).map((i) => ({
        path: industryPath(i.slug, lang),
        kicker: OG_SECTION.industries[lang],
        title: i.title,
      })),
    ]),
    ...(await getCategories()).map((c) => ({
      path: `/journal/category/${categorySlug(c.name)}/`,
      kicker: 'Journal',
      title: c.name,
    })),
    // Posts with a hero image use it. A post without one gets a card with its short title.
    ...(await getJournal())
      .filter((p) => !p.data.heroImage)
      .map((p) => ({ path: `/${p.id}/`, kicker: p.data.category, title: p.data.seoTitle ?? p.data.title })),
  ];

  const seen = new Map<string, string>();
  return cards.map((card) => {
    const name = ogName(card.path);
    const clash = seen.get(name);
    if (clash) throw new Error(`Social card name "${name}" is used by both ${clash} and ${card.path}.`);
    seen.set(name, card.path);
    return { ...card, name, alt: `${BRAND.name}: ${card.title}` };
  });
}

export const getOgCards = (): Promise<OgCard[]> => (cache ??= build());

/** The generated card for a page path, or undefined when the page uses the default image. */
export async function ogCardFor(path: string): Promise<OgCard | undefined> {
  // Later pages of the journal share the first page's card.
  const key = path.replace(/^\/journal\/\d+\/$/, '/journal/');
  return (await getOgCards()).find((c) => c.path === key);
}
