/**
 * Single source of truth for brand facts, navigation and external links.
 * Words that change with the language (tagline, speed line, descriptions, the founder bio) live in src/i18n.
 */
import type { PageKey } from '../i18n/routes';
import type { TranslationKey } from '../i18n';

/** Canonical production origin. Canonical URLs and structured data always use this, even on previews. */
export const PROD_ORIGIN = 'https://delbuenostudio.com';

/** True when the build is a preview (env PREVIEW=true): noindex and Disallow all. */
export const IS_PREVIEW: boolean = __PREVIEW__;

/** Page titles stay within TITLE_MAX characters. The suffix is appended only when the result still fits. */
export const TITLE_MAX = 60;
export const TITLE_SUFFIX = ' | delbueno';

export const BRAND = {
  name: 'delbueno™ Studio',
  shortName: 'delbueno',
  legalName: 'delbueno™ Studio',
  email: 'hello@delbuenostudio.com',
  locality: 'Punta del Este',
  country: 'Uruguay',
  countryCode: 'UY',
  founder: 'Dani Bottaro',
  themeColor: '#0A0A0F',
} as const;

/** Founder profile, used for the post author box and the Person schema. */
export const FOUNDER = {
  name: BRAND.founder,
  linkedin: 'https://www.linkedin.com/in/danibottaro/',
  knowsAbout: ['Product design', 'UX design', 'B2B SaaS', 'Design systems', 'AI product design', 'Dashboard design'],
} as const;

export const LINKS = {
  book: 'https://app.lemcal.com/@delbuenostudio/15-minutes',
  linkedin: 'https://www.linkedin.com/company/we-are-delbueno-studio/',
  dribbble: 'https://dribbble.com/delbueno-studio',
  instagram: 'https://www.instagram.com/delbuenostudio/',
  clutch: 'https://clutch.co/profile/delbueno-studio',
  youtube: 'https://www.youtube.com/@DelbuenoUXStudio',
  techbehemoths: 'https://techbehemoths.com/company/delbueno-studio',
  /** The studio's Google Business Profile, by its Knowledge Graph id (a direct URL, unlike the share.google link). */
  google: 'https://www.google.com/search?q=Delbueno+Studio&kgmid=/g/11wfgggbpm',
} as const;

export const SOCIALS = [
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'Dribbble', href: LINKS.dribbble },
  { label: 'Instagram', href: LINKS.instagram },
  { label: 'Clutch', href: LINKS.clutch },
  { label: 'YouTube', href: LINKS.youtube },
  { label: 'Google', href: LINKS.google },
] as const;

/** What the studio is known for, published as the Organization knowsAbout list. */
export const KNOWS_ABOUT = [
  'UX design for startups',
  'Web design for startups',
  'Product design',
  'B2B SaaS design',
  'Custom AI development',
  'AI agents',
  'AI product design',
  'Design systems',
  'Dashboard design',
] as const;

/** Profiles used for schema.org sameAs. */
export const SAME_AS: string[] = [
  LINKS.linkedin,
  LINKS.dribbble,
  LINKS.instagram,
  LINKS.clutch,
  LINKS.youtube,
  LINKS.techbehemoths,
  LINKS.google,
];

/** A link to a page of the site: the page key gives the URL in each language, the label key the text. */
export interface SiteLink {
  page: PageKey;
  label: TranslationKey;
}

export const NAV_LINKS: readonly SiteLink[] = [
  { page: 'work', label: 'nav.work' },
  { page: 'playground', label: 'nav.playground' },
  { page: 'services', label: 'nav.services' },
  { page: 'engagements', label: 'nav.engagements' },
  { page: 'stack', label: 'nav.stack' },
  { page: 'journal', label: 'nav.journal' },
  { page: 'about', label: 'nav.about' },
];

export const FOOTER_LINKS: { studio: readonly SiteLink[]; legal: readonly SiteLink[] } = {
  studio: [
    { page: 'about', label: 'footer.about' },
    { page: 'careers', label: 'footer.careers' },
    { page: 'contact', label: 'footer.contactPage' },
    { page: 'audit', label: 'footer.audit' },
  ],
  legal: [
    { page: 'terms', label: 'footer.terms' },
    { page: 'privacy', label: 'footer.privacy' },
    { page: 'accessibility', label: 'footer.accessibility' },
  ],
};

/** AI and search crawlers that are explicitly welcome in robots.txt. */
export const WELCOMED_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'Bingbot',
] as const;
