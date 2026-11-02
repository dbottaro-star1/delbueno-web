import type { Localized } from '../config';

export interface AuditCopy {
  meta: { title: string; description: string; name: string; serviceType: string };
  mail: { subject: string; lines: string[] };
  eyebrow: string;
  title: string;
  accent: string;
  lede: string;
  book: string;
  email: string;
  tags: string[];
  limit: string;
  painLabel: string;
  painHeading: string;
  pains: { q: string; a: string }[];
  getLabel: string;
  getHeading: string;
  gets: { t: string; d: string }[];
  card: { aria: string; report: string; badge: string; title: string; items: string[]; foot: string };
  insideLabel: string;
  insideHeading: string;
  inside: { t: string; d: string; l: string[] }[];
  howLabel: string;
  howHeading: string;
  steps: { when: string; title: string; text: string }[];
  faqLabel: string;
  faqHeading: string;
  faq: { q: string; a: string }[];
  disclaimer: string;
  cta: { heading: string; label: string; sub: string };
  form: {
    heading: string;
    subject: string;
    email: string;
    emailPh: string;
    stage: string;
    stagePh: string;
    stages: string[];
    link: string;
    linkPh: string;
    linkHint: string;
    goal: string;
    goalPh: string;
    optional: string;
    submit: string;
    sending: string;
    privacy: string;
    error: string;
    successTitle: string;
    success: string;
    book: string;
    /** Who reviews the product, shown with the founder photo at the top of the form. */
    reviewer: { lead: string; role: string };
    /** Only on pages that offer WhatsApp. */
    whatsapp?: { label: string; message: string };
  };
}

