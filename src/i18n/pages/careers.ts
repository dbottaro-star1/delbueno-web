import type { Localized } from '../config';

export interface CareersCopy {
  meta: { title: string; description: string };
  eyebrow: string;
  title: string;
  accent: string;
  lede: string;
  cta: string;
  to: string;
  mail: { subject: string; lines: string[] };
  cultureLabel: string;
  cultureHeading: string;
  culture: { t: string; d: string }[];
  sendLabel: string;
  sendHeading: string;
  send: string[];
}

export const careersCopy: Localized<CareersCopy> = {
  en: {
    meta: {
      title: 'Careers: Send Us Your Portfolio',
      description:
        'delbueno™ Studio is not hiring right now, but we read every portfolio. Send a link to your work to hello@delbuenostudio.com and tell us what you want to build.',
    },
    eyebrow: 'Careers / No open roles',
    title: 'We are not hiring right now,',
    accent: 'but we read every portfolio.',
    lede: 'We are a small remote team and no roles are open at the moment. If you design or build software for B2B products, send us a link to your work anyway.',
    cta: 'Send your portfolio',
    to: 'to',
    mail: {
      subject: 'Portfolio',
      lines: [
        'Hi delbueno team,',
        '',
        'Link to my work:',
        '',
        'What I do (design, front end, product, other):',
        '',
        'Where I am based:',
        '',
      ],
    },
    cultureLabel: 'How it is to work here',
    cultureHeading: 'Small team, fast rhythm, direct line.',
    culture: [
      {
        t: 'Remote first, on GMT-3',
        d: 'We work from Latin America and overlap with US hours, so the people we work with are awake when we are.',
      },
      {
        t: 'Short loops',
        d: 'Kickoff today, first concepts in 48 hours. We like small steps, fast feedback and shipping before we over-polish.',
      },
      {
        t: 'Close to the client',
        d: 'Every client gets a dedicated project leader and a shared Slack channel. You talk to the people doing the work, and so do we.',
      },
      {
        t: 'Craft and growth',
        d: 'Pixel-perfect work, a Playground where we explore ideas outside client briefs, and mentorship that helps people get better at the job.',
      },
    ],
    sendLabel: 'What to send',
    sendHeading: 'Show us the work.',
    send: [
      'A link to your portfolio, site or repository.',
      'One line on what you do and what you want to do next.',
      'Where you are based, so we can check the time zone overlap.',
    ],
  },
  es: {
    meta: {
      title: 'Trabaja con nosotros: envíanos tu portafolio',
      description:
        'delbueno™ Studio no está contratando ahora, pero leemos cada portafolio. Envía un enlace a tu trabajo a hello@delbuenostudio.com y cuéntanos qué buscas.',
    },
    eyebrow: 'Trabaja con nosotros / Sin vacantes abiertas',
    title: 'Ahora no estamos contratando,',
    accent: 'pero leemos cada portafolio.',
    lede: 'Somos un equipo remoto pequeño y por ahora no hay vacantes abiertas. Si diseñas o construyes software para productos B2B, envíanos igual un enlace a tu trabajo.',
    cta: 'Envía tu portafolio',
    to: 'a',
    mail: {
      subject: 'Portafolio',
      lines: [
        'Hola, equipo de delbueno:',
        '',
        'Enlace a mi trabajo:',
        '',
        'A qué me dedico (diseño, front end, producto, otro):',
        '',
        'Dónde vivo:',
        '',
      ],
    },
    cultureLabel: 'Cómo es trabajar aquí',
    cultureHeading: 'Equipo pequeño, ritmo rápido, línea directa.',
    culture: [
      {
        t: 'Remoto primero, en GMT-3',
        d: 'Trabajamos desde Latinoamérica y coincidimos con el horario de EE. UU., así que las personas con las que trabajamos están despiertas cuando nosotros.',
      },
      {
        t: 'Ciclos cortos',
        d: 'Arrancamos hoy y entregamos los primeros conceptos en 48 horas. Nos gustan los pasos pequeños, el feedback rápido y lanzar antes de pulir de más.',
      },
      {
        t: 'Cerca del cliente',
        d: 'Cada cliente tiene un líder de proyecto dedicado y un canal compartido de Slack. Tú hablas con las personas que hacen el trabajo, y nosotros también.',
      },
      {
        t: 'Oficio y crecimiento',
        d: 'Trabajo pixel-perfect, un Playground donde exploramos ideas fuera de los briefs de clientes y una mentoría que ayuda a mejorar en el oficio.',
      },
    ],
    sendLabel: 'Qué enviar',
    sendHeading: 'Muéstranos tu trabajo.',
    send: [
      'Un enlace a tu portafolio, sitio o repositorio.',
      'Una línea sobre a qué te dedicas y qué quieres hacer después.',
      'Dónde vives, para revisar cuánto coincidimos de huso horario.',
    ],
  },
};
