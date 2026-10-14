import type { Lang } from '../i18n/config';
import { industriesEs } from './industries.es';
import type { FaqItem } from './types';

export interface IndustryProblem {
  title: string;
  text: string;
  /** Journal post slug that goes deeper on this problem. */
  post?: string;
}

export interface Industry {
  slug: 'cloud' | 'cybersecurity' | 'devops' | 'ai' | 'fintech';
  name: string;
  /** Page title and H1. */
  title: string;
  /** Meta description, 140 to 155 characters. */
  seoDescription: string;
  summary: string;
  /** Answer-first paragraph, 40 to 60 words. */
  answer: string;
  /** The typical problems in this domain, each with the journal post that goes deeper. */
  problems: IndustryProblem[];
  /** Short versions of the problems, used in llms.txt. */
  challenges: string[];
  designs: string[];
  /** Case study slugs, closest first. */
  cases: string[];
  /** Shown above the cases when there is no case study in this exact domain yet. */
  casesNote?: string;
  /** Extra journal post slugs, filled in after the posts linked from the problems. */
  posts: string[];
  /** Words used to find more journal posts when fewer than three are linked. */
  keywords: string[];
  /** Closing call to action heading. */
  cta: string;
  faqs: FaqItem[];
}

/** The words of an industry. Spanish versions are in industries.es.ts, the rest is shared. */
export type IndustryText = Omit<Industry, 'slug' | 'cases' | 'posts' | 'keywords' | 'challenges' | 'problems'> & {
  /** Same order as the English problems. The journal post each one links to is kept in industries.ts. */
  problems: Omit<IndustryProblem, 'post'>[];
};

function withChallenges<T extends Omit<Industry, 'challenges'>>(industry: T): T & { challenges: string[] } {
  return { ...industry, challenges: industry.problems.map((p) => p.title) };
}

