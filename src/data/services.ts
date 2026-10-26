import type { Lang } from '../i18n/config';
import { processStepsEs, servicesEs } from './services.es';
import type { FaqItem } from './types';

export interface Service {
  slug: 'product-strategy' | 'product-design' | 'web-design' | 'build' | 'ai-development';
  name: string;
  /** Copy for the stacking panels on the homepage. */
  home: { title: string; kicker: string; description: string; chips: string[] };
  /** Meta description, 140 to 155 characters. */
  seoDescription: string;
  /** One line used in lists, llms.txt and meta descriptions. */
  summary: string;
  headline: string;
  /** Answer-first paragraph, 40 to 60 words. */
  answer: string;
  /** Who this service is for: a lead sentence and the situations that usually bring people to it. */
  whoFor: { lead: string; points: string[] };
  covers: string[];
  deliverables: string[];
  /** What lands at the end of the process diagram, with the typical timing. */
  timing: { title: string; text: string };
  /** Slugs of the case studies that used this service, strongest first. */
  cases: string[];
  /** Journal post slugs shown as related reading on the service page, at most three. */
  reading?: string[];
  /** Links the service page to the tech stack page. */
  stackLink?: boolean;
  faqs: FaqItem[];
}

/** The words of a service. Spanish versions are in services.es.ts, the slug and the case studies are shared. */
export type ServiceText = Omit<Service, 'slug' | 'cases' | 'reading' | 'stackLink'>;

/** The first 48 hours, shared by every service. Used by the scroll-drawn process diagram. */
export const processSteps = [
  {
    when: 'Today',
    title: 'Strategic kickoff',
    text: 'One focused call to align on goals and scope. We start the moment we hang up.',
  },
  {
    when: 'Within 24h',
    title: 'Your portal goes live',
    text: 'A dedicated Notion workspace with your backlog, plus a shared Slack channel. No email chains.',
  },
  {
    when: '48h later',
    title: 'First high-fidelity concepts',
    text: 'No waiting weeks for a big reveal.',
  },
] as const;

