import type { Localized } from '../config';

export interface EngagementsPageCopy {
  meta: { title: string; description: string };
  answer: string;
  listName: string;
  label: string;
  heading: string;
  modelsLabel: string;
  modelsHeading: string;
  idealWhen: string;
  includes: string;
  compareLabel: string;
  compareHeading: string;
  compareSub: string;
  pathLabel: string;
  flowLabel: string;
  flowHeading: string;
  ctaHeading: string;
  compare: {
    caption: string;
    recommended: string;
    startHere: string;
    thenRollIn: string;
  };
  path: { step: string };
}

export const engagementsPageCopy: Localized<EngagementsPageCopy> = {
  en: {
    meta: {
      title: 'Launch Sprint, Design Partner, Designer on Demand',
      description:
        'Three ways to work with delbueno™ Studio: a fixed-scope Launch Sprint, a Design Partner subscription with unlimited requests, or a Designer on Demand.',
    },
    answer:
      'delbueno™ Studio works in three engagement models: a Launch Sprint with fixed scope, a flat fee and 2 to 4 weeks of delivery; a Design Partner subscription with unlimited requests, one at a time, each delivered in 24 to 48 hours; and a Designer on Demand embedded in your Slack and Figma, part-time or full-time.',
    listName: 'delbueno™ Studio engagement models',
    label: 'Engagements',
    heading: 'Three ways to work together.',
    modelsLabel: 'The models',
    modelsHeading: 'Pick the one that fits your stage.',
    idealWhen: 'Ideal when',
    includes: 'Includes',
    compareLabel: 'Side by side',
    compareHeading: 'Compare the three.',
    compareSub: 'Every model starts the same way: kickoff the same day, first concepts within 48 hours.',
    pathLabel: 'The path most clients take',
    flowLabel: 'Design Partner',
    flowHeading: 'How unlimited requests, one at a time, works.',
    ctaHeading: 'Which model fits? Let’s talk for 15 minutes.',
    compare: {
      caption: 'Launch Sprint, Design Partner and Designer on Demand compared',
      recommended: 'Recommended path: {step}',
      startHere: 'Start here',
      thenRollIn: 'Then roll in',
    },
    path: { step: 'Step {n}' },
  },
  es: {
    meta: {
      title: 'Launch Sprint, Design Partner y Designer on Demand',
      description:
        'Tres formas de trabajar con delbueno™ Studio: Launch Sprint de alcance fijo, suscripción Design Partner con solicitudes ilimitadas o Designer on Demand.',
    },
    answer:
      'delbueno™ Studio trabaja con tres modelos: un Launch Sprint con alcance fijo, tarifa fija y de 2 a 4 semanas de entrega; una suscripción Design Partner con solicitudes ilimitadas, de una en una, cada una entregada en 24 a 48 horas; y un Designer on Demand integrado en tu Slack y tu Figma, a medio tiempo o a tiempo completo.',
    listName: 'Modelos de trabajo de delbueno™ Studio',
    label: 'Modelos de trabajo',
    heading: 'Tres formas de trabajar juntos.',
    modelsLabel: 'Los modelos',
    modelsHeading: 'Elige el que encaja con tu etapa.',
    idealWhen: 'Ideal cuando',
    includes: 'Incluye',
    compareLabel: 'Lado a lado',
    compareHeading: 'Compara los tres.',
    compareSub: 'Todos los modelos empiezan igual: arranque el mismo día y primeros conceptos en 48 horas.',
    pathLabel: 'El camino más habitual',
    flowLabel: 'Design Partner',
    flowHeading: 'Cómo funcionan las solicitudes ilimitadas, de una en una.',
    ctaHeading: '¿Qué modelo te conviene? Hablemos 15 minutos.',
    compare: {
      caption: 'Comparación de Launch Sprint, Design Partner y Designer on Demand',
      recommended: 'Camino recomendado: {step}',
      startHere: 'Empieza aquí',
      thenRollIn: 'Luego pasa a este',
    },
    path: { step: 'Paso {n}' },
  },
};
