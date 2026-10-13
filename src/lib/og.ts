/**
 * Social card registry. Every page that has no hero image of its own gets a generated card at /og/<name>.png.
 * BaseLayout asks ogCardFor(path) for the card of the page it renders and falls back to /og-default.png.
 * The endpoint src/pages/og/[name].png.ts renders exactly the cards listed here.
 */
import { categorySlug, getCategories } from '../components/journal/reading';
import { industries } from '../data/industries';
import { services } from '../data/services';
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

/** Card file name for a page path: "/" is "home", "/services/build/" is "services-build". */
export const ogName = (path: string): string => path.replace(/^\/|\/$/g, '').replace(/\//g, '-') || 'home';

const STATIC: { path: string; kicker: string; title: string }[] = [
  { path: '/', kicker: 'Product design studio', title: BRAND.tagline },
  { path: '/work/', kicker: 'Work', title: 'Case studies in B2B SaaS and product design.' },
  { path: '/playground/', kicker: 'Playground', title: 'UI explorations and motion studies.' },
  { path: '/services/', kicker: 'Services', title: 'Strategy, design, web and build.' },
  { path: '/engagements/', kicker: 'Engagements', title: 'Three ways to work together.' },
  { path: '/industries/', kicker: 'Industries', title: 'Cloud, cybersecurity, DevOps, AI and fintech.' },
  { path: '/about/', kicker: 'About', title: 'A product design studio working in US hours.' },
  { path: '/contact/', kicker: 'Contact', title: 'Book a call or write to us.' },
  { path: '/journal/', kicker: 'Journal', title: 'Notes on designing complex software.' },
  { path: '/free-ux-audit/', kicker: 'Free UX audit', title: 'A 3 point plan for your product in 48 hours.' },
  { path: '/careers/', kicker: 'Careers', title: 'Not hiring right now, but we read every portfolio.' },
  { path: '/terms/', kicker: 'Legal', title: 'Terms and conditions.' },
  { path: '/privacy/', kicker: 'Legal', title: 'Privacy policy.' },
  { path: '/accessibility/', kicker: 'Legal', title: 'Accessibility statement.' },
];

let cache: Promise<OgCard[]> | undefined;

async function build(): Promise<OgCard[]> {
  const cards: Omit<OgCard, 'name' | 'alt'>[] = [
    ...STATIC,
    ...services.map((s) => ({ path: `/services/${s.slug}/`, kicker: 'Services', title: s.name })),
    ...industries.map((i) => ({ path: `/industries/${i.slug}/`, kicker: 'Industries', title: i.title })),
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
