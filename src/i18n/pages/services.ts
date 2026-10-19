import type { Localized } from '../config';

/** Copy shared by the services, industries and engagements pages (the "inner" pages), and by their index pages. */
export interface InnerCopy {
  hero: { book: string };
  cta: { heading: string };
  next: { label: string };
  process: { label: string; heading: string; delivered: string; stepNo: string };
  index: {
    meta: { title: string; description: string };
    answer: string;
    label: string;
    heading: string;
    secondary: string;
    stackLabel: string;
    kicker: string;
    about: string;
    engagements: { label: string; heading: string };
    ctaHeading: string;
    faqs: { q: string; a: string }[];
  };
  detail: {
    label: string;
    whoLabel: string;
    whoHeading: string;
    includedLabel: string;
    includedHeading: string;
    cover: string;
    deliverables: string;
    outcomesLabel: string;
    outcomesHeading: string;
    /** {name} is the lowercase service name. */
    outcomesSub: string;
    secondary: string;
    otherLabel: string;
    otherHeading: string;
    engagementsName: string;
    engagementsSummary: string;
    /** {name} is the service name. */
    title: string;
  };
  art: {
    decide: string;
    terminal: string;
    build: string;
    test: string;
    automate: string;
    shipped: string;
    mvp: string;
  };
  /** Words inside the decorative industry illustrations. */
  industryArt: {
    cloud: string;
    alerts: string;
    build: string;
    test: string;
    stage: string;
    ship: string;
    deploy: string;
    health: string;
    rollback: string;
    live: string;
    plan: string;
    review: string;
    slide: string;
  };
}

