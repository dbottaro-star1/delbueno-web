import type { FaqItem } from './types';

export interface Engagement {
  slug: string;
  name: string;
  summary: string;
  /** Short tags for the front of the homepage flip cards. */
  chips: string[];
  bestFor: string;
  description: string;
  includes: string[];
}

export const engagements: Engagement[] = [
  {
    slug: 'launch-sprint',
    name: 'Launch Sprint',
    summary:
      'Fixed scope, flat fee, 2 to 4 weeks. For MVPs, redesigns and new modules with a guaranteed budget and timeline.',
    chips: ['Fixed scope', 'Flat fee', '2 to 4 weeks'],
    bestFor: 'MVPs, redesigns and new modules that need a guaranteed budget and timeline.',
    description:
      'The scope is fixed at kickoff and priced as a flat fee, so you know what ships, what it costs and when it lands. Projects run 2 to 4 weeks.',
    includes: ['Fixed scope', 'Flat fee', '2 to 4 weeks', 'Guaranteed budget and timeline'],
  },
  {
    slug: 'design-partner',
    name: 'Design Partner',
    summary:
      'A monthly subscription. Unlimited requests, one at a time, each delivered in 24 to 48h. For roadmaps that move every week.',
    chips: ['Monthly', 'Unlimited requests', '24 to 48h each'],
    bestFor: 'Roadmaps that move every week.',
    description:
      'Send requests whenever they come up. We take them one at a time and deliver each one in 24 to 48 hours, for a flat monthly subscription.',
    includes: ['Monthly subscription', 'Unlimited requests', 'One request at a time', 'Each delivered in 24 to 48h'],
  },
  {
    slug: 'designer-on-demand',
    name: 'Designer on Demand',
    summary:
      'A dedicated delbueno designer embedded in your Slack and Figma, part-time or full-time. Pause anytime.',
    chips: ['In your Slack and Figma', 'Part-time or full-time', 'Pause anytime'],
    bestFor: 'Teams that want a dedicated designer working inside their own tools.',
    description:
      'A dedicated delbueno designer joins your Slack and Figma, part-time or full-time. You can pause anytime.',
    includes: ['Dedicated delbueno designer', 'In your Slack and Figma', 'Part-time or full-time', 'Pause anytime'],
  },
];

export const engagementFaqs: FaqItem[] = [
  {
    q: 'How do I choose between the three models?',
    a: 'Choose a Launch Sprint for a defined outcome, a Design Partner for continuous product work, and Designer on Demand for flexible extra capacity. A 15 minute call is enough to pick the right one.',
  },
  {
    q: 'How quickly can we start?',
    a: 'Kickoff happens the same day we agree on scope, and you see first concepts within 48 hours.',
  },
  {
    q: 'Which time zones do you cover?',
    a: 'We are based in Punta del Este, Uruguay, and work remote with US hours, so meetings land in your working day.',
  },
];
