import type { Localized } from '../config';

/** Copy for the home page sections. Numbers, client names and service data come from the shared data files. */
export interface HomeCopy {
  meta: { title: string; description: string };
  hero: {
    aria: string;
    eyebrow: string;
    /** The three lines of the display headline. The last one carries the gradient. */
    lines: [string, string, string];
    /** Sentence after the studio name in the intro paragraph. */
    intro: string;
    see: string;
  };
  band: { first: string; second: string };
  clarity: string;
  work: { label: string; heading: string; lede: string; view: string; all: string; concept: string };
  playground: {
    label: string;
    heading: string;
    intro: string;
    back: string;
    forward: string;
    region: string;
    more: string;
    seeAll: string;
    follow: string;
  };
  trust: { trustedBy: string; recognizedBy: string };
  services: { label: string; heading: string; sub: string; about: string };
  numbers: { heading: string };
  speed: {
    label: string;
    heading: string;
    steps: { when: string; title: string; text: string }[];
  };
  testimonials: { label: string; portrait: string };
  engagements: {
    label: string;
    heading: string;
    hoverHint: string;
    tapHint: string;
    note: string;
    compare: string;
  };
  final: { label: string; lines: [string, string, string, string]; or: string };
}

export const homeCopy: Localized<HomeCopy> = {
  en: {
    meta: {
      title: 'Product design for B2B SaaS and startups',
      description:
        'delbueno™ Studio designs and builds products, websites and design systems for B2B SaaS teams and startups. Kickoff today. First concepts in 48 hours.',
    },
    hero: {
      aria: 'Introduction',
      eyebrow: 'Product design & development studio for B2B SaaS and startups.',
      lines: ['Software', 'that feels', 'obvious.'],
      intro: 'designs and builds products, websites and design systems for B2B SaaS teams and ambitious startups.',
      see: 'See the work',
    },
    band: { first: 'Kickoff today', second: 'First concepts in 48h' },
    clarity: 'Clarity',
    work: {
      label: 'Work',
      heading: 'Selected work',
      lede: 'Messy in. Obvious out.',
      view: 'View case',
      all: 'All case studies',
      concept: 'Concept',
    },
    playground: {
      label: 'Dribbble shots',
      heading: 'Playground',
      intro: 'Small experiments, UI explorations and motion studies. The quick stuff between the big projects.',
      back: 'Scroll the playground back',
      forward: 'Scroll the playground forward',
      region: 'Playground shots, scroll sideways',
      more: 'More',
      seeAll: 'See the whole playground',
      follow: 'Follow on Dribbble',
    },
    trust: { trustedBy: 'Trusted by', recognizedBy: 'Recognized by' },
    services: {
      label: 'Services',
      heading: 'What we do',
      sub: 'Four disciplines, one team. Start with any of them.',
      about: 'About {name}',
    },
    numbers: { heading: 'delbueno in numbers' },
    speed: {
      label: 'Process',
      heading: 'Kickoff today. Concepts in 48 hours.',
      steps: [
        {
          when: 'Today',
          title: 'Strategic kickoff',
          text: 'One focused call to align on goals and scope; we start the moment we hang up.',
        },
        {
          when: 'Within 24h',
          title: 'Your portal goes live',
          text: 'A dedicated Notion workspace with your backlog, plus a shared Slack channel. No email chains.',
        },
        { when: '48h later', title: 'First high-fidelity concepts', text: 'No waiting weeks for a big reveal.' },
      ],
    },
    testimonials: { label: 'Client words', portrait: 'Portrait of {name}' },
    engagements: {
      label: 'Engagements',
      heading: 'Three ways to work with us',
      hoverHint: 'Hover for detail',
      tapHint: 'Tap for detail',
      note: 'Many clients ship an MVP in a Launch Sprint, then roll into Design Partner.',
      compare: 'Compare the models',
    },
    final: { label: 'Next', lines: ['Let’s build', 'something', 'people get', 'instantly.'], or: 'or' },
  },
  es: {
    meta: {
      title: 'diseño de producto B2B SaaS y startups',
      description:
        'delbueno™ Studio diseña y desarrolla productos, sitios web y sistemas de diseño para equipos B2B SaaS y startups. Empezamos hoy, conceptos en 48 horas.',
    },
    hero: {
      aria: 'Introducción',
      eyebrow: 'Estudio de diseño y desarrollo de producto para B2B SaaS y startups.',
      lines: ['Software que', 'se explica', 'solo.'],
      intro:
        'diseña y desarrolla productos, sitios web y sistemas de diseño para equipos B2B SaaS y startups con ambición.',
      see: 'Ver el trabajo',
    },
    band: { first: 'Empezamos hoy', second: 'Primeros conceptos en 48 h' },
    clarity: 'Claridad',
    work: {
      label: 'Trabajo',
      heading: 'Trabajo seleccionado',
      lede: 'Entra el caos. Sale la claridad.',
      view: 'Ver caso',
      all: 'Todos los casos de estudio',
      concept: 'Concepto',
    },
    playground: {
      label: 'Shots de Dribbble',
      heading: 'Playground',
      intro:
        'Experimentos pequeños, exploraciones de UI y estudios de motion. Lo rápido que hacemos entre los proyectos grandes.',
      back: 'Desplazar el playground hacia atrás',
      forward: 'Desplazar el playground hacia adelante',
      region: 'Shots del playground, desplázate hacia los lados',
      more: 'Más',
      seeAll: 'Ver todo el playground',
      follow: 'Síguenos en Dribbble',
    },
    trust: { trustedBy: 'Confían en nosotros', recognizedBy: 'Reconocidos por' },
    services: {
      label: 'Servicios',
      heading: 'Qué hacemos',
      sub: 'Cuatro disciplinas, un solo equipo. Empieza por la que quieras.',
      about: 'Más sobre {name}',
    },
    numbers: { heading: 'delbueno en cifras' },
    speed: {
      label: 'Proceso',
      heading: 'Empezamos hoy. Conceptos en 48 horas.',
      steps: [
        {
          when: 'Hoy',
          title: 'Reunión de inicio',
          text: 'Una llamada enfocada para alinear objetivos y alcance; empezamos en cuanto colgamos.',
        },
        {
          when: 'En 24 h',
          title: 'Tu portal queda listo',
          text: 'Un espacio de trabajo en Notion con tu backlog y un canal compartido de Slack. Sin cadenas de correos.',
        },
        {
          when: '48 h después',
          title: 'Primeros conceptos en alta fidelidad',
          text: 'Sin esperar semanas por una gran revelación.',
        },
      ],
    },
    testimonials: { label: 'Lo que dicen los clientes', portrait: 'Retrato de {name}' },
    engagements: {
      label: 'Modelos de trabajo',
      heading: 'Tres formas de trabajar con nosotros',
      hoverHint: 'Pasa el cursor para ver el detalle',
      tapHint: 'Toca para ver el detalle',
      note: 'Muchos clientes lanzan un MVP en un Launch Sprint y luego pasan a Design Partner.',
      compare: 'Compara los modelos',
    },
    final: { label: 'Siguiente paso', lines: ['Hagamos', 'algo que', 'se entienda', 'al instante.'], or: 'o' },
  },
};