export const industries: Industry[] = [
  withChallenges({
    slug: 'cloud',
    seoDescription:
      'UX design for cloud infrastructure products: consoles, resource views, dashboards and onboarding. Our CloudGuardia work lifted user satisfaction 42%.',
    name: 'Cloud',
    title: 'UX design for cloud infrastructure products',
    summary: 'Interfaces for cloud platforms, cost tools and infrastructure consoles.',
    answer:
      'delbueno™ Studio designs cloud infrastructure products for B2B software teams: consoles, resource views, dashboards, onboarding flows and admin tools. We turn complex platforms into interfaces that simplify operations and speed up adoption. Our cloud security work for CloudGuardia lifted user satisfaction 42%.',
    problems: [
      {
        title: 'Inventories nobody can scan',
        text: 'Thousands of resources across accounts and regions need filtering, grouping and safe bulk actions, not another endless table.',
        post: 'complex-ux-design',
      },
      {
        title: 'Dashboards that show data but not the next decision',
        text: 'Monitoring, cost and system health only help when the screen makes the next move obvious to the person looking at it.',
        post: 'complex-software-ux-design',
      },
      {
        title: 'Setup that stalls before first value',
        text: 'Connecting accounts and granting permissions is where new users give up. Onboarding has to prove value in the first session.',
        post: 'saas-onboarding-ux-patterns',
      },
      {
        title: 'Permissions people cannot reason about',
        text: 'Roles, scopes and inherited access confuse the admins who depend on them, and every confusing screen is a security risk.',
        post: 'rbac-ux-permissions-design',
      },
    ],
    designs: [
      'Resource explorers',
      'Cost and usage dashboards',
      'Onboarding and setup wizards',
      'Admin, billing and permission consoles',
    ],
    cases: ['cloudguardia', 'uleadz'],
    casesNote:
      'CloudGuardia is our cloud security platform. Uleadz is the closest other SaaS work: dashboards, a mobile app and one design system.',
    posts: ['how-ai-is-transforming-saas-cloud-devops-design'],
    keywords: ['cloud', 'infrastructure', 'dashboard'],
    cta: 'Let’s design infrastructure that scales with your business.',
    faqs: [
      {
        q: 'Do you design for multi-cloud products?',
        a: 'Yes. We design provider-neutral patterns for inventory, access and cost, so the product reads consistently across clouds.',
      },
      {
        q: 'How do you serve both new and expert users?',
        a: 'With a guided path for first setup and dense, filterable views for daily operators. We test both groups on real tasks before anything is handed to engineering.',
      },
      {
        q: 'Have you designed a cloud platform before?',
        a: 'Yes. For CloudGuardia, a cloud security platform, we ran research and personas, designed the product and a design kit, and drew 40 custom icons and illustrations. User satisfaction rose 42%.',
      },
    ],
  }),
  withChallenges({
    slug: 'cybersecurity',
    seoDescription:
      'UX design for cybersecurity products: alert queues, investigation views and policy editors that cut alert fatigue and keep dense data readable.',
    name: 'Cybersecurity',
    title: 'UX design for cybersecurity products',
    summary: 'Interfaces for security operations, posture management and threat response.',
    answer:
      'delbueno™ Studio designs cybersecurity products where analysts work under pressure: alert queues, investigation views, posture dashboards and policy editors. We reduce alert fatigue, surface the next action and keep dense data readable, so security teams respond faster and make fewer mistakes.',
    problems: [
      {
        title: 'Alert fatigue buries the real threat',
        text: 'When a certificate expiring in 60 days looks like a database refusing connections, analysts learn to stop looking. Severity and urgency have to be designed.',
        post: 'alert-fatigue-ux-design',
      },
      {
        title: 'Severity that does not match reality',
        text: 'Feature-heavy tools can still feel ineffective when everything is red. Clear severity and visible evidence lower the cognitive load without hiding detail.',
        post: 'human-centered-design-in-cybersecurity-products-making-complex-security-tools-usable',
      },
      {
        title: 'Investigations that need context from many sources',
        text: 'Analysts piece together evidence across tabs. A good investigation view puts the timeline, the evidence and the next action side by side.',
      },
      {
        title: 'Access rules that are hard to explain',
        text: 'Role-based permissions are a security control and a usability problem. Admins need to see who can do what, and why.',
        post: 'rbac-ux-permissions-design',
      },
    ],
    designs: [
      'Alert triage queues',
      'Investigation timelines',
      'Posture and risk dashboards',
      'Policy and permission editors',
    ],
    cases: ['cloudguardia'],
    casesNote:
      'CloudGuardia is a cloud security platform, with a risk score, an alert banner and a repository manager. User satisfaction rose 42%.',
    posts: [],
    keywords: ['security', 'alert', 'threat'],
    cta: 'Let’s build secure digital products.',
    faqs: [
      {
        q: 'How do you reduce alert fatigue in the interface?',
        a: 'We separate alerts that need a human from notifications, group related alerts, rank them by user impact and show the evidence next to the decision, with the next action one click away.',
      },
      {
        q: 'Can you design for analysts and for executives in the same product?',
        a: 'Yes. We design role-based views, so analysts get dense, filterable detail and leadership gets posture and risk at a glance, on one design system.',
      },
      {
        q: 'Do you work with products that are still in stealth?',
        a: 'Yes. We sign an NDA on request, and the free UX audit covers beta and stealth products too.',
      },
    ],
  }),
  withChallenges({
    slug: 'devops',
    seoDescription:
      'UX design for DevOps tools: pipeline views, deployment dashboards, monitoring and incident views that stay fast, keyboard friendly and honest.',
    name: 'DevOps',
    title: 'UX design for DevOps tools',
    summary: 'Interfaces for pipelines, observability and developer platforms.',
    answer:
      'delbueno™ Studio designs DevOps tools for engineering teams: pipeline views, deployment dashboards, real-time monitoring, incident views and developer portals. We design for people who live in the terminal, so interfaces stay fast, keyboard friendly and honest about what is happening in production.',
    problems: [
      {
        title: 'Status that cannot be trusted at 3 a.m.',
        text: 'During an incident the screen has to say what is broken, who owns it and what to do next. Everything else is noise.',
        post: 'alert-fatigue-ux-design',
      },
      {
        title: 'Pipelines and logs with too much detail',
        text: 'Environments, stages and logs pile up fast. Information architecture decides whether an engineer finds the failing step or gives up.',
        post: 'devops-ux-design',
      },
      {
        title: 'Onboarding that never proves value',
        text: 'A developer tool earns trust in the first session or not at all. The first run has to show a real result quickly.',
        post: 'devops-ux-design',
      },
      {
        title: 'Users who prefer the command line',
        text: 'The interface should reinforce the CLI, not fight it: consistent names, keyboard paths and links that round-trip between the two.',
        post: 'devops-centric-ux',
      },
    ],
    designs: [
      'Pipeline and deployment views',
      'Incident and on-call dashboards',
      'Log and trace explorers',
      'Developer portals',
    ],
    cases: ['cloudguardia'],
    casesNote:
      'We have not published a DevOps-specific case study yet. CloudGuardia is the closest: a repository manager, alerts, performance charts and an activity log.',
    posts: ['complex-ux-design'],
    keywords: ['devops', 'engineer', 'dashboard'],
    cta: 'Let’s streamline your development workflow.',
    faqs: [
      {
        q: 'Do you design for developers who prefer the CLI?',
        a: 'Yes. We keep the interface keyboard friendly and consistent with the command line, so the two reinforce each other.',
      },
      {
        q: 'What do you design for DevOps teams?',
        a: 'Real-time monitoring dashboards, deployment views, cost tracking and system health, with the aim of reducing cognitive load and raising team velocity.',
      },
      {
        q: 'Can you test with engineers?',
        a: 'Yes. We recruit target-role testers such as tech leads, cloud admins and developers, and run rapid sessions that surface friction in minutes.',
      },
    ],
  }),
  withChallenges({
    slug: 'ai',
    seoDescription:
      'UX design for AI products and agents: workflows, copilots and explainable output, with human-in-the-loop controls, confidence signals and recovery paths.',
    name: 'AI',
    title: 'UX design for AI products and agents',
    summary: 'Interfaces for AI agents, copilots and explainable machine learning.',
    answer:
      'delbueno™ Studio designs AI-native products: agent workflows, copilots and explainable model output. We focus on trust, with human-in-the-loop controls, clear confidence signals and recovery paths, so users know what the system did, why it did it and how to correct it. Buzz Bunny, 1to1000 and Shay are our AI work.',
    problems: [
      {
        title: 'Output users cannot inspect',
        text: 'People do not trust a result they cannot question. Explainability has to be designed for each audience, from the end user to the auditor.',
        post: 'explainable-ai-ux',
      },
      {
        title: 'Agent actions that run without review',
        text: 'The question is where a human belongs in the loop. We sort actions by reversibility and blast radius and design approvals around that.',
        post: 'ai-agent-ux-human-in-the-loop',
      },
      {
        title: 'Uncertainty that is hard to communicate',
        text: 'Intelligent software is sometimes wrong. Confidence signals, previews and recovery paths keep that honest without slowing the user down.',
        post: 'ai-first-product-design',
      },
      {
        title: 'Models and workflows nobody can read',
        text: 'AI dashboards for models, pipelines and results need the same clarity as any complex SaaS screen, or the team cannot act on what the system shows.',
        post: 'how-ai-is-transforming-saas-cloud-devops-design',
      },
    ],
    designs: [
      'Agent workspaces and approval flows',
      'Explainability panels',
      'Chat and copilot interfaces',
      'Model and workflow dashboards',
    ],
    cases: ['buzz-bunny', '1to1000', 'shay'],
    posts: ['ai-driven-ux-design'],
    keywords: ['ai', 'agent', 'intelligent'],
    cta: 'Let’s build intelligent products powered by AI.',
    faqs: [
      {
        q: 'How do you design human-in-the-loop experiences?',
        a: 'We define which actions need approval, show the agent plan before it runs and make every step reviewable and reversible.',
      },
      {
        q: 'Have you shipped AI products?',
        a: 'Yes. Buzz Bunny is an AI stock recommendation app, built in Flutter, where onboarding completion rose from 62% to 91%. 1to1000 is an AI real estate matching app that went from concept to MVP in 45 days. Shay pairs a loyalty app with an AI-powered CRM.',
      },
      {
        q: 'Can you prototype AI features quickly?',
        a: 'Yes. We use AI-assisted prototyping to put a working version in front of users early, as we did for the diagnostic wizard in the Vzari store.',
      },
    ],
  }),
  withChallenges({
    slug: 'fintech',
    seoDescription:
      'UX design for fintech products: payment flows, account dashboards, onboarding and compliance steps that keep every money movement clear and unambiguous.',
    name: 'Fintech',
    title: 'UX design for fintech products',
    summary: 'Interfaces for payments, banking, investing and financial operations.',
    answer:
      'delbueno™ Studio designs fintech products for B2B teams and their customers: payment flows, account dashboards, onboarding and compliance steps. We make regulated processes feel simple and money movements unambiguous. For Buzz Bunny, an AI stock app, onboarding completion rose from 62% to 91%.',
    problems: [
      {
        title: 'Money movements that cannot be undone',
        text: 'One wrong tap moves real money. Confirmations have to mean something, and the undo should be designed even when the system says there is none.',
        post: 'fintech-ux-irreversible-actions',
      },
      {
        title: 'Compliance steps that cause drop-off',
        text: 'Verification and onboarding are where users leave. Clear sequencing and progress keep regulated steps from feeling like walls.',
        post: 'saas-onboarding-ux-patterns',
      },
      {
        title: 'Dense tables and reports for finance teams',
        text: 'Reconciliation and reporting screens are read for hours. Hierarchy, alignment and filtering decide whether they are usable or exhausting.',
        post: 'complex-ux-design',
      },
      {
        title: 'Recommendations people need to understand',
        text: 'When software suggests a trade or a transfer, users want to know why. Explaining the recommendation is part of earning trust.',
        post: 'explainable-ai-ux',
      },
    ],
    designs: [
      'Onboarding and verification flows',
      'Payment and transfer flows',
      'Account and portfolio dashboards',
      'Reporting and reconciliation tables',
    ],
    cases: ['buzz-bunny'],
    casesNote: 'Buzz Bunny is our fintech case study: an AI-driven stock recommendation app for everyday investors.',
    posts: ['ai-first-product-design'],
    keywords: ['fintech', 'payment', 'financial'],
    cta: 'Let’s build fintech products people can trust.',
    faqs: [
      {
        q: 'Can you work within regulatory constraints?',
        a: 'Yes. We design with your compliance requirements from the start and document the reasoning behind each step.',
      },
      {
        q: 'How do you design actions users cannot undo?',
        a: 'We stop slips before they start, make confirmations carry the amount and the consequence, and design a recovery path for the moments the system says there is no undo.',
      },
      {
        q: 'Have you designed a fintech product?',
        a: 'Yes. Buzz Bunny is an AI-driven stock recommendation app for iOS and Android. Onboarding completion rose from 62% to 91%, and the closed beta reached more than 1,000 early users.',
      },
    ],
  }),
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}

/** The industries with their words in a language. English is the source and Spanish overlays it. */
export function getIndustries(lang: Lang): Industry[] {
  if (lang === 'en') return industries;
  return industries.map((industry) => {
    const text = industriesEs[industry.slug];
    if (!text) throw new Error(`No Spanish copy for industry "${industry.slug}" in industries.es.ts`);
    const problems = industry.problems.map((problem, i) => ({ ...problem, ...text.problems[i] }));
    return { ...industry, ...text, problems, challenges: problems.map((p) => p.title) };
  });
}
