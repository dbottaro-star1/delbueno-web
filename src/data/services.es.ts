import type { Service, ServiceText } from './services';

/** The 48 hour process in Spanish. Same order as `processSteps` in services.ts. */
export const processStepsEs = [
  {
    when: 'Hoy',
    title: 'Reunión de inicio',
    text: 'Una llamada enfocada para alinear objetivos y alcance. Empezamos en cuanto colgamos.',
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
] as const;

/** Spanish copy for each service. Slugs, case study links and ordering stay in services.ts. */
export const servicesEs: Record<Service['slug'], ServiceText> = {
  'product-strategy': {
    seoDescription:
      'Estrategia de producto para B2B SaaS y startups: auditorías, pruebas de usabilidad, investigación y apoyo de PM, con un roadmap priorizado y un brief.',
    home: {
      title: 'Estrategia de producto',
      kicker: 'Decide primero',
      description:
        'Investigación, auditorías de producto, pruebas de usabilidad y roadmaps. Decide qué construir antes de construirlo.',
      chips: ['Investigación', 'Auditorías de producto', 'Pruebas de usabilidad', 'Roadmaps'],
    },
    name: 'Estrategia de producto',
    summary:
      'Auditorías de producto, pruebas de usabilidad, investigación y roadmaps que te dicen qué construir después.',
    headline: 'Decide qué construir antes de construirlo.',
    answer:
      'delbueno™ Studio hace estrategia de producto para equipos B2B SaaS y startups: auditorías de producto, pruebas de usabilidad, investigación de usuarios y apoyo en gestión de producto. Encontramos dónde se atascan los usuarios, ordenamos las correcciones por impacto y te entregamos un roadmap priorizado y un brief de diseño con el que tu equipo puede empezar esa misma semana.',
    whoFor: {
      lead: 'Fundadores y equipos de producto que necesitan decidir qué construir, o entender por qué un producto ya lanzado no convierte, antes de invertir más en diseño o ingeniería.',
      points: [
        'Los usuarios nuevos abandonan después del registro y no ves dónde',
        'Tu roadmap es una lista larga sin un orden claro',
        'Los tickets de soporte siguen preguntando cómo hacer tareas básicas',
        'Quieres evidencia de usuarios reales antes de comprometerte con un rediseño',
      ],
    },
    covers: [
      'Auditorías de producto y de UX',
      'Pruebas de usabilidad',
      'Investigación de usuarios y personas',
      'Gestión de producto y roadmapping',
    ],
    deliverables: [
      'Informe de auditoría con hallazgos ordenados de severidad baja a crítica',
      'Análisis de fricción UX y revisión de UI: jerarquía, tipografía y contraste',
      'Guion de pruebas de usabilidad, grabaciones de las sesiones y un video con los momentos clave',
      'Roadmap de correcciones prioritarias en PDF',
      'Roadmap de producto priorizado con RICE o con valor frente a esfuerzo',
      'Brief de diseño listo para el próximo sprint',
    ],
    timing: {
      title: 'Hallazgos con los que puedes actuar',
      text: 'Una auditoría de producto toma de 5 a 7 días hábiles y termina con una presentación en vivo. Las pruebas de usabilidad toman de 7 a 10 días.',
    },
    faqs: [
      {
        q: '¿Qué incluye una auditoría de producto?',
        a: 'Una revisión manual de tus flujos clave con los ojos de un usuario nuevo y de un usuario avanzado, una revisión de UI de jerarquía, tipografía y contraste, y un informe ordenado de severidad baja a crítica. Toma de 5 a 7 días hábiles y termina con una presentación en vivo. Para empezar necesitamos acceso al producto y, si los tienes, a tus herramientas de analítica y mapas de calor.',
      },
      {
        q: '¿Cuánto tardan las pruebas de usabilidad?',
        a: 'Normalmente de 7 a 10 días. Escribimos el guion de la prueba, reclutamos participantes en un panel de investigación o entre tus propios clientes, hacemos sesiones moderadas o sin moderar y entregamos un informe en PDF con un video de momentos clave y un roadmap de correcciones prioritarias.',
      },
      {
        q: '¿Solo asesoran o también implementan las correcciones?',
        a: 'Se pueden hacer las dos cosas. Una auditoría puede terminar en un roadmap que le entregas a tu propio equipo, o seguir en un Design Sprint donde implementamos los hallazgos.',
      },
      {
        q: '¿Pueden trabajar con nuestras herramientas de producto?',
        a: 'Sí. Planificamos en Miro y Notion y trabajamos dentro del tracker que ya usan tus ingenieros, como Jira, Linear o Trello. Priorizamos con RICE o con valor frente a esfuerzo, y el control del roadmap sigue siendo tuyo.',
      },
    ],
  },
  'product-design': {
    seoDescription:
      'Diseño de producto para B2B SaaS: web y móvil, desde los primeros conceptos hasta un sistema de diseño en producción, con dashboards, permisos y alertas.',
    home: {
      title: 'Diseño de producto',
      kicker: 'Diseño que se lanza',
      description: 'UX/UI para web y móvil, y sistemas de diseño que reducen en ~30% el retrabajo de desarrollo.',
      chips: ['UX/UI para web', 'Apps móviles', 'Sistemas de diseño'],
    },
    name: 'Diseño de producto',
    summary: 'Diseño UX y UI para aplicaciones web, apps móviles y sistemas de diseño.',
    headline: 'Interfaces que hacen que el software complejo se sienta obvio.',
    answer:
      'delbueno™ Studio diseña productos web y móviles para equipos B2B SaaS, desde los primeros conceptos hasta un sistema de diseño en producción. Nos especializamos en interfaces densas y cargadas de datos, como dashboards, permisos y alertas. Empezamos el mismo día y los primeros conceptos en alta fidelidad llegan en 48 horas.',
    whoFor: {
      lead: 'Equipos SaaS que lanzan un producto nuevo, un módulo nuevo o un rediseño, y equipos cuya interfaz ya superó la primera versión que armaron los ingenieros.',
      points: [
        'Estás construyendo un MVP, una app móvil o un módulo nuevo',
        'La interfaz parece hecha por ingenieros',
        'Las funciones clave están enterradas en una navegación densa',
        'Los desarrolladores reconstruyen los mismos componentes un poco distinto en cada sprint',
      ],
    },
    covers: [
      'Diseño UX y UI para aplicaciones web',
      'Diseño de apps móviles para iOS y Android',
      'Sistemas de diseño',
      'Dashboards y visualización de datos',
      'UX de arquitectura de software: roles, permisos y vistas multi-tenant',
    ],
    deliverables: [
      'Prototipos interactivos en alta fidelidad',
      'Biblioteca de componentes y sistema de diseño en Figma',
      'Design tokens que se traducen a variables CSS, Tailwind o componentes de React',
      'Paquete de handoff para desarrollo y una reunión de sincronización',
      'QA de diseño mientras tu equipo construye',
    ],
    timing: {
      title: 'Diseño listo para el handoff',
      text: 'Una función en alta fidelidad suele tomar de 1 a 2 semanas, y seguimos durante la implementación para revisar los builds.',
    },
    faqs: [
      {
        q: '¿Qué tan rápido pueden empezar?',
        a: 'Empezamos el mismo día en que acordamos el alcance, y ves los primeros conceptos en alta fidelidad en 48 horas. Después, una función suele tomar de 1 a 2 semanas en llegar a alta fidelidad.',
      },
      {
        q: '¿Cómo hacen el handoff a nuestros desarrolladores?',
        a: 'Con un paquete de handoff y una reunión de sincronización. Seguimos disponibles durante la implementación para revisar los builds, y los design tokens se traducen directamente a variables CSS, Tailwind o componentes de React.',
      },
      {
        q: '¿Pueden partir de nuestra marca o de nuestro sistema de diseño actual?',
        a: 'Sí. Primero auditamos lo que tienes y después lo extendemos en lugar de reemplazarlo.',
      },
      {
        q: '¿Prueban los diseños con usuarios reales?',
        a: 'Sí. Probamos los prototipos con usuarios de tus clientes o de un panel de investigación, y llevamos los hallazgos al diseño antes del handoff.',
      },
    ],
  },
  'web-design': {
    seoDescription:
      'Sitios web de marketing para B2B SaaS con materiales de lanzamiento y animación 2D o 3D, en Webflow, Framer, WordPress o código, editables por tu equipo.',
    home: {
      title: 'Sitios web y marca',
      kicker: 'Hechos para convertir',
      description: 'Sitios de marketing, motion y materiales de lanzamiento hechos para convertir.',
      chips: ['Sitios de marketing', 'Motion', 'Materiales de lanzamiento'],
    },
    name: 'Diseño web',
    summary: 'Sitios web de marketing, materiales de lanzamiento y motion design, hechos para convertir.',
    headline: 'Sitios web que explican el producto y consiguen la llamada.',
    answer:
      'delbueno™ Studio diseña y construye sitios web de marketing para empresas B2B SaaS, junto con los materiales de lanzamiento y la animación 2D o 3D que los acompañan. Escribimos para que se entienda, diseñamos para que cargue rápido y entregamos sitios que tu equipo puede editar sin un desarrollador, hechos en Webflow, Framer, WordPress o código a medida.',
    whoFor: {
      lead: 'Empresas B2B SaaS y startups cuyo sitio ya no explica el producto, carga lento o se ve más viejo que el producto que hay detrás.',
      points: [
        'Estás por lanzar y necesitas una landing page y materiales de lanzamiento',
        'Tu sitio tiene unos años y no convierte',
        'Marketing necesita editar páginas sin esperar a ingeniería',
        'Quieres motion explicativo o renders 3D del producto',
      ],
    },
    covers: [
      'Sitios web de marketing',
      'Landing pages',
      'Materiales de marketing: anuncios, pitch decks y kits para redes',
      'Animación 2D y 3D',
      'Migraciones que conservan tu tráfico de búsqueda',
    ],
    deliverables: [
      'Sitio web responsive, diseñado en Figma y construido en Webflow, Framer, WordPress o código',
      'Estructura de páginas y dirección de copy enfocadas en conversión',
      'Anuncios, pitch decks y kits de marca para redes',
      'Explainers en 2D o renders 3D del producto',
      'Mapa de URLs y redirecciones cuando reemplazamos un sitio existente',
      'Revisiones de rendimiento y accesibilidad antes del lanzamiento',
    ],
    timing: {
      title: 'Un sitio que tu equipo puede manejar',
      text: 'Conceptos en 48 horas y después construcción en la plataforma que mejor le queda a tu equipo. Los proyectos de animación toman de 2 a 6 semanas.',
    },
    faqs: [
      {
        q: '¿En qué plataformas construyen?',
        a: 'Elegimos el stack que le queda a tu equipo: Webflow, Framer o WordPress, con diseños preparados en Figma y HTML, CSS y JavaScript a medida donde hace falta. Te explicamos las ventajas y desventajas antes de empezar.',
      },
      {
        q: '¿Podemos migrar sin perder tráfico de búsqueda?',
        a: 'Sí. Asignamos cada URL antigua a su nueva dirección y configuramos las redirecciones, para que el tráfico que ya ganaste pase al sitio nuevo.',
      },
      {
        q: '¿Podremos editar el sitio nosotros después del lanzamiento?',
        a: 'Sí. Entregamos un sitio que tu equipo puede iterar sin ingenieros: lanzas en semanas y haces ajustes en horas.',
      },
      {
        q: '¿Cuánto tarda un proyecto de animación?',
        a: 'Normalmente de 2 a 6 semanas. Escribimos el concepto y el guion, armamos el storyboard, diseñamos la ilustración o los modelos 3D, animamos y entregamos formatos para web, anuncios, presentaciones y redes.',
      },
    ],
  },
  build: {
    seoDescription:
      'MVPs no-code y low-code, automatizaciones y herramientas internas, más apps en Flutter, React o Next.js si hacen falta. Un MVP simple, en 1 a 4 semanas.',
    home: {
      title: 'Desarrollo',
      kicker: 'Listo para producción en semanas',
      description:
        'MVPs no-code y low-code, automatizaciones y herramientas internas, listos para producción en semanas.',
      chips: ['MVPs no-code y low-code', 'Automatizaciones', 'Herramientas internas'],
    },
    name: 'Desarrollo',
    summary:
      'MVPs no-code y low-code, automatización de flujos de trabajo, herramientas internas y desarrollo de apps.',
    headline: 'Lanza un producto que funciona sin esperar a un equipo completo de ingeniería.',
    answer:
      'delbueno™ Studio construye MVPs, automatizaciones de flujos de trabajo y herramientas internas con plataformas no-code y low-code, y apps en Flutter, React o Next.js cuando el producto las necesita. Los equipos lo usan para validar una idea, reemplazar un proceso en hojas de cálculo o darle a operaciones una herramienta propia. Un MVP simple sale en 1 a 4 semanas.',
    whoFor: {
      lead: 'Fundadores que necesitan un producto funcionando antes de poder justificar un equipo completo de ingeniería, y equipos de operaciones atascados en hojas de cálculo y traspasos manuales.',
      points: [
        'Quieres probar una idea con usuarios reales en semanas, no en trimestres',
        'Un proceso corre sobre hojas de cálculo, copiar y pegar, y correo',
        'Tus ingenieros deberían quedarse en el producto principal',
        'Necesitas un CRM, un dashboard, un control de inventario o un panel de administración propios',
      ],
    },
    covers: [
      'MVPs no-code y low-code',
      'Automatización de flujos de trabajo',
      'Herramientas internas de negocio',
      'Desarrollo de apps en Flutter, React y Next.js',
    ],
    deliverables: [
      'Un MVP funcionando en producción',
      'Automatizaciones conectadas a herramientas como Slack, Salesforce, Notion y Airtable',
      'Manejo de errores y monitoreo para cada automatización',
      'Documentación y capacitación de traspaso',
      'Una ruta de migración si superas la plataforma',
    ],
    timing: {
      title: 'En vivo, no un prototipo',
      text: 'Los MVPs simples salen en 1 a 4 semanas, con una versión funcional para revisar en el camino.',
    },
    faqs: [
      {
        q: '¿Cuándo conviene el no-code?',
        a: 'Cuando la velocidad para aprender importa más que una infraestructura a medida: validación temprana, herramientas internas y procesos con un responsable claro.',
      },
      {
        q: '¿Con qué herramientas construyen?',
        a: 'Para no-code y low-code usamos Webflow, Airtable, Zapier, Bubble, Firebase, Lovable y Figma. Para automatización usamos n8n, Zapier y Make, además de scripts y APIs a medida donde hacen falta.',
      },
      {
        q: '¿Qué pasa cuando superamos la plataforma?',
        a: 'Documentamos el modelo de datos y los flujos desde el primer día, para que un equipo de ingeniería pueda reconstruir sobre un stack propio sin empezar de cero.',
      },
      {
        q: '¿De quién es lo que construyen?',
        a: 'Tuyo. El trabajo a medida se entrega como obra por encargo, y la propiedad intelectual se transfiere a ti con el pago final.',
      },
    ],
  },
  'ai-development': {
    seoDescription:
      'Desarrollo con IA para startups y B2B SaaS: funciones de IA, agentes, MVPs acelerados con IA y productos nativos de IA, diseñados y construidos juntos.',
    home: {
      title: 'Desarrollo con IA',
      kicker: 'IA que se lanza',
      description:
        'IA a medida para startups y SaaS: funciones, agentes y productos nativos de IA, diseñados y construidos por un solo equipo.',
      chips: ['Funciones de IA', 'Agentes de IA', 'MVPs acelerados con IA', 'Productos nativos de IA'],
    },
    name: 'Desarrollo con IA',
    summary:
      'Funciones de IA, agentes y automatizaciones, MVPs acelerados con IA y productos nativos de IA, diseñados y construidos por un solo equipo.',
    headline: 'IA a medida, diseñada y construida por un solo equipo.',
    answer:
      'delbueno™ Studio construye IA a medida para startups y B2B SaaS: funciones de IA dentro de tu producto, agentes y automatizaciones de flujos de trabajo, MVPs construidos más rápido con herramientas de IA y productos nativos de IA desde cero. Un solo equipo diseña la experiencia y escribe el código, así que la interfaz, el modelo y tus datos encajan. Empezamos el mismo día.',
    whoFor: {
      lead: 'Fundadores y equipos de producto que quieren IA dentro de su producto o de sus operaciones, y quieren un solo equipo que la diseñe para que la gente confíe en ella y la construya para que funcione.',
      points: [
        'Quieres un copiloto, una búsqueda inteligente o resúmenes dentro de tu producto SaaS',
        'Un flujo manual debería correr con un agente, con una persona que apruebe los pasos riesgosos',
        'Necesitas una primera versión rápido y quieres construirla con herramientas de IA',
        'Tienes datos propios y quieres un asistente que responda a partir de ellos',
      ],
    },
    covers: [
      'Funciones de IA dentro de productos SaaS: copilotos, búsqueda inteligente, resúmenes y asistentes',
      'Agentes de IA y automatizaciones de flujos de trabajo',
      'MVPs acelerados con IA, diseñados y construidos con herramientas como Claude Code y Cursor',
      'Productos nativos de IA desde cero: apps con LLM y recuperación sobre tus propios datos',
      'Diseño de interacción con IA: controles human-in-the-loop y resultados explicables',
    ],
    deliverables: [
      'Prototipos interactivos en alta fidelidad de la experiencia de IA, con estados de carga, error y baja confianza',
      'Un producto funcionando en producción, conectado a tus datos y herramientas',
      'Pasos de revisión y aprobación para cada acción que un agente hace por su cuenta',
      'Pruebas con ejemplos reales de tus propios datos antes del lanzamiento',
      'Documentación y capacitación de traspaso',
    ],
    timing: {
      title: 'Diseñado y construido juntos',
      text: 'Empezamos el mismo día y los primeros conceptos llegan en 48 horas. Después construimos en ciclos cortos, con una versión funcional para que revises en el camino.',
    },
    faqs: [
      {
        q: '¿Qué incluye el desarrollo con IA a medida?',
        a: 'Cuatro tipos de trabajo: funciones de IA dentro de tu producto SaaS (copilotos, búsqueda inteligente, resúmenes y asistentes), agentes de IA y automatizaciones de flujos de trabajo, MVPs acelerados con IA y productos nativos de IA desde cero, incluidas apps con LLM y recuperación sobre tus propios datos. El mismo equipo diseña y construye cada uno.',
      },
      {
        q: '¿Qué es un MVP acelerado con IA?',
        a: 'Un MVP que diseñamos y construimos con herramientas de IA como Claude Code y Cursor, para que la primera versión salga más rápido. Las personas de nuestro equipo siguen diseñando, revisando y decidiendo todo, y recibes el mismo traspaso que con cualquier otro desarrollo.',
      },
      {
        q: '¿Diseñan la experiencia de IA además de construirla?',
        a: 'Sí, ese es el sentido de ser un solo equipo. Diseñamos cómo las personas piden, revisan, corrigen y confían en la IA, y después la construimos. Nuestros artículos sobre UX de agentes de IA con human-in-the-loop y sobre UX de IA explicable muestran cómo lo abordamos.',
      },
      {
        q: '¿La IA puede trabajar con nuestros datos y herramientas?',
        a: 'Sí. Construimos recuperación sobre tus propios datos y conectamos agentes a las herramientas que tu equipo ya usa. Antes de escribir código acordamos qué puede leer la IA y qué puede hacer por su cuenta.',
      },
      {
        q: '¿De quién es lo que construyen?',
        a: 'Tuyo. El trabajo a medida se entrega como obra por encargo, y la propiedad intelectual se transfiere a ti con el pago final. Firmamos un NDA si lo pides.',
      },
    ],
  },
};
