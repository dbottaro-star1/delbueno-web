import type { FaqItem } from './types';

export interface Industry {
  slug: 'cloud' | 'cybersecurity' | 'devops' | 'ai' | 'fintech';
  name: string;
  /** Page title and H1. */
  title: string;
  summary: string;
  /** Answer-first paragraph, 40 to 60 words. */
  answer: string;
  challenges: string[];
  designs: string[];
  faqs: FaqItem[];
}

export const industries: Industry[] = [
  {
    slug: 'cloud',
    name: 'Cloud',
    title: 'UX design for cloud infrastructure products',
    summary: 'Interfaces for cloud platforms, cost tools and infrastructure consoles.',
    answer:
      'delbueno™ Studio designs cloud infrastructure products for B2B software teams: consoles, resource views, cost dashboards and onboarding flows. We make large inventories searchable, risky actions safe and complex setup understandable for both new and expert users.',
    challenges: [
      'Thousands of resources that need filtering and bulk actions',
      'Setup flows that span several accounts and permissions',
      'Cost and usage data that must be read at a glance',
    ],
    designs: ['Resource explorers', 'Cost and usage dashboards', 'Onboarding and setup wizards', 'Admin and billing consoles'],
    faqs: [
      {
        q: 'Do you design for multi-cloud products?',
        a: 'Yes. We design provider-neutral patterns for inventory, access and cost so the product reads consistently across clouds.',
      },
    ],
  },
  {
    slug: 'cybersecurity',
    name: 'Cybersecurity',
    title: 'UX design for cybersecurity products',
    summary: 'Interfaces for security operations, posture management and threat response.',
    answer:
      'delbueno™ Studio designs cybersecurity products where analysts work under pressure: alert queues, investigation views, posture dashboards and policy editors. We reduce alert fatigue, surface the next action and keep dense data readable, so teams respond faster and make fewer mistakes.',
    challenges: [
      'Alert volume that buries real threats',
      'Investigations that need context from many sources',
      'Role-based permissions that are hard to explain',
    ],
    designs: ['Alert triage queues', 'Investigation timelines', 'Posture and risk dashboards', 'Policy and permission editors'],
    faqs: [
      {
        q: 'How do you reduce alert fatigue in the interface?',
        a: 'We group related alerts, rank them by risk, show the evidence next to the decision and make the next action one click away.',
      },
    ],
  },
  {
    slug: 'devops',
    name: 'DevOps',
    title: 'UX design for DevOps tools',
    summary: 'Interfaces for pipelines, observability and developer platforms.',
    answer:
      'delbueno™ Studio designs DevOps tools for engineering teams: pipeline views, deployment dashboards, observability and developer portals. We design for people who live in the terminal, so interfaces stay fast, keyboard friendly and honest about what is happening in production.',
    challenges: [
      'Status that must be trusted instantly during incidents',
      'Pipelines and logs with enormous amounts of detail',
      'Users who prefer the command line to any interface',
    ],
    designs: ['Pipeline and deployment views', 'Incident and on-call dashboards', 'Log and trace explorers', 'Developer portals'],
    faqs: [
      {
        q: 'Do you design for developers who prefer the CLI?',
        a: 'Yes. We keep the interface keyboard friendly and consistent with the command line so the two reinforce each other.',
      },
    ],
  },
  {
    slug: 'ai',
    name: 'AI',
    title: 'UX design for AI products and agents',
    summary: 'Interfaces for AI agents, copilots and explainable machine learning.',
    answer:
      'delbueno™ Studio designs AI-native products: agent workflows, copilots and explainable model output. We focus on trust, with human-in-the-loop controls, clear confidence signals and recovery paths, so users know what the system did, why it did it and how to correct it.',
    challenges: [
      'Users who do not trust output they cannot inspect',
      'Agent actions that need review before they run',
      'Uncertainty that is hard to communicate',
    ],
    designs: ['Agent workspaces and approval flows', 'Explainability panels', 'Chat and copilot interfaces', 'Model monitoring dashboards'],
    faqs: [
      {
        q: 'How do you design human-in-the-loop experiences?',
        a: 'We define which actions need approval, show the agent plan before it runs and make every step reviewable and reversible.',
      },
    ],
  },
  {
    slug: 'fintech',
    name: 'Fintech',
    title: 'UX design for fintech products',
    summary: 'Interfaces for payments, banking, lending and financial operations.',
    answer:
      'delbueno™ Studio designs fintech products for B2B teams and their customers: payment flows, account dashboards, onboarding and compliance steps. We make regulated processes feel simple, keep money movements unambiguous and design for accessibility across every screen size.',
    challenges: [
      'Compliance steps that cause drop-off',
      'Money movements that must never be ambiguous',
      'Dense tables and reports for finance teams',
    ],
    designs: ['Onboarding and verification flows', 'Payment and transfer flows', 'Account and portfolio dashboards', 'Reporting and reconciliation tables'],
    faqs: [
      {
        q: 'Can you work within regulatory constraints?',
        a: 'Yes. We design with your compliance requirements from the start and document the reasoning behind each step.',
      },
    ],
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
