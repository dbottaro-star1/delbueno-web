import type { Localized } from '../config';

/** Labels and sentences for /llms.txt and /llms-full.txt (English) and /es/llms.txt and /es/llms-full.txt. */
export interface LlmsCopy {
  /** {brand}, {locality}, {country}, {email} */
  summary: string;
  /** {url} is the booking link. */
  bookLine: string;
  h: {
    services: string;
    engagements: string;
    stack: string;
    industries: string;
    cases: string;
    playground: string;
    journal: string;
    company: string;
    profiles: string;
  };
  playgroundNote: string;
  company: {
    work: [string, string];
    industries: [string, string];
    engagements: [string, string];
    stack: [string, string];
    journal: [string, string];
    about: [string, string];
    contact: [string, string];
    audit: [string, string];
    full: [string, string];
    otherLanguage: [string, string];
  };
  /** {email} */
  contactNote: string;
  full: {
    name: string;
    website: string;
    location: string;
    founder: string;
    email: string;
    book: string;
    speed: string;
    profiles: string;
    url: string;
    cover: string;
    getTitle: string;
    bestFor: string;
    challenges: string;
    designs: string;
    client: string;
    industry: string;
    year: string;
    services: string;
    results: string;
    testimonial: string;
    playgroundBlurb: string;
    author: string;
    published: string;
    category: string;
    journalNote: string;
    tags: string;
  };
}

export const llmsCopy: Localized<LlmsCopy> = {
  en: {
    summary:
      '{brand} is a product design and development studio for B2B SaaS teams and startups, based in {locality}, {country}, working remote with US hours. Services: product strategy, product design, web design and build. Engagement models: Launch Sprint, Design Partner and Designer on Demand. Kickoff is the same day and first concepts arrive in 48 hours. Contact: {email}.',
    bookLine: 'Book a 15 minute call at {url}.',
    h: {
      services: 'Services',
      engagements: 'Engagement models',
      stack: 'Tech stack',
      industries: 'Industries',
      cases: 'Case studies',
      playground: 'Playground',
      journal: 'Journal',
      company: 'Company',
      profiles: 'Profiles',
    },
    playgroundNote: 'Short UI explorations and motion studies, also on Dribbble',
    company: {
      work: ['Work', 'Case studies with the results behind each'],
      industries: ['Industries', 'Cloud, cybersecurity, DevOps, AI and fintech'],
      engagements: ['Engagements', 'Launch Sprint, Design Partner and Designer on Demand, compared'],
      stack: ['Tech stack', 'The design, AI, frontend, backend and cloud tools we work with'],
      journal: ['Journal', 'Articles on UX for complex software'],
      about: ['About', 'Who we are and how we work'],
      contact: ['Contact', 'Book a call or email {email}'],
      audit: ['Free UX audit', 'A short, ranked list of what to fix first'],
      full: ['Full text for language models', 'All of the above with full details'],
      otherLanguage: ['Español', 'The same site in Spanish'],
    },
    contactNote: 'Book a call or email {email}',
    full: {
      name: 'Name',
      website: 'Website',
      location: 'Location: {locality}, {country}. Remote, with US hours.',
      founder: 'Founder',
      email: 'Email',
      book: 'Book a call',
      speed: 'Speed',
      profiles: 'Profiles:',
      url: 'URL',
      cover: 'What we cover:',
      getTitle: 'What you get:',
      bestFor: 'Best for',
      challenges: 'Common challenges:',
      designs: 'What we design:',
      client: 'Client',
      industry: 'Industry',
      year: 'Year',
      services: 'Services',
      results: 'Results:',
      testimonial: 'Testimonial',
      playgroundBlurb:
        'Short UI explorations and motion studies made between client projects, also published on Dribbble.',
      author: 'Author',
      published: 'Published',
      category: 'Category',
      journalNote: '',
      tags: 'tags',
    },
  },
  es: {
    summary:
      '{brand} es un estudio de diseño y desarrollo de producto para equipos B2B SaaS y startups, con sede en {locality}, {country}, que trabaja en remoto en horario de EE. UU. Servicios: estrategia de producto, diseño de producto, diseño web y desarrollo. Modelos de trabajo: Launch Sprint, Design Partner y Designer on Demand. Empezamos el mismo día y los primeros conceptos llegan en 48 horas. Contacto: {email}.',
    bookLine: 'Agenda una llamada de 15 minutos en {url}.',
    h: {
      services: 'Servicios',
      engagements: 'Modelos de trabajo',
      stack: 'Tecnologías',
      industries: 'Industrias',
      cases: 'Casos de estudio',
      playground: 'Playground',
      journal: 'Blog (artículos en inglés)',
      company: 'Empresa',
      profiles: 'Perfiles',
    },
    playgroundNote: 'Exploraciones breves de UI y estudios de motion, también en Dribbble',
    company: {
      work: ['Trabajo', 'Casos de estudio con los resultados de cada uno'],
      industries: ['Industrias', 'Nube, ciberseguridad, DevOps, IA y fintech'],
      engagements: ['Modelos de trabajo', 'Launch Sprint, Design Partner y Designer on Demand, comparados'],
      stack: ['Tecnologías', 'Las herramientas de diseño, IA, frontend, backend y nube con las que trabajamos'],
      journal: ['Blog', 'Artículos en inglés sobre UX para software complejo'],
      about: ['Nosotros', 'Quiénes somos y cómo trabajamos'],
      contact: ['Contacto', 'Agenda una llamada o escribe a {email}'],
      audit: ['Auditoría UX gratis', 'Una lista breve y ordenada de qué corregir primero'],
      full: ['Texto completo para modelos de lenguaje', 'Todo lo anterior con todos los detalles'],
      otherLanguage: ['English', 'The same site in English'],
    },
    contactNote: 'Agenda una llamada o escribe a {email}',
    full: {
      name: 'Nombre',
      website: 'Sitio web',
      location: 'Ubicación: {locality}, {country}. En remoto, en horario de EE. UU.',
      founder: 'Fundador',
      email: 'Correo',
      book: 'Agenda una llamada',
      speed: 'Velocidad',
      profiles: 'Perfiles:',
      url: 'URL',
      cover: 'Qué cubrimos:',
      getTitle: 'Qué recibes:',
      bestFor: 'Ideal para',
      challenges: 'Problemas comunes:',
      designs: 'Qué diseñamos:',
      client: 'Cliente',
      industry: 'Industria',
      year: 'Año',
      services: 'Servicios',
      results: 'Resultados:',
      testimonial: 'Testimonio (traducido del inglés)',
      playgroundBlurb:
        'Exploraciones breves de UI y estudios de motion hechos entre proyectos de clientes, también publicados en Dribbble.',
      author: 'Autor',
      published: 'Publicado',
      category: 'Categoría',
      journalNote: 'Los artículos están en inglés. Texto completo en la versión en inglés de este archivo.',
      tags: 'etiquetas',
    },
  },
};
