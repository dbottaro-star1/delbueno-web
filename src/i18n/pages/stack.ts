import type { Localized } from '../config';
import type { StackSlug } from '../../data/stack';

export interface StackPageCopy {
  meta: { title: string; description: string };
  answer: string;
  listName: string;
  label: string;
  heading: string;
  toolkitLabel: string;
  toolkitHeading: string;
  /** Title and one-line intro of each category, keyed like src/data/stack.ts. */
  categories: Record<StackSlug, { title: string; intro: string }>;
  /** Sentence under the list: where the logos come from and who owns them. */
  credit: string;
  ctaHeading: string;
}

export const stackPageCopy: Localized<StackPageCopy> = {
  en: {
    meta: {
      title: 'Tech stack: the tools behind our design and code',
      description:
        'The design, 3D, AI, frontend, mobile, backend and cloud technologies delbueno™ Studio uses to design and build B2B SaaS products and startup MVPs.',
    },
    answer:
      'delbueno™ Studio designs in Figma, Framer and Webflow, adds 3D and motion with Blender, Spline and GSAP, and builds with TypeScript, React, Next.js and Astro on Node.js, PostgreSQL and cloud platforms such as AWS, Google Cloud and Vercel. AI tools like Claude and Claude Code support the work. The full list is below, grouped by purpose.',
    listName: 'Technologies used by delbueno™ Studio',
    label: 'Tech stack',
    heading: 'The tools behind our design and code.',
    toolkitLabel: 'The toolkit',
    toolkitHeading: 'What we design and build with.',
    categories: {
      design: {
        title: 'Design & prototyping',
        intro: 'Interface design, interactive prototypes and brand assets, from the first sketch to final handoff.',
      },
      motion: {
        title: '3D & motion',
        intro: 'Three dimensional scenes and animation for product pages, demos and interfaces.',
      },
      ai: {
        title: 'AI',
        intro: 'Assistants and generative tools we use to research, explore ideas and write code.',
      },
      frontend: {
        title: 'Frontend',
        intro: 'The languages, frameworks and styling tools behind the interfaces we ship.',
      },
      mobile: {
        title: 'Mobile',
        intro: 'Native and cross-platform tools for iOS and Android apps.',
      },
      backend: {
        title: 'Backend & data',
        intro: 'Languages, databases and services behind APIs, accounts and data storage.',
      },
      cloud: {
        title: 'Cloud & DevOps',
        intro: 'Cloud platforms, containers and automation for hosting, deploying and running products.',
      },
      tools: {
        title: 'Tools & collaboration',
        intro: 'Editors, project tracking and messaging tools we use day to day with clients and teams.',
      },
    },
    credit: 'Logos are from Simple Icons (CC0), and all brand names and logos belong to their respective owners.',
    ctaHeading: 'Wondering if this fits your product? Let’s talk for 15 minutes.',
  },
  es: {
    meta: {
      title: 'Tecnologías: las herramientas de nuestro diseño y código',
      description:
        'Las tecnologías de diseño, 3D, IA, frontend, móvil, backend y nube que delbueno™ Studio usa para diseñar y construir productos B2B SaaS y MVPs.',
    },
    answer:
      'delbueno™ Studio diseña en Figma, Framer y Webflow, suma 3D y motion con Blender, Spline y GSAP, y construye con TypeScript, React, Next.js y Astro sobre Node.js, PostgreSQL y plataformas en la nube como AWS, Google Cloud y Vercel. Herramientas de IA como Claude y Claude Code apoyan el trabajo. Abajo tienes la lista completa, por categoría.',
    listName: 'Tecnologías que usa delbueno™ Studio',
    label: 'Tecnologías',
    heading: 'Las herramientas detrás de nuestro diseño y código.',
    toolkitLabel: 'Las herramientas',
    toolkitHeading: 'Con qué diseñamos y construimos.',
    categories: {
      design: {
        title: 'Diseño y prototipado',
        intro:
          'Diseño de interfaces, prototipos interactivos y recursos de marca, desde el primer boceto hasta la entrega final.',
      },
      motion: {
        title: '3D y motion',
        intro: 'Escenas tridimensionales y animación para páginas de producto, demos e interfaces.',
      },
      ai: {
        title: 'IA',
        intro: 'Asistentes y herramientas generativas que usamos para investigar, explorar ideas y escribir código.',
      },
      frontend: {
        title: 'Frontend',
        intro: 'Los lenguajes, frameworks y herramientas de estilos detrás de las interfaces que entregamos.',
      },
      mobile: {
        title: 'Móvil',
        intro: 'Herramientas nativas y multiplataforma para apps de iOS y Android.',
      },
      backend: {
        title: 'Backend y datos',
        intro: 'Lenguajes, bases de datos y servicios detrás de las APIs, las cuentas y el almacenamiento de datos.',
      },
      cloud: {
        title: 'Nube y DevOps',
        intro: 'Plataformas en la nube, contenedores y automatización para alojar, desplegar y operar productos.',
      },
      tools: {
        title: 'Herramientas y colaboración',
        intro: 'Editores, seguimiento de proyectos y mensajería que usamos a diario con clientes y equipos.',
      },
    },
    credit:
      'Los logotipos provienen de Simple Icons (CC0), y todas las marcas y logotipos pertenecen a sus respectivos dueños.',
    ctaHeading: '¿Quieres saber si esto encaja con tu producto? Hablemos 15 minutos.',
  },
};
