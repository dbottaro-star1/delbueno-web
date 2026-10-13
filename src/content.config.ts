import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Both collections ignore files that start with "_" (drafts, samples, notes).
 * The entry id is the exact file name without extension, so a journal post at
 * src/content/journal/my-post.md is served at /my-post/, matching the old WordPress URL.
 */
const generateId = ({ entry }: { entry: string }) => entry.replace(/\.(md|mdx)$/, '');

const work = defineCollection({
  loader: glob({ base: './src/content/work', pattern: '**/[^_]*.{md,mdx}', generateId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      client: z.string(),
      summary: z.string(),
      industry: z.string(),
      services: z.array(z.string()),
      metrics: z.array(z.object({ value: z.coerce.string(), label: z.string() })),
      cover: image(),
      coverAlt: z.string(),
      gallery: z.array(z.object({ src: image(), alt: z.string() })).optional(),
      testimonial: z
        .object({ quote: z.string(), name: z.string(), role: z.string() })
        .optional(),
      year: z.number(),
      order: z.number(),
      legacyPath: z.string(),
      draft: z.boolean().default(false),
    }),
});

const journal = defineCollection({
  loader: glob({ base: './src/content/journal', pattern: '**/[^_]*.{md,mdx}', generateId }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Dani Bottaro'),
      category: z.string(),
      heroImage: image().optional(),
      heroAlt: z.string().optional(),
      legacyPath: z.string(),
      /** Keep the URL live but hide the post from search engines and listings. */
      noindex: z.boolean().default(false),
    }),
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
      url: z.url(),
      image: image(),
      imageAlt: z.string(),
      video: z.url().optional(),
      width: z.number(),
      height: z.number(),
      publishedAt: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      order: z.number(),
    }),
});

export const collections = { work, journal, shots };