export const services: Service[] = [
  {
    slug: 'product-strategy',
    seoDescription:
      'Product strategy for B2B SaaS and startups: audits, usability testing, user research and PM support, ending in a prioritized roadmap and design brief.',
    home: {
      title: 'Product Strategy',
      kicker: 'Decide first',
      description:
        'Research, product audits, usability testing and roadmaps. Decide what to build before you build it.',
      chips: ['Research', 'Product audits', 'Usability testing', 'Roadmaps'],
    },
    name: 'Product Strategy',
    summary: 'Product audits, usability testing, research and roadmaps that tell you what to build next.',
    headline: 'Decide what to build before you build it.',
    answer:
      'delbueno™ Studio runs product strategy for B2B SaaS teams and startups: product audits, usability testing, user research and product management support. We find where users get stuck, rank the fixes by impact and hand you a prioritized roadmap and a design brief your team can start on the same week.',
    whoFor: {
      lead: 'Founders and product teams who need to decide what to build, or why a shipped product is not converting, before they spend more on design or engineering.',
      points: [
        'New users drop off after sign-up and you cannot see where',
        'Your roadmap is a long list with no clear order',
        'Support tickets keep asking how to do basic tasks',
        'You want evidence from real users before committing to a redesign',
      ],
    },
    covers: [
      'Product and UX audits',
      'Usability testing',
      'User research and personas',
      'Product management and roadmapping',
    ],
    deliverables: [
      'Audit report with findings ranked from low to critical severity',
      'UX friction analysis and UI review of hierarchy, typography and contrast',
      'Usability test script, session recordings and a video highlight reel',
      'Priority fix roadmap as a PDF',
      'Product roadmap prioritized with RICE or value versus effort',
      'Design brief ready for the next sprint',
    ],
    timing: {
      title: 'Findings you can act on',
      text: 'A product audit takes 5 to 7 business days and ends with a live presentation. Usability testing takes 7 to 10 days.',
    },
    cases: ['cloudguardia', 'buzz-bunny', 'flapz'],
    reading: ['ux-research-for-b2b-saas', 'how-to-choose-ux-design-agency-saas', 'best-ux-design-agencies-b2b-saas'],
    faqs: [
      {
        q: 'What does a product audit include?',
        a: 'A manual review of your key flows through the eyes of a first-time user and a power user, a UI review of hierarchy, typography and contrast, and a report ranked from low to critical severity. It takes 5 to 7 business days and ends with a live presentation. To start, we need access to the product and, if you have them, your analytics and heatmap tools.',
      },
      {
        q: 'How long does usability testing take?',
        a: 'Usually 7 to 10 days. We write the test script, recruit from a research panel or from your own customers, run moderated or unmoderated sessions and deliver a PDF report with a video highlight reel and a priority fix roadmap.',
      },
      {
        q: 'Do you only advise, or do you also implement the fixes?',
        a: 'Both are possible. An audit can end with a roadmap you hand to your own team, or continue into a Design Sprint where we implement the findings.',
      },
      {
        q: 'Can you work with our product tools?',
        a: 'Yes. We plan in Miro and Notion and work inside the tracker your engineers already use, such as Jira, Linear or Trello. We prioritize with RICE or value versus effort, and you keep control of the roadmap.',
      },
    ],
  },
  {
    slug: 'product-design',
    seoDescription:
      'Product design for B2B SaaS: web and mobile, from first concepts to a production design system, for dense dashboards, permissions and alerts.',
    home: {
      title: 'Product Design',
      kicker: 'Design that ships',
      description: 'UX/UI for web and mobile, and design systems that cut dev rework by ~30%.',
      chips: ['UX/UI for web', 'Mobile apps', 'Design systems'],
    },
    name: 'Product Design',
    summary: 'UX and UI design for web apps, mobile apps and design systems.',
    headline: 'Interfaces that make complex software feel obvious.',
    answer:
      'delbueno™ Studio designs web and mobile products for B2B SaaS teams, from first concepts to a production design system. We specialize in dense, data-heavy interfaces such as dashboards, permissions and alerting. Kickoff happens the same day and first high-fidelity concepts arrive within 48 hours.',
    whoFor: {
      lead: 'SaaS teams shipping a new product, a new module or a redesign, and teams whose interface has outgrown the first version built by engineers.',
      points: [
        'You are building an MVP, a mobile app or a new module',
        'The interface looks like it was built by engineers',
        'Key features are buried in dense navigation',
        'Developers rebuild the same components slightly differently every sprint',
      ],
    },
    covers: [
      'UX and UI design for web apps',
      'Mobile app design for iOS and Android',
      'Design systems',
      'Dashboards and data visualization',
      'Software architecture UX: roles, permissions and multi-tenant views',
    ],
    deliverables: [
      'Interactive high-fidelity prototypes',
      'Component library and design system in Figma',
      'Design tokens that map to CSS variables, Tailwind or React components',
      'Developer handoff package and a sync meeting',
      'Design QA while your team builds',
    ],
    timing: {
      title: 'Handoff-ready design',
      text: 'A high-fidelity feature typically takes 1 to 2 weeks, and we stay on during implementation to review builds.',
    },
    cases: ['cloudguardia', 'uleadz', '1to1000'],
    reading: ['ux-design-for-startups', 'saas-onboarding-ux-patterns', 'complex-ux-design'],
    faqs: [
      {
        q: 'How fast can you start?',
        a: 'Kickoff happens the same day we agree on scope, and you see first high-fidelity concepts within 48 hours. After that, a feature typically takes 1 to 2 weeks to reach high fidelity.',
      },
      {
        q: 'How do you hand off to our developers?',
        a: 'With a developer handoff package and a sync meeting. We stay available during implementation to review builds, and design tokens map directly to CSS variables, Tailwind or React components.',
      },
      {
        q: 'Can you build on our existing brand or design system?',
        a: 'Yes. We audit what you have first, then extend it instead of replacing it.',
      },
      {
        q: 'Do you test designs with real users?',
        a: 'Yes. We test prototypes with users drawn from your customers or a research panel, and fold the findings back into the design before handoff.',
      },
    ],
  },
  {
    slug: 'web-design',
    seoDescription:
      'Marketing websites for B2B SaaS with launch assets and 2D or 3D animation, built in Webflow, Framer, WordPress or custom code and editable by your team.',
    home: {
      title: 'Websites & Brand',
      kicker: 'Made to convert',
      description: 'Marketing sites, motion and launch assets built to convert.',
      chips: ['Marketing sites', 'Motion', 'Launch assets'],
    },
    name: 'Web Design',
    summary: 'Marketing websites, launch assets and motion design, built to convert.',
    headline: 'Websites that explain the product and earn the call.',
    answer:
      'delbueno™ Studio designs and builds marketing websites for B2B SaaS companies, together with the launch assets and 2D or 3D animation that support them. We write for clarity, design for speed and hand over sites your team can edit without a developer, built in Webflow, Framer, WordPress or custom code.',
    whoFor: {
      lead: 'B2B SaaS companies and startups whose website no longer explains the product, loads slowly or looks older than the product behind it.',
      points: [
        'You are launching and need a landing page and launch assets',
        'Your site is a few years old and does not convert',
        'Marketing needs to edit pages without waiting for engineers',
        'You want explainer motion or 3D product renders',
      ],
    },
    covers: [
      'Marketing websites',
      'Landing pages',
      'Marketing materials: ad creative, pitch decks and social kits',
      '2D and 3D animation',
      'Migrations that keep your search traffic',
    ],
    deliverables: [
      'Responsive website, designed in Figma and built in Webflow, Framer, WordPress or code',
      'Page structure and copy direction focused on conversion',
      'Ad creative, pitch decks and social brand kits',
      '2D explainers or 3D product renders',
      'URL map and redirects when we replace an existing site',
      'Performance and accessibility checks before launch',
    ],
    timing: {
      title: 'A site your team can run',
      text: 'Concepts in 48 hours, then built in the platform that fits your team. Animation projects take 2 to 6 weeks.',
    },
    cases: ['flapz', 'uleadz', 'vzari', 'toyota'],
    reading: ['web-design-for-startups', 'website-redesign', 'significance-of-page-speed-and-performance'],
    faqs: [
      {
        q: 'Which platforms do you build on?',
        a: 'We choose the stack that fits your team: Webflow, Framer or WordPress, with designs prepared in Figma and custom HTML, CSS and JavaScript where needed. We explain the tradeoffs before we start.',
      },
      {
        q: 'Can we migrate without losing search traffic?',
        a: 'Yes. We map every old URL to its new one and set up redirects, so the traffic you have earned carries over to the new site.',
      },
      {
        q: 'Can we edit the site ourselves after launch?',
        a: 'Yes. We hand off a site your team can iterate on without engineers: launch in weeks, tweak in hours.',
      },
      {
        q: 'How long does an animation project take?',
        a: 'Usually 2 to 6 weeks. We write the concept and script, storyboard, design the illustration or 3D models, animate and deliver formats for web, ads, presentations and social.',
      },
    ],
  },
  {
    slug: 'build',
    seoDescription:
      'No-code and low-code MVPs, workflow automations and internal tools, plus Flutter, React or Next.js apps when needed. Simple MVPs ship in 1 to 4 weeks.',
    home: {
      title: 'Build',
      kicker: 'Production-ready in weeks',
      description: 'No/low-code MVPs, automations and internal tools, production-ready in weeks.',
      chips: ['No/low-code MVPs', 'Automations', 'Internal tools'],
    },
    name: 'Build',
    summary: 'No-code and low-code MVPs, workflow automation, internal tools and app development.',
    headline: 'Ship a working product without waiting for a full engineering team.',
    answer:
      'delbueno™ Studio builds MVPs, workflow automations and internal tools with no-code and low-code platforms, and apps in Flutter, React or Next.js when a product needs them. Teams use it to validate an idea, replace a spreadsheet process or give operations a tool of their own. Simple MVPs ship in 1 to 4 weeks.',
    whoFor: {
      lead: 'Founders who need a working product before they can justify a full engineering team, and operations teams stuck on spreadsheets and manual handoffs.',
      points: [
        'You want to test an idea with real users in weeks, not quarters',
        'A process runs on spreadsheets, copy and paste and email',
        'Your engineers should stay on the core product',
        'You need a CRM, dashboard, inventory tracker or admin panel of your own',
      ],
    },
    covers: [
      'No-code and low-code MVPs',
      'Workflow automation',
      'Internal business tools',
      'App development in Flutter, React and Next.js',
    ],
    deliverables: [
      'A working MVP in production',
      'Automations connected to tools such as Slack, Salesforce, Notion and Airtable',
      'Error handling and monitoring for every automation',
      'Documentation and handover training',
      'A migration path if you outgrow the platform',
    ],
    timing: {
      title: 'Live, not a prototype',
      text: 'Simple MVPs ship in 1 to 4 weeks, with a working version to review along the way.',
    },
    cases: ['buzz-bunny', 'shay', 'vzari'],
    reading: ['how-to-build-an-ai-mvp', 'ux-design-for-startups', 'design-systems-for-startups'],
    faqs: [
      {
        q: 'When is no-code the right choice?',
        a: 'When speed to learning matters more than custom infrastructure: early validation, internal tools and processes with a clear owner.',
      },
      {
        q: 'Which tools do you build with?',
        a: 'For no-code and low-code we use Webflow, Airtable, Zapier, Bubble, Firebase, Lovable and Figma. For automation we use n8n, Zapier and Make, plus custom scripts and APIs where they are needed.',
      },
      {
        q: 'What happens when we outgrow the platform?',
        a: 'We document the data model and flows from day one, so an engineering team can rebuild on a custom stack without starting over.',
      },
      {
        q: 'Who owns what you build?',
        a: 'You do. Custom work is delivered as work-for-hire, with the intellectual property transferred to you on final payment.',
      },
    ],
  },
  {
    slug: 'ai-development',
    seoDescription:
      'Custom AI development for startups and B2B SaaS: AI features, agents, AI-accelerated MVPs and AI-native products, designed and built by one team.',
    home: {
      title: 'AI Development',
      kicker: 'AI that ships',
      description:
        'Custom AI for startups and SaaS: features, agents and AI-native products, designed and built by one team.',
      chips: ['AI features', 'AI agents', 'AI-accelerated MVPs', 'AI-native products'],
    },
    name: 'AI Development',
    summary:
      'AI features, agents and automations, AI-accelerated MVPs and AI-native products, designed and built by one team.',
    headline: 'Custom AI, designed and built by one team.',
    answer:
      'delbueno™ Studio builds custom AI for startups and B2B SaaS: AI features inside your product, agents and workflow automations, MVPs built faster with AI tooling, and AI-native products from scratch. One team designs the experience and writes the code, so the interface, the model and your data fit together. Kickoff happens the same day.',
    whoFor: {
      lead: 'Founders and product teams who want AI inside their product or their operations, and want one team to design it so people trust it and build it so it works.',
      points: [
        'You want a copilot, smart search or summaries inside your SaaS product',
        'A manual workflow should run on an agent, with a person approving the risky steps',
        'You need a first version fast and want it built with AI tooling',
        'You have your own data and want an assistant that answers from it',
      ],
    },
    covers: [
      'AI features inside SaaS products: copilots, smart search, summaries and assistants',
      'AI agents and workflow automations',
      'AI-accelerated MVPs, designed and built with tools such as Claude Code and Cursor',
      'AI-native products from scratch: LLM apps and retrieval over your own data',
      'AI interaction design: human-in-the-loop controls and explainable results',
    ],
    deliverables: [
      'Interactive high-fidelity prototypes of the AI experience, including loading, error and low-confidence states',
      'A working build in production, connected to your data and tools',
      'Review and approval steps for every action an agent takes on its own',
      'Testing against real examples from your own data before launch',
      'Documentation and handover training',
    ],
    timing: {
      title: 'Designed and built together',
      text: 'Kickoff the same day and first concepts in 48 hours. After that we build in short cycles, with a working version for you to review along the way.',
    },
    cases: [],
    reading: ['how-to-build-an-ai-mvp', 'ai-agent-ux-human-in-the-loop', 'explainable-ai-ux'],
    stackLink: true,
    faqs: [
      {
        q: 'What does custom AI development include?',
        a: 'Four kinds of work: AI features inside your SaaS product (copilots, smart search, summaries and assistants), AI agents and workflow automations, AI-accelerated MVPs, and AI-native products built from scratch, including LLM apps and retrieval over your own data. The same team designs and builds each of them.',
      },
      {
        q: 'What is an AI-accelerated MVP?',
        a: 'An MVP that we design and build with AI tooling such as Claude Code and Cursor, so the first version ships faster. People on our team still design, review and own every decision, and you get the same handover as with any other build.',
      },
      {
        q: 'Do you design the AI experience as well as build it?',
        a: 'Yes, that is the point of one team. We design how people ask, review, correct and trust the AI, then we build it. Our articles on human-in-the-loop agent UX and explainable AI UX show how we approach it.',
      },
      {
        q: 'Can the AI work with our own data and tools?',
        a: 'Yes. We build retrieval over your own data and connect agents to the tools your team already uses. Before we write code we agree on what the AI may read and what it may do on its own.',
      },
      {
        q: 'Who owns what you build?',
        a: 'You do. Custom work is delivered as work-for-hire, with the intellectual property transferred to you on final payment. We sign an NDA on request.',
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** The services with their words in a language. English is the source and Spanish overlays it. */
export function getServices(lang: Lang): Service[] {
  return lang === 'en' ? services : services.map((s) => ({ ...s, ...servicesEs[s.slug] }));
}

/** The 48 hour process in a language. */
export function getProcessSteps(lang: Lang): readonly { when: string; title: string; text: string }[] {
  return lang === 'en' ? processSteps : processStepsEs;
}
