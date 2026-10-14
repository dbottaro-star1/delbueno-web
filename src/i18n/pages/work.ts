import type { Localized } from '../config';

export interface WorkCopy {
  index: {
    meta: { title: string; description: string };
    tag: string;
    heading: string;
    /** {total} is the number of case studies. */
    lede: string;
    factCases: string;
    factYears: string;
    /** {from} and {to} are the first and last year. */
    years: string;
    listLabel: string;
    empty: string;
    closer: string;
  };
  card: { view: string; concept: string };
  case: {
    tag: string;
    concept: string;
    conceptNote: string;
    industry: string;
    year: string;
    yearConcept: string;
    services: string;
    cover: string;
    results: string;
    projection: string;
    summary: string;
    onThisPage: string;
    body: string;
    screens: string;
    images: string;
    clientWords: string;
    portrait: string;
    next: string;
    all: string;
    closer: string;
    genreConcept: string;
    genreCase: string;
  };
  /** The case card used on service and industry pages. */
  inline: { conceptFlag: string; projection: string };
  closer: { label: string };
}

export const workCopy: Localized<WorkCopy> = {
  en: {
    index: {
      meta: {
        title: 'Work: case studies in B2B SaaS and product design',
        description:
          'Case studies from delbueno™ Studio: product design for cloud security, AI, fintech and consumer brands, with the results behind each project.',
      },
      tag: 'Work',
      heading: 'Case studies',
      lede: 'delbueno™ Studio has published {total} case studies across cloud security, fintech, proptech, field service software, private aviation, retail, e-commerce and automotive. Each one covers the problem, what we designed and built, and the result, from a 42% satisfaction lift to onboarding completion rising from 62% to 91%.',
      factCases: 'Case studies',
      factYears: 'Years',
      years: '{from} to {to}',
      listLabel: 'Case studies',
      empty: 'Case studies are on the way.',
      closer: 'Have a product that needs to feel obvious?',
    },
    card: { view: 'View case', concept: 'Concept' },
    case: {
      tag: 'Case study',
      concept: 'Concept',
      conceptNote: 'A design concept, not a shipped product. Any figure shown is a projection.',
      industry: 'Industry',
      year: 'Year',
      yearConcept: 'Year, concept',
      services: 'Services',
      cover: 'Project cover',
      results: 'Key results',
      projection: 'Projection from a concept project. Not a measured result.',
      summary: 'Summary',
      onThisPage: 'On this page',
      body: 'Case study',
      screens: 'Selected screens',
      images: 'images',
      clientWords: 'Client words',
      portrait: 'Portrait of {name}',
      next: 'Next project',
      all: 'All case studies',
      closer: 'Let’s talk about your product.',
      genreConcept: 'Concept project',
      genreCase: 'Case study',
    },
    inline: {
      conceptFlag: 'Concept project',
      projection: '{label}. A projection for a concept project, not a measured result.',
    },
    closer: { label: 'Your project' },
  },
  es: {
    index: {
      meta: {
        title: 'Trabajo: casos de estudio en B2B SaaS y diseño de producto',
        description:
          'Casos de estudio de delbueno™ Studio: diseño de producto para seguridad cloud, IA, fintech y marcas de consumo, con los resultados de cada proyecto.',
      },
      tag: 'Trabajo',
      heading: 'Casos de estudio',
      lede: 'delbueno™ Studio ha publicado {total} casos de estudio en seguridad cloud, fintech, proptech, software de servicio en campo, aviación privada, retail, e-commerce y automotriz. Cada uno cuenta el problema, lo que diseñamos y construimos, y el resultado, desde un aumento de 42% en la satisfacción hasta un onboarding que pasó de 62% a 91% de finalización.',
      factCases: 'Casos de estudio',
      factYears: 'Años',
      years: 'De {from} a {to}',
      listLabel: 'Casos de estudio',
      empty: 'Pronto habrá casos de estudio.',
      closer: '¿Tienes un producto que debería entenderse solo?',
    },
    card: { view: 'Ver caso', concept: 'Concepto' },
    case: {
      tag: 'Caso de estudio',
      concept: 'Concepto',
      conceptNote: 'Un concepto de diseño, no un producto lanzado. Toda cifra que se muestra es una proyección.',
      industry: 'Industria',
      year: 'Año',
      yearConcept: 'Año, concepto',
      services: 'Servicios',
      cover: 'Portada del proyecto',
      results: 'Resultados clave',
      projection: 'Proyección de un proyecto conceptual. No es un resultado medido.',
      summary: 'Resumen',
      onThisPage: 'En esta página',
      body: 'Caso de estudio',
      screens: 'Pantallas seleccionadas',
      images: 'imágenes',
      clientWords: 'Lo que dice el cliente',
      portrait: 'Retrato de {name}',
      next: 'Siguiente proyecto',
      all: 'Todos los casos de estudio',
      closer: 'Hablemos de tu producto.',
      genreConcept: 'Proyecto conceptual',
      genreCase: 'Caso de estudio',
    },
    inline: {
      conceptFlag: 'Proyecto conceptual',
      projection: '{label}. Una proyección de un proyecto conceptual, no un resultado medido.',
    },
    closer: { label: 'Tu proyecto' },
  },
};