export const auditCopy: Localized<AuditCopy> = {
  en: {
    meta: {
      title: 'Free UX Audit in 48 Hours',
      description:
        'Get a free UX audit from delbueno™ Studio: a personalized 3 point plan for your mobile app, desktop app or website, delivered 48 hours after you send it.',
      name: 'Free UX audit',
      serviceType: 'UX audit',
    },
    mail: {
      subject: 'Free UX audit request',
      lines: [
        'Hi delbueno team,',
        '',
        'I would like a free UX audit.',
        '',
        'Product URL (or a link to a prototype):',
        '',
        'What it does, in one line:',
        '',
        'Where it hurts most (onboarding, retention, support tickets, something else):',
        '',
        'My name and role:',
      ],
    },
    eyebrow: 'Free UX audit / Limited audits per week',
    title: 'A free UX audit.',
    accent: 'Back in 48 hours.',
    lede: 'The free UX audit is a personalized 3 point plan for your product, delivered 48 hours after you send it. We analyze your onboarding flow and retention friction within 24 hours, then rank the three changes worth making first. It covers mobile apps, desktop apps and websites.',
    book: 'Book a call to start',
    email: 'Email your product URL',
    tags: ['Mobile apps', 'Desktop apps', 'Websites'],
    limit: 'No credit card. No commitment. We take a limited number of audits per week.',
    painLabel: 'Sound familiar?',
    painHeading: 'The warning signs we fix every day.',
    pains: [
      {
        q: 'Are most new users gone within a week?',
        a: 'Your onboarding flow may be too complex, and users leave before they understand the value.',
      },
      {
        q: 'Is unclear UX causing costly developer rework?',
        a: 'Every unclear interface means wasted sprints, confused users and developers rebuilding features.',
      },
      {
        q: 'Are support tickets full of “How do I…?” questions?',
        a: 'If your team spends hours explaining basic flows, the interface is not doing its job.',
      },
    ],
    getLabel: 'What you get in 48 hours',
    getHeading: 'A focused plan for your live product.',
    gets: [
      {
        t: 'Onboarding flow analysis',
        d: 'We audit your current user journey from signup to first success, and show where users drop off and why.',
      },
      {
        t: 'Retention friction points',
        d: 'We pinpoint the UI and UX issues that stop people reaching their “aha moment” and becoming active users.',
      },
      {
        t: 'Priority action plan',
        d: 'Three specific, high-impact changes, ranked, each with its expected effect on retention and the dev effort it takes.',
      },
    ],
    card: {
      aria: 'Structure of the audit report',
      report: 'Audit report',
      badge: '3 point plan',
      title: 'Your product',
      items: ['Critical friction points', 'Priority quick wins', 'Strategic roadmap'],
      foot: 'Bonus: competitive analysis, industry benchmarks, innovation opportunities',
    },
    insideLabel: 'What is inside',
    insideHeading: 'Personalized, and built around your onboarding.',
    inside: [
      {
        t: 'Critical friction points',
        d: 'The exact moments where users get confused, stuck or frustrated in your flow.',
        l: ['Drop-off point identification', 'Cognitive load assessment'],
      },
      {
        t: 'Priority quick wins',
        d: 'Low-effort changes your team can ship right away.',
        l: ['Copy and microcopy fixes', 'Visual hierarchy improvements'],
      },
      {
        t: 'Strategic roadmap',
        d: 'A phased plan for deeper improvements that compound over time.',
        l: ['Feature prioritization framework', 'Personalization opportunities', 'Long-term retention strategies'],
      },
    ],
    howLabel: 'How it works',
    howHeading: 'Simple, fast and free.',
    steps: [
      {
        when: 'Today',
        title: 'You send your product',
        text: 'Book a call or email us your product URL. It takes a minute.',
      },
      {
        when: 'Within 24h',
        title: 'We analyze it',
        text: 'Senior UX strategists run a deep-dive audit of your onboarding flow, friction points and opportunities.',
      },
      {
        when: '48h later',
        title: 'You get a 3 point plan',
        text: 'Delivered to your inbox, ready to share with your team and start on.',
      },
    ],
    faqLabel: 'FAQ',
    faqHeading: 'Questions, answered.',
    faq: [
      {
        q: 'Is this really free?',
        a: 'Yes. No credit card and no hidden fees. We offer the audit to show how we work, and there is zero obligation to work with us afterward.',
      },
      {
        q: 'What if my product is still in beta or stealth mode?',
        a: 'We work with pre-launch products regularly and sign an NDA on request. Early UX decisions are cheaper to change before launch than after it.',
      },
      {
        q: 'Do you only work with large companies?',
        a: 'No. We work with teams from seed-stage startups to Series C and beyond. If you are building a complex B2B SaaS product and care about user experience, write to us.',
      },
      {
        q: 'What happens after I receive the audit?',
        a: 'That is entirely up to you. You can implement the recommendations yourself, share them with your team, or reach out if you want help executing the plan. There is no pressure either way.',
      },
      {
        q: 'How detailed is the 3 point plan?',
        a: 'It contains specific recommendations with screenshots, annotations and clear next steps, so your team can start on it right away.',
      },
      {
        q: 'What industries do you focus on?',
        a: 'B2B SaaS across cloud computing, AI and ML platforms, DevOps tools, productivity, cybersecurity, fintech, edtech and medtech or wellness. If your industry is not listed but your product involves technical workflows, write to us anyway.',
      },
    ],
    disclaimer:
      'Because the work is manual, we accept a limited number of audits per week, and we may decline requests that do not fit our current capacity.',
    cta: {
      heading: 'Ready to fix your onboarding?',
      label: 'Start',
      sub: 'Book a call, or email your product URL. We start the clock when it arrives.',
    },
    form: {
      heading: 'Request your free UX audit',
      subject: 'New free UX audit request (EN)',
      email: 'Work email',
      emailPh: 'you@company.com',
      stage: 'Where is your product today?',
      stagePh: 'Choose one',
      stages: ['Live in production', 'Prototype or MVP', 'Still an idea'],
      link: 'Link to your product or prototype',
      linkPh: 'https://',
      linkHint: 'Website, App Store, Figma or a demo. Anything works.',
      goal: 'What would you like to improve?',
      goalPh: 'Onboarding, retention, a confusing dashboard',
      optional: '(optional)',
      submit: 'Get my free audit',
      sending: 'Sending',
      privacy: 'No spam. We only use your email to send the audit.',
      error: 'Something went wrong. Email us at hello@delbuenostudio.com and we will take it from there.',
      successTitle: 'Request received.',
      success: 'We will send your audit within 48 hours. Keep an eye on your inbox.',
      book: 'Prefer to talk? Book a 15 minute call',
      reviewer: {
        lead: 'Your audit is done by Dani Bottaro',
        role: 'Founder. 10 years designing B2B products, ex JFrog.',
      },
    },
  },
  es: {
    meta: {
      title: 'Auditoría UX gratis en 48 horas',
      description:
        'Pide una auditoría UX gratis a delbueno™ Studio: un plan de 3 puntos para tu app móvil, de escritorio o sitio web, 48 horas después de enviarla.',
      name: 'Auditoría UX gratis',
      serviceType: 'Auditoría UX',
    },
    mail: {
      subject: 'Solicitud de auditoría UX gratis',
      lines: [
        'Hola, equipo de delbueno:',
        '',
        'Me gustaría pedir una auditoría UX gratis.',
        '',
        'URL del producto (o un enlace a un prototipo):',
        '',
        'Qué hace, en una línea:',
        '',
        'Dónde duele más (onboarding, retención, tickets de soporte, otra cosa):',
        '',
        'Mi nombre y cargo:',
      ],
    },
    eyebrow: 'Auditoría UX gratis / Cupos limitados por semana',
    title: 'Una auditoría UX gratis.',
    accent: 'Lista en 48 horas.',
    lede: 'La auditoría UX gratis es un plan personalizado de 3 puntos para tu producto, entregado 48 horas después de que lo envíes. Analizamos tu flujo de onboarding y la fricción de retención en 24 horas, y luego ordenamos los tres cambios que conviene hacer primero. Cubre apps móviles, apps de escritorio y sitios web.',
    book: 'Agenda una llamada para empezar',
    email: 'Envíanos la URL de tu producto',
    tags: ['Apps móviles', 'Apps de escritorio', 'Sitios web'],
    limit: 'Sin tarjeta de crédito. Sin compromiso. Aceptamos una cantidad limitada de auditorías por semana.',
    painLabel: '¿Te suena familiar?',
    painHeading: 'Las señales de alerta que arreglamos todos los días.',
    pains: [
      {
        q: '¿La mayoría de los usuarios nuevos se va en una semana?',
        a: 'Puede que tu flujo de onboarding sea demasiado complejo y que los usuarios se vayan antes de entender el valor.',
      },
      {
        q: '¿Una UX poco clara genera retrabajo costoso en desarrollo?',
        a: 'Cada interfaz poco clara significa sprints desperdiciados, usuarios confundidos y desarrolladores reconstruyendo funciones.',
      },
      {
        q: '¿Los tickets de soporte están llenos de preguntas del tipo “¿Cómo hago…?”',
        a: 'Si tu equipo pasa horas explicando flujos básicos, la interfaz no está cumpliendo su trabajo.',
      },
    ],
    getLabel: 'Qué recibes en 48 horas',
    getHeading: 'Un plan enfocado para tu producto en producción.',
    gets: [
      {
        t: 'Análisis del flujo de onboarding',
        d: 'Auditamos el recorrido actual de tus usuarios desde el registro hasta el primer logro, y mostramos dónde abandonan y por qué.',
      },
      {
        t: 'Puntos de fricción en la retención',
        d: 'Identificamos los problemas de UI y UX que impiden que las personas lleguen a su “momento aha” y se vuelvan usuarios activos.',
      },
      {
        t: 'Plan de acción prioritario',
        d: 'Tres cambios específicos y de alto impacto, ordenados, cada uno con su efecto esperado en la retención y el esfuerzo de desarrollo que requiere.',
      },
    ],
    card: {
      aria: 'Estructura del informe de auditoría',
      report: 'Informe de auditoría',
      badge: 'Plan de 3 puntos',
      title: 'Tu producto',
      items: ['Puntos críticos de fricción', 'Mejoras rápidas prioritarias', 'Roadmap estratégico'],
      foot: 'Extra: análisis de la competencia, benchmarks del sector, oportunidades de innovación',
    },
    insideLabel: 'Qué hay dentro',
    insideHeading: 'Personalizada y construida en torno a tu onboarding.',
    inside: [
      {
        t: 'Puntos críticos de fricción',
        d: 'Los momentos exactos en que los usuarios se confunden, se traban o se frustran en tu flujo.',
        l: ['Identificación de los puntos de abandono', 'Evaluación de la carga cognitiva'],
      },
      {
        t: 'Mejoras rápidas prioritarias',
        d: 'Cambios de poco esfuerzo que tu equipo puede lanzar de inmediato.',
        l: ['Correcciones de copy y microcopy', 'Mejoras de jerarquía visual'],
      },
      {
        t: 'Roadmap estratégico',
        d: 'Un plan por fases para mejoras más profundas que se acumulan con el tiempo.',
        l: [
          'Marco de priorización de funciones',
          'Oportunidades de personalización',
          'Estrategias de retención a largo plazo',
        ],
      },
    ],
    howLabel: 'Cómo funciona',
    howHeading: 'Simple, rápido y gratis.',
    steps: [
      {
        when: 'Hoy',
        title: 'Nos envías tu producto',
        text: 'Agenda una llamada o envíanos la URL de tu producto. Toma un minuto.',
      },
      {
        when: 'En 24 h',
        title: 'Lo analizamos',
        text: 'Estrategas UX senior hacen una auditoría a fondo de tu flujo de onboarding, tus puntos de fricción y tus oportunidades.',
      },
      {
        when: '48 h después',
        title: 'Recibes un plan de 3 puntos',
        text: 'Llega a tu correo, listo para compartir con tu equipo y empezar a trabajar.',
      },
    ],
    faqLabel: 'Preguntas frecuentes',
    faqHeading: 'Preguntas, respondidas.',
    faq: [
      {
        q: '¿De verdad es gratis?',
        a: 'Sí. Sin tarjeta de crédito y sin cargos ocultos. Ofrecemos la auditoría para mostrar cómo trabajamos, y no hay ninguna obligación de trabajar con nosotros después.',
      },
      {
        q: '¿Y si mi producto sigue en beta o en modo stealth?',
        a: 'Trabajamos con productos previos al lanzamiento con frecuencia y firmamos un NDA si lo pides. Las decisiones tempranas de UX salen más baratas de cambiar antes del lanzamiento que después.',
      },
      {
        q: '¿Solo trabajan con empresas grandes?',
        a: 'No. Trabajamos con equipos desde startups en etapa seed hasta Serie C y más allá. Si estás construyendo un producto B2B SaaS complejo y te importa la experiencia de usuario, escríbenos.',
      },
      {
        q: '¿Qué pasa después de recibir la auditoría?',
        a: 'Depende totalmente de ti. Puedes implementar las recomendaciones por tu cuenta, compartirlas con tu equipo o escribirnos si quieres ayuda para ejecutar el plan. No hay presión en ningún caso.',
      },
      {
        q: '¿Qué tan detallado es el plan de 3 puntos?',
        a: 'Incluye recomendaciones específicas con capturas de pantalla, anotaciones y próximos pasos claros, para que tu equipo pueda empezar de inmediato.',
      },
      {
        q: '¿En qué industrias se enfocan?',
        a: 'B2B SaaS en computación en la nube, plataformas de IA y ML, herramientas DevOps, productividad, ciberseguridad, fintech, edtech y medtech o bienestar. Si tu industria no aparece pero tu producto implica flujos técnicos, escríbenos igual.',
      },
    ],
    disclaimer:
      'Como el trabajo es manual, aceptamos una cantidad limitada de auditorías por semana y podemos rechazar solicitudes que no encajen con nuestra capacidad actual.',
    cta: {
      heading: '¿Listo para arreglar tu onboarding?',
      label: 'Empezar',
      sub: 'Agenda una llamada o envíanos la URL de tu producto. Empezamos a contar el tiempo cuando llega.',
    },
    form: {
      heading: 'Pide tu auditoría UX gratis',
      subject: 'Nueva solicitud de auditoría UX gratis (ES)',
      email: 'Email de trabajo',
      emailPh: 'tu@empresa.com',
      stage: '¿En qué etapa está tu producto?',
      stagePh: 'Elige una opción',
      stages: ['En producción', 'Prototipo o MVP', 'Todavía es una idea'],
      link: 'Link a tu producto o prototipo',
      linkPh: 'https://',
      linkHint: 'Web, App Store, Figma o una demo. Lo que tengas.',
      goal: '¿Qué te gustaría mejorar?',
      goalPh: 'Onboarding, retención, un dashboard confuso',
      optional: '(opcional)',
      submit: 'Pedir mi auditoría gratis',
      sending: 'Enviando',
      privacy: 'Sin spam. Solo usamos tu email para enviarte la auditoría.',
      error: 'No se pudo enviar. Escríbenos a hello@delbuenostudio.com y lo vemos por ahí.',
      successTitle: '¡Listo, la recibimos!',
      success: 'Te enviamos la auditoría en menos de 48 horas. Revisa tu correo.',
      book: '¿Prefieres hablar? Agenda una llamada de 15 minutos',
      reviewer: {
        lead: 'Tu auditoría la hace Dani Bottaro',
        role: 'Fundador. 10 años diseñando productos B2B, ex JFrog.',
      },
      whatsapp: {
        label: 'O escríbenos por WhatsApp',
        message: 'Hola, quiero la auditoría UX gratis para mi producto.',
      },
    },
  },
};
