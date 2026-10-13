/** Builds llms.txt and llms-full.txt from the content collections and data files. */
import { engagementFaqs, engagements } from '../data/engagements';
import { industries } from '../data/industries';
import { services } from '../data/services';
import { formatDate, getJournal, getShots, getWork, plainBody } from './content';
import { BRAND, LINKS, SAME_AS } from './site';
import { absoluteUrl } from './url';

const SUMMARY =
  `${BRAND.name} is a product design and development studio for B2B SaaS teams and startups, ` +
  `based in ${BRAND.locality}, ${BRAND.country}, working remote with US hours. ` +
  'Services: product strategy, product design, web design and build. ' +
  'Engagement models: Launch Sprint, Design Partner and Designer on Demand. ' +
  `Kickoff is the same day and first concepts arrive in 48 hours. Contact: ${BRAND.email}.`;

const link = (title: string, href: string, note?: string) => `- [${title}](${href})${note ? `: ${note}` : ''}`;

export async function buildLlmsTxt(site: URL | undefined): Promise<string> {
  const u = (path: string) => absoluteUrl(path, site);
  const [work, journal, shots] = await Promise.all([getWork(), getJournal(), getShots()]);

  const lines: string[] = [
    `# ${BRAND.name}`,
    '',
    `> ${SUMMARY}`,
    '',
    `${BRAND.speed} Book a 15 minute call at ${LINKS.book}.`,
    '',
    '## Services',
    ...services.map((s) => link(s.name, u(`/services/${s.slug}/`), s.summary)),
    '',
    '## Engagement models',
    ...engagements.map((e) => link(e.name, u(`/engagements/#${e.slug}`), e.summary)),
    '',
    '## Industries',
    ...industries.map((i) => link(i.title, u(`/industries/${i.slug}/`), i.summary)),
    '',
  ];

  if (work.length) {
    lines.push(
      '## Case studies',
      ...work.map((w) => link(w.data.title, u(`/work/${w.id}/`), `${w.data.client}. ${w.data.summary}`)),
      '',
    );
  }

  if (shots.length) {
    lines.push(
      '## Playground',
      link('Playground', u('/playground/'), 'Short UI explorations and motion studies, also on Dribbble'),
      ...shots.map((p) => link(p.data.title, p.data.url, p.data.tags.join(', '))),
      '',
    );
  }

  if (journal.length) {
    lines.push(
      '## Journal',
      ...journal.map((p) => link(p.data.title, u(`/${p.id}/`), p.data.description)),
      '',
    );
  }

  lines.push(
    '## Company',
    link('About', u('/about/'), 'Who we are and how we work'),
    link('Contact', u('/contact/'), `Book a call or email ${BRAND.email}`),
    link('Free UX audit', u('/free-ux-audit/'), 'A short, ranked list of what to fix first'),
    link('Full text for language models', u('/llms-full.txt'), 'All of the above with full details'),
    '',
    '## Profiles',
    ...SAME_AS.map((href) => `- ${href}`),
    '',
  );

  return lines.join('\n');
}

export async function buildLlmsFullTxt(site: URL | undefined): Promise<string> {
  const u = (path: string) => absoluteUrl(path, site);
  const [work, journal] = await Promise.all([getWork(), getJournal()]);

  const out: string[] = [
    `# ${BRAND.name}`,
    '',
    `> ${SUMMARY}`,
    '',
    '## Company',
    '',
    `Name: ${BRAND.name}`,
    `Website: ${u('/')}`,
    `Location: ${BRAND.locality}, ${BRAND.country}. Remote, with US hours.`,
    `Founder: ${BRAND.founder}`,
    `Email: ${BRAND.email}`,
    `Book a call: ${LINKS.book}`,
    `Speed: ${BRAND.speed}`,
    '',
    'Profiles:',
    ...SAME_AS.map((href) => `- ${href}`),
    '',
    '## Services',
    '',
  ];

  for (const s of services) {
    out.push(
      `### ${s.name}`,
      `URL: ${u(`/services/${s.slug}/`)}`,
      '',
      s.answer,
      '',
      'What we cover:',
      ...s.covers.map((c) => `- ${c}`),
      '',
      'What you get:',
      ...s.deliverables.map((d) => `- ${d}`),
      '',
      ...s.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, '']),
    );
  }

  out.push('## Engagement models', '');
  for (const e of engagements) {
    out.push(
      `### ${e.name}`,
      `URL: ${u(`/engagements/#${e.slug}`)}`,
      '',
      e.summary,
      '',
      `Best for: ${e.bestFor}`,
      '',
      e.description,
      '',
      ...e.includes.map((i) => `- ${i}`),
      '',
    );
  }
  out.push(...engagementFaqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, '']));

  out.push('## Industries', '');
  for (const i of industries) {
    out.push(
      `### ${i.title}`,
      `URL: ${u(`/industries/${i.slug}/`)}`,
      '',
      i.answer,
      '',
      'Common challenges:',
      ...i.challenges.map((c) => `- ${c}`),
      '',
      'What we design:',
      ...i.designs.map((d) => `- ${d}`),
      '',
      ...i.faqs.flatMap((f) => [`Q: ${f.q}`, `A: ${f.a}`, '']),
    );
  }

  if (work.length) {
    out.push('## Case studies', '');
    for (const w of work) {
      const d = w.data;
      out.push(
        `### ${d.title}`,
        `URL: ${u(`/work/${w.id}/`)}`,
        `Client: ${d.client}`,
        `Industry: ${d.industry}`,
        `Year: ${d.year}`,
        `Services: ${d.services.join(', ')}`,
        '',
        d.summary,
        '',
      );
      if (d.metrics.length) out.push('Results:', ...d.metrics.map((m) => `- ${m.value} ${m.label}`), '');
      if (d.testimonial) {
        out.push(`Testimonial: "${d.testimonial.quote}" (${d.testimonial.name}, ${d.testimonial.role})`, '');
      }
      const body = plainBody(w.body);
      if (body) out.push(body, '');
    }
  }

  if (journal.length) {
    out.push('## Journal', '');
    for (const p of journal) {
      const d = p.data;
      out.push(
        `### ${d.title}`,
        `URL: ${u(`/${p.id}/`)}`,
        `Author: ${d.author}`,
        `Published: ${formatDate(d.pubDate)}`,
        `Category: ${d.category}`,
        '',
        d.description,
        '',
      );
      const body = plainBody(p.body);
      if (body) out.push(body, '');
    }
  }

  return out.join('\n');
}
