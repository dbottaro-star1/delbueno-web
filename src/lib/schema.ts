/** schema.org JSON-LD builders. Identity URLs always use the production origin. */
import { BRAND, FOUNDER, PROD_ORIGIN, SAME_AS } from './site';
import { canonicalUrl } from './url';

export type JsonLdNode = Record<string, unknown>;

export const ORG_ID = `${PROD_ORIGIN}/#organization`;
export const SERVICE_ID = `${PROD_ORIGIN}/#professionalservice`;
export const WEBSITE_ID = `${PROD_ORIGIN}/#website`;
export const FOUNDER_ID = `${PROD_ORIGIN}/about/#founder`;

const address = {
  '@type': 'PostalAddress',
  addressLocality: BRAND.locality,
  addressCountry: BRAND.countryCode,
};

/** Organization, ProfessionalService, founder Person and WebSite. Emitted on every page. */
export function sitewideSchema(): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ORG_ID,
        name: BRAND.name,
        alternateName: BRAND.shortName,
        url: `${PROD_ORIGIN}/`,
        logo: {
          '@type': 'ImageObject',
          url: `${PROD_ORIGIN}/logo.png`,
          width: 512,
          height: 512,
        },
        email: BRAND.email,
        description: BRAND.description,
        address,
        founder: { '@id': FOUNDER_ID },
        sameAs: SAME_AS,
      },
      {
        '@type': 'ProfessionalService',
        '@id': SERVICE_ID,
        name: BRAND.name,
        url: `${PROD_ORIGIN}/`,
        image: `${PROD_ORIGIN}/og-default.png`,
        email: BRAND.email,
        description: BRAND.description,
        address,
        areaServed: 'Worldwide',
        parentOrganization: { '@id': ORG_ID },
        sameAs: SAME_AS,
      },
      {
        '@type': 'Person',
        '@id': FOUNDER_ID,
        name: FOUNDER.name,
        jobTitle: FOUNDER.jobTitle,
        description: FOUNDER.bio,
        url: `${PROD_ORIGIN}/about/`,
        sameAs: [FOUNDER.linkedin],
        knowsAbout: [...FOUNDER.knowsAbout],
        worksFor: { '@id': ORG_ID },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: `${PROD_ORIGIN}/`,
        name: BRAND.name,
        publisher: { '@id': ORG_ID },
        inLanguage: 'en',
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

export function personSchema(name: string, path = '/about/'): JsonLdNode {
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
  image?: string;
  category?: string;
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
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl(a.path) },
    url: canonicalUrl(a.path),
    inLanguage: 'en',
    ...(a.image ? { image: a.image } : {}),
    ...(a.category ? { articleSection: a.category } : {}),
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
    inLanguage: 'en',
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
export function crumbs(...trail: Crumb[]): Crumb[] {
  return [{ name: 'Home', path: '/' }, ...trail];
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
export function playgroundSchema(path: string, name: string, description: string, shots: ShotInput[]): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${canonicalUrl(path)}#collection`,
    name,
    description,
    url: canonicalUrl(path),
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    inLanguage: 'en',
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
