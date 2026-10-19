/** Look up related case studies and journal posts for the services and industries pages. */
import type { Lang } from '../../i18n/config';
import {
  getJournal,
  getWork,
  inLang,
  workSlug,
  type JournalEntry,
  type PostEntry,
  type WorkEntry,
} from '../../lib/content';

/** Case studies in the order given by the slugs. Slugs that do not exist (or are drafts) are skipped. */
export async function casesFor(slugs: string[], lang: Lang = 'en'): Promise<WorkEntry[]> {
  const work = await getWork(lang);
  return slugs.map((slug) => work.find((w) => workSlug(w) === slug)).filter((w): w is WorkEntry => Boolean(w));
}

/**
 * Up to `max` journal posts: first the ones named by slug, then posts that match the keywords in their
 * title, description or category, newest first. Hidden (noindex) posts are never returned. Slugs and keywords are
 * English; in Spanish the posts that have a translation come back translated.
 */
export async function postsFor(slugs: string[], keywords: string[], max = 3, lang: Lang = 'en'): Promise<PostEntry[]> {
  const posts = await getJournal();
  const picked: JournalEntry[] = [];
  const add = (post: JournalEntry | undefined) => {
    if (post && picked.length < max && !picked.includes(post)) picked.push(post);
  };
  slugs.forEach((slug) => add(posts.find((p) => p.id === slug)));
  if (picked.length < max) {
    const words = keywords.map((k) => new RegExp(`\\b${k}`, 'i'));
    posts
      .map((post) => {
        const hay = `${post.data.title} ${post.data.description} ${post.data.category}`;
        return { post, score: words.filter((w) => w.test(hay)).length };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score || b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf())
      .forEach((x) => add(x.post));
  }
  return inLang(picked, lang);
}
