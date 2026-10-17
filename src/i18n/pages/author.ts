import type { Localized } from '../config';

export interface AuthorCopy {
  meta: { title: string; description: string; schemaName: string };
  hero: { eyebrow: string; title: string; accent: string; ledeTemplate: string };
  profile: { label: string; heading: string; studioLink: string };
  topics: { label: string; heading: string; items: string[] };
  recognition: { label: string; heading: string };
  /** {n} is the number of articles. */
  articles: { label: string; headingTemplate: string; note: string };
  cta: { heading: string; sub: string };
}

/**
 * The author page of the founder, the canonical home of the Person entity. Every fact comes from the approved bio
 * (src/i18n/en.ts, es.ts), the topic list in src/lib/site.ts and the recognition badges. The articles are English only.
 */
export const authorCopy: Localized<AuthorCopy> = {
  en: {
    meta: {
      title: 'Dani Bottaro: Founder of delbueno Studio and Author',
      description:
        'Dani Bottaro, founder of delbueno™ Studio, designs B2B SaaS products and writes about UX for complex software, AI products and design systems.',
      schemaName: '{name}, founder of {brand}',
    },
    hero: {
      eyebrow: 'About / Author',
      title: 'Dani Bottaro.',
      accent: 'Founder and author.',
      ledeTemplate:
        'Founder of {brand} in {locality}, {country}. He writes about UX for complex software, AI products and design systems.',
    },
    profile: {
      label: 'Profile',
      heading: 'More than 10 years designing B2B software.',
      studioLink: 'About the studio',
    },
    topics: {
      label: 'Writes about',
      heading: 'What Dani writes about.',
      items: ['Product design', 'UX design', 'B2B SaaS', 'Design systems', 'AI product design', 'Dashboard design'],
    },
    recognition: { label: 'Recognition', heading: 'Recognition for the studio he leads.' },
    articles: {
      label: 'Articles',
      headingTemplate: 'All {n} articles by Dani Bottaro, newest first.',
      note: 'Every article on the blog is written by Dani.',
    },
    cta: {
      heading: 'Designing complex software? Let us talk.',
      sub: 'Book a 15 minute call and tell us about your product.',
    },
  },
  es: {
    meta: {
      title: 'Dani Bottaro: fundador de delbueno Studio y autor',
      description:
        'Dani Bottaro, fundador de delbueno™ Studio, diseña productos B2B SaaS y escribe sobre UX para software complejo, productos de IA y sistemas de diseño.',
      schemaName: '{name}, fundador de {brand}',
    },
    hero: {
      eyebrow: 'Nosotros / Autor',
      title: 'Dani Bottaro.',
      accent: 'Fundador y autor.',
      ledeTemplate:
        'Fundador de {brand} en {locality}, {country}. Escribe sobre UX para software complejo, productos de IA y sistemas de diseño.',
    },
    profile: {
      label: 'Perfil',
      heading: 'Más de 10 años diseñando software B2B.',
      studioLink: 'Sobre el estudio',
    },
    topics: {
      label: 'Escribe sobre',
      heading: 'Los temas de Dani.',
      items: [
        'Diseño de producto',
        'Diseño UX',
        'B2B SaaS',
        'Sistemas de diseño',
        'Diseño de productos de IA',
        'Diseño de dashboards',
      ],
    },
    recognition: { label: 'Reconocimientos', heading: 'Reconocimientos del estudio que lidera.' },
    articles: {
      label: 'Artículos',
      headingTemplate: 'Los {n} artículos de Dani Bottaro, del más reciente al más antiguo.',
      note: 'Todos los artículos del blog son de Dani y están escritos en inglés.',
    },
    cta: {
      heading: '¿Diseñas software complejo? Hablemos.',
      sub: 'Agenda una llamada de 15 minutos y cuéntanos sobre tu producto.',
    },
  },
};
