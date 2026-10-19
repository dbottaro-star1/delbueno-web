import type { ImageMetadata } from 'astro';
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Every collection ignores files that start with "_" (drafts, samples, notes).
 * The entry id is the exact file name without extension, so a journal post at
 * src/content/journal/my-post.md is served at /my-post/, matching the old WordPress URL.
 */
const generateId = ({ entry }: { entry: string }) => entry.replace(/\.(md|mdx)$/, '');

/** Fields shared by the English and Spanish case studies. */
const workFields = (image: () => z.ZodType<ImageMetadata>) => ({
  /** The headline shown as the page H1. */
  title: z.string(),
  /** Title for the browser tab, search results and social cards. 60 characters or fewer with the brand. */
  seoTitle: z.string().optional(),
  /** Meta description, 140 to 155 characters. Falls back to `summary`, which is usually too long. */
  description: z.string().optional(),
  client: z.string(),
  summary: z.string(),
  industry: z.string(),
  services: z.array(z.string()),
  metrics: z.array(z.object({ value: z.coerce.string(), label: z.string() })),
  cover: image(),
  coverAlt: z.string(),
  gallery: z.array(z.object({ src: image(), alt: z.string() })).optional(),
  testimonial: z.object({ quote: z.string(), name: z.string(), role: z.string() }).optional(),
  year: z.number(),
  order: z.number(),
  draft: z.boolean().default(false),
});

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/[^_]*.{md,mdx}', generateId }),
  schema: ({ image }) => z.object({ ...workFields(image), legacyPath: z.string() }),
});

/**
 * Spanish case studies. Same fields as `work`, plus `translationOf`: the id (file name) of the English case study it
 * translates. The Spanish page is served at /es/trabajo/<translationOf>/. The build fails if a published English case
 * study has no Spanish twin or the other way round (see getWork in src/lib/content.ts).
 */
const workEs = defineCollection({
  loader: glob({ base: './src/content/work-es', pattern: '**/[^_]*.{md,mdx}', generateId }),
  schema: ({ image }) => z.object({ ...workFields(image), translationOf: z.string() }),
});

/** Fields shared by the English and Spanish journal posts. */
const journalFields = (image: () => z.ZodType<ImageMetadata>) => ({
  /** The headline shown as the page H1. */
  title: z.string(),
  /** Title for the browser tab, search results and social cards. 60 characters or fewer with the brand. */
  seoTitle: z.string().optional(),
  /** Meta description, 140 to 155 characters. */
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  author: z.string().default('Dani Bottaro'),
  category: z.string(),
  heroImage: image().optional(),
  heroAlt: z.string().optional(),
});

const journal = defineCollection({
  loader: glob({ base: './src/content/journal', pattern: '**/[^_]*.{md,mdx}', generateId }),
  schema: ({ image }) =>
    z.object({
      ...journalFields(image),
      legacyPath: z.string(),
      /** Keep the URL live but hide the post from search engines and listings. */
      noindex: z.boolean().default(false),
    }),
});

/**
 * Spanish translations of journal posts. Same fields as `journal` (the images are the English post's, referenced as
 * ../../assets/journal/<english-slug>/...), plus `translationOf`: the id of the English post it translates. The
 * entry id is the Spanish slug, served at /es/blog/<id>/, and it must match the table POST_SLUGS in
 * src/i18n/routes.ts. The build fails when the two disagree (see getJournalEs in src/lib/content.ts).
 */
const journalEs = defineCollection({
  loader: glob({ base: './src/content/journal-es', pattern: '**/[^_]*.{md,mdx}', generateId }),
  schema: ({ image }) => z.object({ ...journalFields(image), translationOf: z.string() }),
});

/**
 * Dribbble shots for the Playground section. One JSON file per shot, named after the Dribbble shot id.
 * The still image lives in src/assets/shots. Animated shots also carry a hotlinked mp4 (not downloaded).
 * Run `npm run sync:dribbble` to pull new shots. Existing entries are never deleted or overwritten
 * for the manual fields (featured, imageAlt).
 */
const shots = defineCollection({
  loader: glob({ base: './src/content/shots', pattern: '[^_]*.json' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // Rendered as an href, so only real Dribbble shot pages are allowed (no javascript:, data: or other hosts).
      url: z
        .url({ protocol: /^https$/, hostname: /^dribbble\.com$/ })
        .regex(/^https:\/\/dribbble\.com\/shots\/[^\s]+$/),
      image: image(),
      imageAlt: z.string(),
      /**
       * A looping clip: either a local file in public/ ("shots/<id>.mp4", added with
       * `npm run shot:video`) or a file on Dribbble's CDN. Nothing else passes the CSP.
       */
      video: z
        .union([z.string().regex(/^shots\/\d+\.(mp4|webm)$/), z.url().regex(/^https:\/\/cdn\.dribbble\.com\//)])
        .optional(),
      width: z.number(),
      height: z.number(),
      publishedAt: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number(),
    }),
});

export const collections = { work, workEs, journal, journalEs, shots };
