/**
 * Builds llms.txt and llms-full.txt from the content collections and data files, in each language.
 * English lives at /llms.txt and /llms-full.txt, Spanish at /es/llms.txt and /es/llms-full.txt.
 */
import { getEngagementsCopy } from '../data/engagements';
import { getIndustries } from '../data/industries';
import { getServices } from '../data/services';
import { STACK_SLUGS, stack } from '../data/stack';
import type { Lang } from '../i18n/config';
import { fill, t } from '../i18n';
import { llmsCopy } from '../i18n/pages/llms';
import { stackPageCopy } from '../i18n/pages/stack';
import { industryPath, pagePath, servicePath, workPath } from '../i18n/routes';
import { formatDate, getJournal, getShots, getWork, plainBody, shotText, workSlug } from './content';
import { BRAND, LINKS, SAME_AS } from './site';
import { absoluteUrl } from './url';

/** Push Markdown headings in an entry body below the entry's own `###` title, so the document outline stays valid. */
const demote = (body: string): string => body.replace(/^(#{1,4}) /gm, '$1## ');

const link = (title: string, href: string, note?: string) => `- [${title}](${href})${note ? `: ${note}` : ''}`;

const llmsPath = (lang: Lang, file: 'llms.txt' | 'llms-full.txt'): string =>
  lang === 'en' ? `/${file}` : `/es/${file}`;

export async function buildLlmsTxt(site: URL | undefined, lang: Lang = 'en'): Promise<string> {
  const c = llmsCopy[lang];
  const u = (path: string) => absoluteUrl(path, site);
  const vars = { brand: BRAND.name, locality: BRAND.locality, country: BRAND.country, email: BRAND.email };
  const [work, journal, shots] = await Promise.all([getWork(lang), getJournal(), getShots()]);
  const { engagements } = getEngagementsCopy(lang);
  const other: Lang = lang === 'en' ? 'es' : 'en';

  const lines: string[] = [
    `# ${BRAND.name}`,
    '',
    `> ${fill(c.summary, vars)}`,
    '',
    `${t(lang, 'brand.speed')} ${fill(c.bookLine, { url: LINKS.book })}`,
    '',
    `## ${c.h.services}`,
    ...getServices(lang).map((s) => link(s.name, u(servicePath(s.slug, lang)), s.summary)),
    '',
    `## ${c.h.engagements}`,
    ...engagements.map((e) => link(e.name, u(`${pagePath('engagements', lang)}#${e.slug}`), e.summary)),
    '',
    `## ${c.h.industries}`,
    ...getIndustries(lang).map((i) => link(i.title, u(industryPath(i.slug, lang)), i.summary)),
    '',
  ];

  if (work.length) {
    lines.push(
      `## ${c.h.cases}`,
      ...work.map((w) => link(w.data.title, u(workPath(workSlug(w), lang)), `${w.data.client}. ${w.data.summary}`)),
      '',
    );
  }

  if (shots.length) {
    lines.push(
      `## ${c.h.playground}`,
      link('Playground', u(pagePath('playground', lang)), c.playgroundNote),
      ...shots.map((p) => link(p.data.title, p.data.url, shotText(p, lang).tags.join(', '))),
      '',
    );
  }

  if (journal.length) {
    lines.push(`## ${c.h.journal}`, ...journal.map((p) => link(p.data.title, u(`/${p.id}/`), p.data.description)), '');
  }

  const co = c.company;
  lines.push(
    `## ${c.h.company}`,
    link(co.work[0], u(pagePath('work', lang)), co.work[1]),
    link(co.industries[0], u(pagePath('industries', lang)), co.industries[1]),
    link(co.engagements[0], u(pagePath('engagements', lang)), co.engagements[1]),
    link(co.stack[0], u(pagePath('stack', lang)), co.stack[1]),
    link(co.journal[0], u(pagePath('journal', lang)), co.journal[1]),
    link(co.about[0], u(pagePath('about', lang)), co.about[1]),
    link(co.contact[0], u(pagePath('contact', lang)), fill(c.contactNote, { email: BRAND.email })),
    link(co.audit[0], u(pagePath('audit', lang)), co.audit[1]),
    link(co.full[0], u(llmsPath(lang, 'llms-full.txt')), co.full[1]),
    link(co.otherLanguage[0], u(llmsPath(other, 'llms.txt')), co.otherLanguage[1]),
    '',
    `## ${c.h.profiles}`,
    ...SAME_AS.map((href) => `- ${href}`),
    '',
  );

  return lines.join('\n');
}

export async function buildLlmsFullTxt(site: URL | undefined, lang: Lang = 'en'): Promise<string> {
  const c = llmsCopy[lang];
  const f = c.full;
  const u = (path: string) => absoluteUrl(path, site);
  const vars = { brand: BRAND.name, locality: BRAND.locality, country: BRAND.country, email: BRAND.email };
  const [work, journal, shots] = await Promise.all([getWork(lang), getJournal(), getShots()]);
  const { engagements, faqs: engagementFaqs } = getEngagementsCopy(lang);

  const out: string[] = [
    `# ${BRAND.name}`,
    '',
    `> ${fill(c.summary, vars)}`,
    '',
    `## ${c.h.company}`,
    '',
    `${f.name}: ${BRAND.name}`,
    `${f.website}: ${u(pagePath('home', lang))}`,
    fill(f.location, vars),
    `${f.founder}: ${BRAND.founder}`,
    `${f.email}: ${BRAND.email}`,
    `${f.book}: ${LINKS.book}`,
    `${f.speed}: ${t(lang, 'brand.speed')}`,
    '',
    f.profiles,
    ...SAME_AS.map((href) => `- ${href}`),
    '',
    `## ${c.h.services}`,
    '',
  ];

  for (const s of getServices(lang)) {
    out.push(
      `### ${s.name}`,
      `${f.url}: ${u(servicePath(s.slug, lang))}`,
      '',
      s.answer,
      '',
      f.cover,
      ...s.covers.map((x) => `- ${x}`),
      '',
      f.getTitle,
      ...s.deliverables.map((d) => `- ${d}`),
      '',
      ...s.faqs.flatMap((q) => [`Q: ${q.q}`, `A: ${q.a}`, '']),
    );
  }

  out.push(`## ${c.h.engagements}`, '');
  for (const e of engagements) {
    out.push(
      `### ${e.name}`,
      `${f.url}: ${u(`${pagePath('engagements', lang)}#${e.slug}`)}`,
      '',
      e.summary,
      '',
      `${f.bestFor}: ${e.bestFor}`,
      '',
      e.description,
      '',
      ...e.includes.map((x) => `- ${x}`),
      '',
    );
  }
  out.push(...engagementFaqs.flatMap((q) => [`Q: ${q.q}`, `A: ${q.a}`, '']));

  const stackCopy = stackPageCopy[lang];
  out.push(
    `## ${c.h.stack}`,
    '',
    `${f.url}: ${u(pagePath('stack', lang))}`,
    '',
    stackCopy.answer,
    '',
    ...STACK_SLUGS.map((slug) => `- ${stackCopy.categories[slug].title}: ${stack[slug].map((i) => i.name).join(', ')}`),
    '',
  );

  out.push(`## ${c.h.industries}`, '');
  for (const i of getIndustries(lang)) {
    out.push(
      `### ${i.title}`,
      `${f.url}: ${u(industryPath(i.slug, lang))}`,
      '',
      i.answer,
      '',
      f.challenges,
      ...i.challenges.map((x) => `- ${x}`),
      '',
      f.designs,
      ...i.designs.map((x) => `- ${x}`),
      '',
      ...i.faqs.flatMap((q) => [`Q: ${q.q}`, `A: ${q.a}`, '']),
    );
  }

  if (work.length) {
    out.push(`## ${c.h.cases}`, '');
    for (const w of work) {
      const d = w.data;
      out.push(
        `### ${d.title}`,
        `${f.url}: ${u(workPath(workSlug(w), lang))}`,
        `${f.client}: ${d.client}`,
        `${f.industry}: ${d.industry}`,
        `${f.year}: ${d.year}`,
        `${f.services}: ${d.services.join(', ')}`,
        '',
        d.summary,
        '',
      );
      if (d.metrics.length) out.push(f.results, ...d.metrics.map((m) => `- ${m.value} ${m.label}`), '');
      if (d.testimonial) {
        out.push(`${f.testimonial}: "${d.testimonial.quote}" (${d.testimonial.name}, ${d.testimonial.role})`, '');
      }
      const body = demote(plainBody(w.body));
      if (body) out.push(body, '');
    }
  }

  if (shots.length) {
    out.push(`## ${c.h.playground}`, '', `${f.url}: ${u(pagePath('playground', lang))}`, '', f.playgroundBlurb, '');
    for (const s of shots) {
      const text = shotText(s, lang);
      const d = s.data;
      out.push(`- ${d.title}: ${text.alt} (${d.url}${text.tags.length ? `; ${f.tags}: ${text.tags.join(', ')}` : ''})`);
    }
    out.push('');
  }

  if (journal.length) {
    out.push(`## ${c.h.journal}`, '');
    if (lang !== 'en') out.push(f.journalNote, '');
    for (const p of journal) {
      const d = p.data;
      out.push(
        `### ${d.title}`,
        `${f.url}: ${u(`/${p.id}/`)}`,
        `${f.author}: ${d.author}`,
        `${f.published}: ${formatDate(d.pubDate, lang)}`,
        `${f.category}: ${d.category}`,
        '',
        d.description,
        '',
      );
      // The Spanish file lists the articles only. The full English text is in llms-full.txt.
      if (lang === 'en') {
        const body = demote(plainBody(p.body));
        if (body) out.push(body, '');
      }
    }
  }

  return out.join('\n');
}
