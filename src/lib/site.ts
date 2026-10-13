/** Single source of truth for brand facts, navigation and external links. */

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
  tagline: 'Software that feels obvious.',
  speed: 'Kickoff today. First concepts in 48 hours.',
  description:
    'delbueno™ Studio is a product design and development studio for B2B SaaS teams and startups, based in Punta del Este, Uruguay, working remote with US hours.',
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
  jobTitle: 'Founder',
  linkedin: 'https://www.linkedin.com/in/danibottaro/',
  bio: 'Dani Bottaro is the founder of delbueno™ Studio, a product design and development studio based in Punta del Este, Uruguay. For more than 10 years he has designed B2B SaaS products, dashboards and websites for startups and enterprise teams, including work for BigID, JFrog, NetApp and Palo Alto Networks. He writes about UX for complex software, AI products and design systems.',
  knowsAbout: ['Product design', 'UX design', 'B2B SaaS', 'Design systems', 'AI product design', 'Dashboard design'],
} as const;

export const LINKS = {
  book: 'https://app.lemcal.com/@delbuenostudio/15-minutes',
  linkedin: 'https://www.linkedin.com/company/delbueno-studio/',
  dribbble: 'https://dribbble.com/delbueno-studio',
  instagram: 'https://www.instagram.com/delbuenostudio/',
  clutch: 'https://clutch.co/profile/delbueno-studio',
  youtube: 'https://www.youtube.com/@DelbuenoUXStudio',
} as const;

export const SOCIALS = [
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'Dribbble', href: LINKS.dribbble },
  { label: 'Instagram', href: LINKS.instagram },
  { label: 'Clutch', href: LINKS.clutch },
] as const;

/** Profiles used for schema.org sameAs. */
export const SAME_AS: string[] = [LINKS.linkedin, LINKS.dribbble, LINKS.instagram, LINKS.clutch, LINKS.youtube];

export const NAV_LINKS = [
  { label: 'Work', href: '/work/' },
  { label: 'Playground', href: '/playground/' },
  { label: 'Services', href: '/services/' },
  { label: 'Engagements', href: '/engagements/' },
  { label: 'Journal', href: '/journal/' },
  { label: 'About', href: '/about/' },
] as const;

export const FOOTER_LINKS = {
  studio: [
    { label: 'About', href: '/about/' },
    { label: 'Careers', href: '/careers/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Free UX audit', href: '/free-ux-audit/' },
  ],
  legal: [
    { label: 'Terms', href: '/terms/' },
    { label: 'Privacy', href: '/privacy/' },
    { label: 'Accessibility', href: '/accessibility/' },
  ],
} as const;

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
