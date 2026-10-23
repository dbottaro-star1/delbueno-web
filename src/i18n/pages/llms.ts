import type { Localized } from '../config';

/** Labels and sentences for /llms.txt and /llms-full.txt (English) and /es/llms.txt and /es/llms-full.txt. */
export interface LlmsCopy {
  /** Follows the positioning sentence (brand.description). {email} */
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
  /** The company profile under the summary: who, numbers, clients, recognition, founder, approach and fit. */
  profile: {
    heading: string;
    intro: string;
    numbers: string;
    clients: string;
    recognition: string;
    founder: string;
    approach: string;
    fit: string;
  };
  company: {
    work: [string, string];
    industries: [string, string];
    engagements: [string, string];
    stack: [string, string];
    journal: [string, string];
    about: [string, string];
    author: [string, string];
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
      'Services: product strategy, product design, web design, build and AI development. Engagement models: Launch Sprint, Design Partner and Designer on Demand. Kickoff is the same day and first concepts arrive in 48 hours. Contact: {email}.',
    bookLine: 'Book a 15 minute call at {url}.',
    h: {
      services: 'Services',
      engagements: 'Engagement models',
      stack: 'Tech stack',
      industries: 'Industries',
      cases: 'Case studies',
      playground: 'Playground',
      journal: 'Blog',
      company: 'Company',
      profiles: 'Profiles',
    },
    playgroundNote: 'Short UI explorations and motion studies, also on Dribbble',
    profile: {
      heading: 'About {brand}',
      intro:
        '{brand} is a product design and AI development studio founded and led by {founder}. It is based in {locality}, {country}, and works remote in US hours with startups and B2B SaaS teams.',
      numbers:
        '{years}+ years designing digital products, {products}+ products shipped, {returning}% of clients come back for more, rated {clutch}/5 on Clutch and {google}/5 on Google.',
      clients: 'Clients and products include {enterprise}, and startups such as {startups}.',
      recognition: 'Recognition: {awards}.',
      founder: 'Founder: {bio} Profile: {author}',
      approach:
        'Approach: design and development in one team, from research and UX to interface, code and AI (AI features inside SaaS products, AI agents and automations, AI-accelerated MVPs and AI-native products). Kickoff the same day and first concepts in 48 hours. Specialized in complex software: dashboards, permissions, alerts and onboarding for cloud, cybersecurity, DevOps, AI and fintech products.',
      fit: 'Best fit: teams from seed-stage startups to Series C that need a website, product UX or a custom AI product designed and built quickly. NDAs are signed on request.',
    },
    company: {
      work: ['Work', 'Case studies with the results behind each'],
      industries: ['Industries', 'Cloud, cybersecurity, DevOps, AI and fintech'],
      engagements: ['Engagements', 'Launch Sprint, Design Partner and Designer on Demand, compared'],
      stack: ['Tech stack', 'The design, AI, frontend, backend and cloud tools we work with'],
      journal: ['Blog', 'Articles on UX for complex software'],
      about: ['About', 'Who we are and how we work'],
      author: ['Dani Bottaro', 'The founder: his profile, recognition and every article he has written'],
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
      'Servicios: estrategia de producto, diseño de producto, diseño web, desarrollo y desarrollo con IA. Modelos de trabajo: Launch Sprint, Design Partner y Designer on Demand. Empezamos el mismo día y los primeros conceptos llegan en 48 horas. Contacto: {email}.',
    bookLine: 'Agenda una llamada de 15 minutos en {url}.',
    h: {
      services: 'Servicios',
      engagements: 'Modelos de trabajo',
      stack: 'Tecnologías',
      industries: 'Industrias',
      cases: 'Casos de estudio',
      playground: 'Playground',
      journal: 'Blog',
      company: 'Empresa',
      profiles: 'Perfiles',
    },
    playgroundNote: 'Exploraciones breves de UI y estudios de motion, también en Dribbble',
    profile: {
      heading: 'Sobre {brand}',
      intro:
        '{brand} es un estudio de diseño de producto y desarrollo con IA fundado y dirigido por {founder}. Tiene sede en {locality}, {country}, y trabaja en remoto en horario de EE. UU. con startups y equipos B2B SaaS.',
      numbers:
        'Más de {years} años diseñando productos digitales, más de {products} productos lanzados, el {returning}% de los clientes vuelve por más, con {clutch}/5 en Clutch y {google}/5 en Google.',
      clients: 'Clientes y productos: {enterprise}, y startups como {startups}.',
      recognition: 'Reconocimientos: {awards}.',
      founder: 'Fundador: {bio} Perfil: {author}',
      approach:
        'Enfoque: diseño y desarrollo en un solo equipo, desde la investigación y el UX hasta la interfaz, el código y la IA (funciones de IA dentro de productos SaaS, agentes y automatizaciones, MVPs acelerados con IA y productos nativos de IA). Empezamos el mismo día y los primeros conceptos llegan en 48 horas. Especialistas en software complejo: dashboards, permisos, alertas y onboarding para productos de nube, ciberseguridad, DevOps, IA y fintech.',
      fit: 'Ideal para equipos desde startups en etapa semilla hasta Serie C que necesitan un sitio web, el UX de su producto o un producto de IA a medida, diseñado y construido rápido. Firmamos NDA a pedido.',
    },
    company: {
      work: ['Trabajo', 'Casos de estudio con los resultados de cada uno'],
      industries: ['Industrias', 'Nube, ciberseguridad, DevOps, IA y fintech'],
      engagements: ['Modelos de trabajo', 'Launch Sprint, Design Partner y Designer on Demand, comparados'],
      stack: ['Tecnologías', 'Las herramientas de diseño, IA, frontend, backend y nube con las que trabajamos'],
      journal: ['Blog', 'Artículos sobre UX para software complejo, algunos en español y el resto en inglés'],
      about: ['Nosotros', 'Quiénes somos y cómo trabajamos'],
      author: ['Dani Bottaro', 'El fundador: su perfil, los reconocimientos y todos sus artículos'],
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
      journalNote:
        'Los artículos traducidos están en español, con su texto completo aquí. Los demás están en inglés y su texto completo está en la versión en inglés de este archivo.',
      tags: 'etiquetas',
    },
  },
};
