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
  /** Situations where this model is the right call. */
  idealFor: string[];
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
    idealFor: [
      'An MVP with a clearly defined feature set',
      'A module or flow redesign',
      'A budget and a date you need to guarantee',
    ],
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
    idealFor: [
      'A fluid roadmap where new tickets appear every week',
      'Teams that would rather drop work into a queue than renegotiate a fixed scope',
      'Products that shipped an MVP and now iterate',
    ],
  },
  {
    slug: 'designer-on-demand',
    name: 'Designer on Demand',
    summary: 'A dedicated delbueno designer embedded in your Slack and Figma, part-time or full-time. Pause anytime.',
    chips: ['In your Slack and Figma', 'Part-time or full-time', 'Pause anytime'],
    bestFor: 'Teams that want a dedicated designer working inside their own tools.',
    description:
      'A dedicated delbueno designer joins your Slack and Figma, part-time or full-time. You can pause anytime.',
    includes: ['Dedicated delbueno designer', 'In your Slack and Figma', 'Part-time or full-time', 'Pause anytime'],
    idealFor: [
      'A designer who joins your Slack, standups, Jira sprints and Figma',
      'Capacity without a long hiring cycle: kickoff in 48 hours',
      'A steady stream of dashboard cards, micro-interactions, design system updates and decks',
    ],
  },
];

/** Rows of the comparison table. Values are in the same order as `engagements`. No prices. */
export const compareRows: { label: string; values: [string, string, string] }[] = [
  {
    label: 'Best for',
    values: [
      'MVPs, redesigns and new modules',
      'Roadmaps that move every week',
      'Teams that want a designer inside their own tools',
    ],
  },
  {
    label: 'Scope',
    values: ['Fixed at kickoff', 'An open backlog you reorder anytime', 'Whatever your team needs next'],
  },
  {
    label: 'Time',
    values: ['2 to 4 weeks', 'Each request in 24 to 48h', 'Part-time or full-time'],
  },
  {
    label: 'Billing',
    values: ['Flat fee', 'Monthly subscription', 'Flat monthly fee'],
  },
  {
    label: 'Who you work with',
    values: ['The delbueno team', 'The delbueno team', 'One dedicated delbueno designer'],
  },
  {
    label: 'Where the work happens',
    values: ['A shared Notion workspace and Slack channel', 'A shared Trello-style board', 'Your Slack and your Figma'],
  },
  {
    label: 'Flexibility',
    values: [
      'Guaranteed budget, timeline and deliverables',
      'Roll in from a Sprint, with overlapping scope credited',
      'Pause anytime',
    ],
  },
];

/** The "how unlimited requests, one at a time works" explainer. */
export const requestFlow = {
  intro:
    'You keep a Trello-style backlog on a shared board. A request is any task that can be completed in about 4 focused design hours: a set of dashboard cards, a modal flow, a motion spec or three social banners.',
  steps: [
    {
      title: 'Add to the backlog',
      text: 'Drop requests on the shared board whenever they come up and reorder them as priorities change.',
    },
    { title: 'We pull the top ticket', text: 'One request at a time, so every ticket gets full attention.' },
    { title: 'Delivered in 24 to 48h', text: 'You get the result within one to two days, not at the end of a month.' },
    { title: 'Feedback, then the next', text: 'You review, we iterate if needed, then we move to the next ticket.' },
  ],
  outro:
    'Larger epics are broken into bite-size tickets, so you see results every two days instead of waiting weeks for a big drop.',
};

/** "Start with a Sprint, roll into Design Partner". */
export const path = {
  heading: 'Start with a Sprint, roll into Design Partner.',
  text: 'Many clients ship an MVP in a Launch Sprint, then roll straight into Design Partner for continuous iteration. The switch works the other way too, and we credit any overlap in scope so you never pay twice for the same work.',
  steps: [
    { name: 'Launch Sprint', note: 'Ship the MVP in 2 to 4 weeks' },
    { name: 'Design Partner', note: 'Iterate every week, 24 to 48h per request' },
  ],
};

export const engagementFaqs: FaqItem[] = [
  {
    q: 'How do I choose between the three models?',
    a: 'Choose a Launch Sprint when you have a clearly defined feature set, such as an MVP or a module redesign, and want a guaranteed budget, timeline and deliverables. Choose Design Partner when your roadmap is fluid and new tickets appear every week. Choose Designer on Demand when you want a dedicated designer working inside your own Slack and Figma. A 15 minute call is enough to pick.',
  },
  {
    q: 'How does “unlimited requests, one at a time” actually work?',
    a: 'You maintain a Trello-style backlog on our shared board. A request is any task that can be completed in about 4 focused design hours, such as a set of dashboard cards, a modal flow, a motion spec or three social banners. We pull the top ticket, deliver within 24 to 48 hours, get your feedback, iterate if needed, then move to the next. Larger epics are broken into bite-size tickets so you see results every two days.',
  },
  {
    q: 'Can we switch from a Launch Sprint to Design Partner later?',
    a: 'Yes. Many clients start with a Launch Sprint to ship an MVP, then roll straight into Design Partner for continuous iteration. We credit any overlap in scope, so you never pay twice for the same work.',
  },
  {
    q: 'How quickly can we start?',
    a: 'Kickoff happens the same day we agree on scope, and you see first concepts within 48 hours.',
  },
  {
    q: 'How is it billed?',
    a: 'A Launch Sprint is a flat fee agreed after scoping. Design Partner is a monthly subscription and Designer on Demand is a flat monthly fee. Book a 15 minute call and we will walk you through the details for your project.',
  },
  {
    q: 'Which time zones do you cover?',
    a: 'We are based in Punta del Este, Uruguay, and work remote with US hours, so meetings land in your working day.',
  },
];
