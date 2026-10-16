/**
 * The technologies the studio works with, grouped by category. Names are product names and are the same in both
 * languages. The category titles and intros are in src/i18n/pages/stack.ts, keyed by the same slugs.
 *
 * Logos come from Simple Icons (CC0, https://simpleicons.org). Brand names and logos belong to their owners. A tool
 * Simple Icons does not carry gets a `mono` instead: the initials shown in a tile, so every chip looks consistent.
 */
import {
  siAstro,
  siBlender,
  siClaude,
  siClaudecode,
  siCloudflare,
  siCss,
  siCursor,
  siDocker,
  siExpo,
  siFigma,
  siFirebase,
  siFlutter,
  siFramer,
  siGithub,
  siGithubactions,
  siGo,
  siGooglecloud,
  siGooglegemini,
  siGraphql,
  siGsap,
  siHotjar,
  siHtml5,
  siHuggingface,
  siJavascript,
  siJira,
  siKotlin,
  siKubernetes,
  siLangchain,
  siLinear,
  siLottiefiles,
  siNextdotjs,
  siNodedotjs,
  siNotion,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siRedis,
  siRive,
  siSupabase,
  siSwift,
  siTailwindcss,
  siTerraform,
  siThreedotjs,
  siTypescript,
  siVercel,
  siVuedotjs,
  siWebflow,
  type SimpleIcon,
} from 'simple-icons';

export interface StackItem {
  name: string;
  /** Brand mark from Simple Icons. */
  icon?: SimpleIcon;
  /** Initials for the tile when the brand is not in Simple Icons. */
  mono?: string;
}

export const STACK_SLUGS = ['design', 'motion', 'ai', 'frontend', 'mobile', 'backend', 'cloud', 'tools'] as const;

export type StackSlug = (typeof STACK_SLUGS)[number];

export const stack: Record<StackSlug, StackItem[]> = {
  design: [
    { name: 'Figma', icon: siFigma },
    { name: 'FigJam', mono: 'Fj' },
    { name: 'Framer', icon: siFramer },
    { name: 'Webflow', icon: siWebflow },
    { name: 'Adobe Photoshop', mono: 'Ps' },
    { name: 'Adobe Illustrator', mono: 'Ai' },
    { name: 'Adobe After Effects', mono: 'Ae' },
    { name: 'Protopie', mono: 'Pp' },
    { name: 'Rive', icon: siRive },
    { name: 'Lottie', icon: siLottiefiles },
  ],
  motion: [
    { name: 'Blender', icon: siBlender },
    { name: 'Spline', mono: 'Sp' },
    { name: 'Three.js', icon: siThreedotjs },
    { name: 'GSAP', icon: siGsap },
  ],
  ai: [
    { name: 'Claude', icon: siClaude },
    { name: 'Claude Code', icon: siClaudecode },
    { name: 'ChatGPT', mono: 'GPT' },
    { name: 'Gemini', icon: siGooglegemini },
    { name: 'Midjourney', mono: 'Mj' },
    { name: 'Runway', mono: 'Rw' },
    { name: 'Hugging Face', icon: siHuggingface },
    { name: 'LangChain', icon: siLangchain },
  ],
  frontend: [
    { name: 'TypeScript', icon: siTypescript },
    { name: 'JavaScript', icon: siJavascript },
    { name: 'React', icon: siReact },
    { name: 'Next.js', icon: siNextdotjs },
    { name: 'Astro', icon: siAstro },
    { name: 'Vue.js', icon: siVuedotjs },
    { name: 'Tailwind CSS', icon: siTailwindcss },
    { name: 'HTML5', icon: siHtml5 },
    { name: 'CSS', icon: siCss },
  ],
  mobile: [
    { name: 'React Native', mono: 'Rn' },
    { name: 'Expo', icon: siExpo },
    { name: 'Swift', icon: siSwift },
    { name: 'Kotlin', icon: siKotlin },
    { name: 'Flutter', icon: siFlutter },
  ],
  backend: [
    { name: 'Node.js', icon: siNodedotjs },
    { name: 'Python', icon: siPython },
    { name: 'Go', icon: siGo },
    { name: 'PostgreSQL', icon: siPostgresql },
    { name: 'Supabase', icon: siSupabase },
    { name: 'Firebase', icon: siFirebase },
    { name: 'GraphQL', icon: siGraphql },
    { name: 'Prisma', icon: siPrisma },
    { name: 'Redis', icon: siRedis },
  ],
  cloud: [
    { name: 'AWS', mono: 'AWS' },
    { name: 'Google Cloud', icon: siGooglecloud },
    { name: 'Azure', mono: 'Az' },
    { name: 'Vercel', icon: siVercel },
    { name: 'Cloudflare', icon: siCloudflare },
    { name: 'Docker', icon: siDocker },
    { name: 'Kubernetes', icon: siKubernetes },
    { name: 'GitHub Actions', icon: siGithubactions },
    { name: 'Terraform', icon: siTerraform },
  ],
  tools: [
    { name: 'VS Code', mono: 'VS' },
    { name: 'Cursor', icon: siCursor },
    { name: 'GitHub', icon: siGithub },
    { name: 'Jira', icon: siJira },
    { name: 'Linear', icon: siLinear },
    { name: 'Notion', icon: siNotion },
    { name: 'Slack', mono: 'Sl' },
    { name: 'Hotjar', icon: siHotjar },
  ],
};