export const innerCopy: Localized<InnerCopy> = {
  en: {
    hero: { book: 'Book a 15 minute call' },
    cta: { heading: 'Let’s build something people get instantly.' },
    next: { label: 'Keep going' },
    process: {
      label: 'Process',
      heading: 'Kickoff today. Concepts in 48 hours.',
      delivered: 'Delivered',
      stepNo: 'Step {n}',
    },
    index: {
      meta: {
        title: 'Services: Product Strategy, Design, Web and Build',
        description:
          'delbueno™ Studio offers product strategy, product design, web design and no-code build services for B2B SaaS teams and startups. Concepts in 48 hours.',
      },
      answer:
        'delbueno™ Studio offers four services to B2B SaaS teams and startups: product strategy, product design, web design and build. Teams use one or all four, working through a fixed-scope Launch Sprint, a Design Partner subscription or a dedicated designer. Kickoff happens the same day and first concepts arrive within 48 hours.',
      label: 'Services',
      heading: 'Strategy, design, web and build.',
      secondary: 'Compare engagements',
      stackLabel: 'The four services',
      kicker: 'Four disciplines',
      about: 'About {name}',
      engagements: { label: 'Engagements', heading: 'Three ways to work together.' },
      ctaHeading: 'Not sure where to start? Book a call.',
      faqs: [
        {
          q: 'What services does delbueno™ Studio offer?',
          a: 'Four: product strategy (audits, usability testing, research and roadmaps), product design (UX and UI for web and mobile, design systems), web design (marketing websites, launch assets and animation) and build (no-code and low-code MVPs, automations and internal tools). We specialize in UX for complex industries such as cloud, cybersecurity, DevOps, AI and fintech.',
        },
        {
          q: 'Can we start with just one service?',
          a: 'Yes. Most teams start with one, for example a product audit or a redesign of a single module, and add others as the work grows.',
        },
        {
          q: 'How do the services relate to the engagement models?',
          a: 'Any service can run as a Launch Sprint with fixed scope and a flat fee, as a Design Partner subscription with unlimited requests delivered in 24 to 48 hours each, or with a dedicated Designer on Demand inside your Slack and Figma.',
        },
        {
          q: 'Do you offer post-launch support?',
          a: 'Yes. Post-launch support covers UX enhancements, system updates and ongoing analysis of user feedback, so the product keeps evolving after release.',
        },
      ],
    },
    detail: {
      label: 'Service',
      whoLabel: 'Who it is for',
      whoHeading: 'Built for teams like yours.',
      includedLabel: 'What is included',
      includedHeading: 'What we cover and what you get.',
      cover: 'What we cover',
      deliverables: 'Deliverables',
      outcomesLabel: 'Outcomes',
      outcomesHeading: 'Where this service has shipped.',
      outcomesSub: 'Real projects that used {name}, with the results we measured.',
      secondary: 'See engagements',
      otherLabel: 'Other services',
      otherHeading: 'Keep exploring.',
      engagementsName: 'Engagements',
      engagementsSummary: 'Launch Sprint, Design Partner or Designer on Demand.',
      title: '{name} for B2B SaaS and startups',
    },
    art: {
      decide: 'decide',
      terminal: 'terminal',
      build: '> build --prod',
      test: '> test ........ ok',
      automate: '> automate ... ok',
      shipped: 'shipped',
      mvp: 'MVP, weeks not quarters',
    },
    industryArt: {
      cloud: 'regions, resources, cost',
      alerts: 'alerts',
      build: 'build',
      test: 'test',
      stage: 'stage',
      ship: 'ship',
      deploy: '> deploy --env prod',
      health: '> health checks .... ok',
      rollback: '> rollback ready',
      live: 'live',
      plan: 'plan',
      review: 'review before it runs',
      slide: 'slide to confirm',
    },
  },
  es: {
    hero: { book: 'Agenda una llamada de 15 minutos' },
    cta: { heading: 'Hagamos algo que se entienda al instante.' },
    next: { label: 'Sigue explorando' },
    process: {
      label: 'Proceso',
      heading: 'Empezamos hoy. Conceptos en 48 horas.',
      delivered: 'Entrega',
      stepNo: 'Paso {n}',
    },
    index: {
      meta: {
        title: 'Servicios: estrategia, diseño de producto, web y desarrollo',
        description:
          'delbueno™ Studio ofrece estrategia de producto, diseño de producto, diseño web y desarrollo no-code para equipos B2B SaaS y startups. Conceptos en 48 h.',
      },
      answer:
        'delbueno™ Studio ofrece cuatro servicios a equipos B2B SaaS y startups: estrategia de producto, diseño de producto, diseño web y desarrollo. Los equipos usan uno o los cuatro, a través de un Launch Sprint de alcance fijo, una suscripción Design Partner o un diseñador dedicado. Empezamos el mismo día y los primeros conceptos llegan en 48 horas.',
      label: 'Servicios',
      heading: 'Estrategia, diseño, web y desarrollo.',
      secondary: 'Compara los modelos de trabajo',
      stackLabel: 'Los cuatro servicios',
      kicker: 'Cuatro disciplinas',
      about: 'Más sobre {name}',
      engagements: { label: 'Modelos de trabajo', heading: 'Tres formas de trabajar juntos.' },
      ctaHeading: '¿No sabes por dónde empezar? Agenda una llamada.',
      faqs: [
        {
          q: '¿Qué servicios ofrece delbueno™ Studio?',
          a: 'Cuatro: estrategia de producto (auditorías, pruebas de usabilidad, investigación y roadmaps), diseño de producto (UX y UI para web y móvil, sistemas de diseño), diseño web (sitios de marketing, materiales de lanzamiento y animación) y desarrollo (MVPs no-code y low-code, automatizaciones y herramientas internas). Nos especializamos en UX para industrias complejas como nube, ciberseguridad, DevOps, IA y fintech.',
        },
        {
          q: '¿Podemos empezar con un solo servicio?',
          a: 'Sí. La mayoría de los equipos empieza con uno, por ejemplo una auditoría de producto o el rediseño de un solo módulo, y suma otros a medida que el trabajo crece.',
        },
        {
          q: '¿Cómo se relacionan los servicios con los modelos de trabajo?',
          a: 'Cualquier servicio puede funcionar como un Launch Sprint de alcance fijo y tarifa fija, como una suscripción Design Partner con solicitudes ilimitadas entregadas en 24 a 48 horas cada una, o con un Designer on Demand dedicado dentro de tu Slack y tu Figma.',
        },
        {
          q: '¿Ofrecen soporte después del lanzamiento?',
          a: 'Sí. El soporte posterior al lanzamiento incluye mejoras de UX, actualizaciones del sistema y el análisis continuo del feedback de los usuarios, para que el producto siga evolucionando después de salir.',
        },
      ],
    },
    detail: {
      label: 'Servicio',
      whoLabel: 'Para quién es',
      whoHeading: 'Hecho para equipos como el tuyo.',
      includedLabel: 'Qué incluye',
      includedHeading: 'Qué cubrimos y qué recibes.',
      cover: 'Qué cubrimos',
      deliverables: 'Entregables',
      outcomesLabel: 'Resultados',
      outcomesHeading: 'Dónde se ha entregado este servicio.',
      outcomesSub: 'Proyectos reales que usaron {name}, con los resultados que medimos.',
      secondary: 'Ver modelos de trabajo',
      otherLabel: 'Otros servicios',
      otherHeading: 'Sigue explorando.',
      engagementsName: 'Modelos de trabajo',
      engagementsSummary: 'Launch Sprint, Design Partner o Designer on Demand.',
      title: '{name} para B2B SaaS y startups',
    },
    art: {
      decide: 'decide',
      terminal: 'terminal',
      build: '> build --prod',
      test: '> test ........ ok',
      automate: '> automate ... ok',
      shipped: 'listo',
      mvp: 'MVP en semanas, no trimestres',
    },
    industryArt: {
      cloud: 'regiones, recursos, costo',
      alerts: 'alertas',
      build: 'build',
      test: 'test',
      stage: 'staging',
      ship: 'release',
      deploy: '> deploy --env prod',
      health: '> health checks .... ok',
      rollback: '> rollback listo',
      live: 'en vivo',
      plan: 'plan',
      review: 'revisa antes de ejecutar',
      slide: 'desliza para confirmar',
    },
  },
};
