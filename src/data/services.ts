import type { FaqItem } from './types';

export interface Service {
  slug: 'product-strategy' | 'product-design' | 'web-design' | 'build';
  name: string;
  /** Copy for the stacking panels on the homepage. */
  home: { title: string; kicker: string; description: string; chips: string[] };
  /** One line used in lists, llms.txt and meta descriptions. */
  summary: string;
  headline: string;
  /** Answer-first paragraph, 40 to 60 words. */
  answer: string;
  covers: string[];
  deliverables: string[];
  faqs: FaqItem[];
}

export const services: Service[] = [
  {
    slug: 'product-strategy',
    home: {
      title: 'Product Strategy',
      kicker: 'Decide first',
      description:
        'Research, product audits, usability testing and roadmaps. Decide what to build before you build it.',
      chips: ['Research', 'Product audits', 'Usability testing', 'Roadmaps'],
    },
    name: 'Product Strategy',
    summary: 'Product management, UX audits and usability testing that tell you what to build next.',
    headline: 'Decide what to build before you build it.',
    answer:
      'delbueno™ Studio runs product strategy for B2B SaaS teams: discovery, product management support, UX audits and usability testing. We find where users get stuck, rank the fixes by impact and hand you a roadmap your engineers can start on the same week.',
    covers: ['Product management support', 'Product and UX audits', 'Usability testing', 'Discovery and roadmapping'],
    deliverables: [
      'Audit report with ranked findings',
      'Usability test recordings and synthesis',
      'Prioritized product roadmap',
      'Design brief ready for the next sprint',
    ],
    faqs: [
      {
        q: 'What does a product audit include?',
        a: 'A review of the key user flows, a heuristic evaluation, a list of findings ranked by impact and effort, and a short walkthrough call to agree on next steps.',
      },
      {
        q: 'Can you test with our real users?',
        a: 'Yes. We recruit from your customer base when possible and run moderated sessions, then deliver a synthesis with clips and recommendations.',
      },
    ],
  },
  {
    slug: 'product-design',
    home: {
      title: 'Product Design',
      kicker: 'Design that ships',
      description:
        'UX/UI for web and mobile, and design systems that cut dev rework by ~30%.',
      chips: ['UX/UI for web', 'Mobile apps', 'Design systems'],
    },
    name: 'Product Design',
    summary: 'UX and UI design for web apps, mobile apps and design systems.',
    headline: 'Interfaces that make complex software feel obvious.',
    answer:
      'delbueno™ Studio designs web and mobile products for B2B SaaS teams, from first concepts to a production design system. We specialise in dense, data-heavy interfaces such as dashboards, permissions and alerting. Kickoff happens the same day and first concepts arrive within 48 hours.',
    covers: ['UX and UI design', 'Web app and mobile app design', 'Design systems', 'Dashboards and data visualisation'],
    deliverables: [
      'Interactive prototypes',
      'Component library and design system in Figma',
      'Developer-ready specs and assets',
      'Design QA during implementation',
    ],
    faqs: [
      {
        q: 'How fast can you start?',
        a: 'Kickoff happens the same day we agree on scope, and you see first concepts within 48 hours.',
      },
      {
        q: 'Do you work with our engineers?',
        a: 'Yes. We work in your tools, join your standups when useful and stay available during implementation to review builds.',
      },
    ],
  },
  {
    slug: 'web-design',
    home: {
      title: 'Websites & Brand',
      kicker: 'Made to convert',
      description:
        'Marketing sites, motion and launch assets built to convert.',
      chips: ['Marketing sites', 'Motion', 'Launch assets'],
    },
    name: 'Web Design',
    summary: 'Marketing websites, launch assets and motion design, built to convert.',
    headline: 'Websites that explain the product and earn the call.',
    answer:
      'delbueno™ Studio designs and builds marketing websites for B2B SaaS companies, together with the launch assets and 2D or 3D motion that support them. We write for clarity, design for speed and hand over sites your team can edit without a developer.',
    covers: ['Marketing websites', 'Landing pages', 'Marketing materials', '2D and 3D animation'],
    deliverables: [
      'Responsive website, designed and built',
      'Content structure and page copy direction',
      'Animation and launch assets',
      'Performance and accessibility checks',
    ],
    faqs: [
      {
        q: 'Which platforms do you build on?',
        a: 'We choose the stack that fits your team, including Astro, Webflow, Framer and WordPress, and explain the tradeoffs before we start.',
      },
      {
        q: 'Do you handle migrations from an existing site?',
        a: 'Yes. We map old URLs to new ones and set up redirects so you keep the search traffic you have earned.',
      },
    ],
  },
  {
    slug: 'build',
    home: {
      title: 'Build',
      kicker: 'Production-ready in weeks',
      description:
        'No/low-code MVPs, automations and internal tools, production-ready in weeks.',
      chips: ['No/low-code MVPs', 'Automations', 'Internal tools'],
    },
    name: 'Build',
    summary: 'No-code and low-code MVPs, workflow automation and internal tools.',
    headline: 'Ship a working product without waiting for a full engineering team.',
    answer:
      'delbueno™ Studio builds MVPs, workflow automations and internal tools with no-code and low-code platforms. Teams use this to validate an idea, replace a spreadsheet process or give operations a tool of their own, while engineering stays focused on the core product.',
    covers: ['No-code and low-code MVPs', 'Workflow automation', 'Internal business tools'],
    deliverables: [
      'Working MVP in production',
      'Automations connected to your existing tools',
      'Documentation and handover training',
      'A migration path if you outgrow the platform',
    ],
    faqs: [
      {
        q: 'When is no-code the right choice?',
        a: 'When speed to learning matters more than custom infrastructure: early validation, internal tools and processes with a clear owner.',
      },
      {
        q: 'What happens when we outgrow it?',
        a: 'We document the data model and flows from day one so an engineering team can rebuild on a custom stack without starting over.',
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
