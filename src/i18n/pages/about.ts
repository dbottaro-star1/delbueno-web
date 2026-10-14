import type { Localized } from '../config';

export interface AboutCopy {
  meta: { title: string; description: string; schemaName: string };
  hero: { eyebrow: string; title: string; accent: string; ledeTemplate: string };
  numbersHeading: string;
  founder: { label: string; heading: string };
  how: { label: string; heading: string; steps: { when: string; title: string; text: string }[] };
  values: {
    label: string;
    heading: string;
    items: { name: string; line: string; text: string }[];
  };
  location: { label: string; heading: string; text: string; caption: string };
  clients: { label: string; heading: string };
  quotes: { label: string; heading: string };
  cta: { heading: string; sub: string };
}

export const aboutCopy: Localized<AboutCopy> = {
  en: {
    meta: {
      title: 'About delbueno: Founder-Led Product Design Studio',
      description:
        'delbueno™ Studio is a founder-led product design and development studio in Punta del Este, Uruguay, working remote in US hours for B2B SaaS and startups.',
      schemaName: 'About {brand}',
    },
    hero: {
      eyebrow: 'About / Founder-led studio',
      title: 'More than a service.',
      accent: 'We are in it with you.',
      ledeTemplate:
        '{brand} is a product design and development studio led by {founder}. We work remote from {locality}, {country}, synced with US hours, for B2B SaaS teams and ambitious startups.',
    },
    numbersHeading: 'The studio in numbers',
    founder: { label: 'Founder', heading: 'Led by {name}.' },
    how: {
      label: 'How we work',
      heading: 'Kickoff today. Concepts in 48 hours.',
      steps: [
        {
          when: 'Today',
          title: 'Strategic kickoff',
          text: 'One focused call to align on goals and scope. We start the moment we hang up.',
        },
        {
          when: 'Within 24h',
          title: 'Your Notion portal',
          text: 'A dedicated workspace with your backlog, so you always see what is moving.',
        },
        {
          when: 'In 48h',
          title: 'First concepts',
          text: 'High-fidelity concepts you can react to, instead of weeks of waiting for a big reveal.',
        },
        {
          when: 'Throughout',
          title: 'A shared Slack channel',
          text: 'Direct line to the people doing the work. No email chains.',
        },
      ],
    },
    values: {
      label: 'Values',
      heading: 'Four things we do not negotiate.',
      items: [
        {
          name: 'Transparency',
          line: 'Every step ahead clear.',
          text: 'We track the time spent on your project and charge you only for the hours we have dedicated. No hidden fees, no last minute charges.',
        },
        {
          name: 'Communication',
          line: 'Your project, your voice.',
          text: 'Every client gets a dedicated project leader and a shared Slack channel, so you talk to the people doing the work.',
        },
        {
          name: 'Empathy',
          line: 'The core of everything we do.',
          text: 'We listen to understand the needs and perspectives of our clients and their users, then put ourselves in their shoes before we design anything.',
        },
        {
          name: 'Excellence',
          line: 'Every pixel counts.',
          text: 'Our team cares about quality in design and development alike: pixel-perfect craft, then clean files and a hand-off with no guesswork.',
        },
      ],
    },
    location: {
      label: 'Location',
      heading: 'Remote first. Synced with US hours.',
      text: 'A remote-first team of UX and UI designers, researchers and developers working from {locality}, {country}. We sit on Latin America time (GMT-3), so your working day and ours overlap.',
      caption: 'GMT-3, local time now',
    },
    clients: { label: 'Clients', heading: 'Companies we have worked with.' },
    quotes: { label: 'Client words', heading: 'What it is like to work with us.' },
    cta: {
      heading: 'Should we start working?',
      sub: 'Tell us what you are building. We will tell you how we would approach it, on a 15 minute call.',
    },
  },
  es: {
    meta: {
      title: 'Nosotros: estudio de diseño liderado por su fundador',
      description:
        'delbueno™ Studio es un estudio de diseño y desarrollo de producto liderado por su fundador, con sede en Punta del Este, Uruguay, y horario de EE. UU.',
      schemaName: 'Sobre {brand}',
    },
    hero: {
      eyebrow: 'Nosotros / Estudio liderado por su fundador',
      title: 'Más que un servicio.',
      accent: 'Estamos contigo en esto.',
      ledeTemplate:
        '{brand} es un estudio de diseño y desarrollo de producto liderado por {founder}. Trabajamos en remoto desde {locality}, {country}, en sintonía con el horario de EE. UU., para equipos B2B SaaS y startups con ambición.',
    },
    numbersHeading: 'El estudio en cifras',
    founder: { label: 'Fundador', heading: 'Liderado por {name}.' },
    how: {
      label: 'Cómo trabajamos',
      heading: 'Arrancamos hoy. Conceptos en 48 horas.',
      steps: [
        {
          when: 'Hoy',
          title: 'Arranque estratégico',
          text: 'Una llamada enfocada para alinear objetivos y alcance. Empezamos en cuanto colgamos.',
        },
        {
          when: 'En 24 h',
          title: 'Tu portal en Notion',
          text: 'Un espacio de trabajo dedicado con tu backlog, para que siempre veas qué se está moviendo.',
        },
        {
          when: 'En 48 h',
          title: 'Primeros conceptos',
          text: 'Conceptos en alta fidelidad sobre los que puedes opinar, en lugar de semanas de espera por una gran revelación.',
        },
        {
          when: 'Todo el proyecto',
          title: 'Un canal compartido de Slack',
          text: 'Línea directa con las personas que hacen el trabajo. Sin cadenas de correos.',
        },
      ],
    },
    values: {
      label: 'Valores',
      heading: 'Cuatro cosas que no negociamos.',
      items: [
        {
          name: 'Transparencia',
          line: 'Cada paso, claro.',
          text: 'Registramos el tiempo que dedicamos a tu proyecto y te cobramos solo las horas que le dedicamos. Sin cargos ocultos ni cobros de último minuto.',
        },
        {
          name: 'Comunicación',
          line: 'Tu proyecto, tu voz.',
          text: 'Cada cliente tiene un líder de proyecto dedicado y un canal compartido de Slack, para que hables con las personas que hacen el trabajo.',
        },
        {
          name: 'Empatía',
          line: 'El centro de todo lo que hacemos.',
          text: 'Escuchamos para entender las necesidades y las perspectivas de nuestros clientes y de sus usuarios, y nos ponemos en su lugar antes de diseñar cualquier cosa.',
        },
        {
          name: 'Excelencia',
          line: 'Cada píxel cuenta.',
          text: 'Nuestro equipo cuida la calidad tanto en el diseño como en el desarrollo: un oficio pixel-perfect, y luego archivos limpios y un handoff sin adivinanzas.',
        },
      ],
    },
    location: {
      label: 'Ubicación',
      heading: 'Remoto primero. En horario de EE. UU.',
      text: 'Un equipo remoto de diseñadores UX y UI, investigadores y desarrolladores que trabaja desde {locality}, {country}. Estamos en horario de Latinoamérica (GMT-3), así que tu jornada y la nuestra se superponen.',
      caption: 'GMT-3, hora local ahora',
    },
    clients: { label: 'Clientes', heading: 'Empresas con las que hemos trabajado.' },
    quotes: { label: 'Lo que dicen los clientes', heading: 'Cómo es trabajar con nosotros.' },
    cta: {
      heading: '¿Empezamos a trabajar?',
      sub: 'Cuéntanos qué estás construyendo. Te diremos cómo lo abordaríamos, en una llamada de 15 minutos.',
    },
  },
};
