/** schema.org JSON-LD builders. Identity URLs always use the production origin. */
import { recognition } from '../data/recognition';
import { LANG_META, type Lang } from '../i18n/config';
import { t } from '../i18n';
import { pagePath } from '../i18n/routes';
import { BRAND, FOUNDER, PROD_ORIGIN, SAME_AS } from './site';
import { canonicalUrl } from './url';

export type JsonLdNode = Record<string, unknown>;

export const ORG_ID = `${PROD_ORIGIN}/#organization`;
export const SERVICE_ID = `${PROD_ORIGIN}/#professionalservice`;
export const WEBSITE_ID = `${PROD_ORIGIN}/#website`;
/** The WebSite node of a language: the English one at the root, the Spanish one under /es/. */
export const websiteId = (lang: Lang): string => (lang === 'en' ? WEBSITE_ID : `${PROD_ORIGIN}/es/#website`);
export const FOUNDER_ID = `${PROD_ORIGIN}/about/#founder`;

/** The brand mark (public/logo.png, built by scripts/build-icons.mjs). */
const LOGO = {
  '@type': 'ImageObject',
  url: `${PROD_ORIGIN}/logo.png`,
  contentUrl: `${PROD_ORIGIN}/logo.png`,
  width: 512,
  height: 512,
};

/** The publisher as search engines want it on Article and WebSite: named, with its logo, and tied to the Organization by id. */
export const PUBLISHER = { '@type': 'Organization', '@id': ORG_ID, name: BRAND.name, logo: LOGO };

const address = {
  '@type': 'PostalAddress',
  addressLocality: BRAND.locality,
  addressCountry: BRAND.countryCode,
};

/** Organization, ProfessionalService, founder Person and WebSite. Emitted on every page, in the page's language. */
export function sitewideSchema(lang: Lang = 'en'): JsonLdNode {
  const description = t(lang, 'brand.description');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: BRAND.name,
        alternateName: BRAND.shortName,
        url: `${PROD_ORIGIN}/`,
        logo: LOGO,
        image: LOGO.url,
        email: BRAND.email,
        description,
        address,
        founder: { '@id': FOUNDER_ID },
        award: recognition.map((r) => r.name),
        sameAs: SAME_AS,
      },
      {
        '@type': 'ProfessionalService',
        '@id': SERVICE_ID,
        name: BRAND.name,
        url: `${PROD_ORIGIN}/`,
        image: `${PROD_ORIGIN}/og-default.png`,
        email: BRAND.email,
        description,
        address,
        areaServed: 'Worldwide',
        parentOrganization: { '@id': ORG_ID },
        sameAs: SAME_AS,
      },
      {
        '@type': 'Person',
        '@id': FOUNDER_ID,
        name: FOUNDER.name,
        jobTitle: t(lang, 'founder.jobTitle'),
        description: t(lang, 'founder.bio'),
        url: canonicalUrl(pagePath('about', lang)),
        sameAs: [FOUNDER.linkedin],
        knowsAbout: [...FOUNDER.knowsAbout],
        worksFor: { '@id': ORG_ID },
      },
      {
        '@type': 'WebSite',
        '@id': websiteId(lang),
        url: canonicalUrl(pagePath('home', lang)),
        name: BRAND.name,
        alternateName: BRAND.shortName,
        description,
        publisher: PUBLISHER,
        inLanguage: LANG_META[lang].tag,
      },
    ],
  };
}

export interface Crumb {
  name: string;
  /** Site-relative path, for example /services/. */
  path: string;
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: canonicalUrl(c.path),
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

export function personSchema(name: string, path = pagePath('about', 'en')): JsonLdNode {
  const isFounder = name === BRAND.founder;
  return {
    '@type': 'Person',
    ...(isFounder ? { '@id': FOUNDER_ID, sameAs: [FOUNDER.linkedin] } : {}),
    name,
    url: canonicalUrl(path),
    worksFor: { '@id': ORG_ID },
  };
}

export interface ArticleInput {
  path: string;
  title: string;
  description: string;
  author: string;
  pubDate: Date;
  updatedDate?: Date;
  /** Absolute image URL and its size in pixels. */
  image?: { url: string; width: number; height: number };
  category?: string;
  wordCount?: number;
}

export function articleSchema(a: ArticleInput): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.description,
    datePublished: a.pubDate.toISOString(),
    dateModified: (a.updatedDate ?? a.pubDate).toISOString(),
    author: personSchema(a.author),
    publisher: PUBLISHER,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl(a.path) },
    url: canonicalUrl(a.path),
    inLanguage: 'en',
    ...(a.image ? { image: { '@type': 'ImageObject', ...a.image } } : {}),
    ...(a.category ? { articleSection: a.category } : {}),
    ...(a.wordCount ? { wordCount: a.wordCount } : {}),
  };
}

export interface CaseStudyInput {
  path: string;
  title: string;
  description: string;
  client: string;
  year: number;
  industry: string;
  services: string[];
  image?: string;
  lang?: Lang;
}

export function caseStudySchema(c: CaseStudyInput): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: c.title,
    description: c.description,
    url: canonicalUrl(c.path),
    creator: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
    copyrightYear: c.year,
    dateCreated: String(c.year),
    about: c.industry,
    keywords: c.services.join(', '),
    sponsor: { '@type': 'Organization', name: c.client },
    inLanguage: LANG_META[c.lang ?? 'en'].tag,
    ...(c.image ? { image: c.image } : {}),
  };
}

export interface ServiceInput {
  path: string;
  name: string;
  description: string;
  serviceType?: string;
}

export function serviceSchema(s: ServiceInput): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: s.name,
    description: s.description,
    url: canonicalUrl(s.path),
    serviceType: s.serviceType ?? s.name,
    provider: { '@id': SERVICE_ID },
    areaServed: 'Worldwide',
  };
}

/** Breadcrumb trail starting at Home. Pass the trail below Home. */
export function crumbs(lang: Lang, ...trail: Crumb[]): Crumb[] {
  return [{ name: t(lang, 'pageName.home'), path: pagePath('home', lang) }, ...trail];
}

export interface ShotInput {
  title: string;
  /** Dribbble page for the shot. */
  url: string;
  /** Absolute URL of the still image. */
  image: string;
  alt: string;
  width: number;
  height: number;
  video?: string;
  publishedAt?: Date;
  tags: string[];
}

/** CollectionPage listing every Playground shot as an ImageObject or VideoObject that links to Dribbble. */
export function playgroundSchema(
  path: string,
  name: string,
  description: string,
  shots: ShotInput[],
  lang: Lang = 'en',
): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl(path)}#collection`,
    name,
    description,
    url: canonicalUrl(path),
    isPartOf: { '@id': websiteId(lang) },
    publisher: { '@id': ORG_ID },
    inLanguage: LANG_META[lang].tag,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: shots.length,
      itemListElement: shots.map((shot, i) => {
        const common = {
          name: shot.title,
          description: shot.alt,
          url: shot.url,
          thumbnailUrl: shot.image,
          creator: { '@id': ORG_ID },
          keywords: shot.tags.join(', '),
          ...(shot.publishedAt ? { uploadDate: shot.publishedAt.toISOString() } : {}),
        };
        return {
          '@type': 'ListItem',
          position: i + 1,
          item: shot.video
            ? { '@type': 'VideoObject', ...common, contentUrl: shot.video, embedUrl: shot.url }
            : {
                '@type': 'ImageObject',
                ...common,
                contentUrl: shot.image,
                width: shot.width,
                height: shot.height,
              },
        };
      }),
    },
  };
}
