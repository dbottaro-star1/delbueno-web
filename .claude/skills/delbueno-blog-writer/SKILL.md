---
name: delbueno-blog-writer
description: >
  Writes a complete, SEO-optimized blog post for delbuenostudio.com (delbueno™ Studio),
  picks relevant free images from Unsplash, and opens it as a pull request
  in the dbottaro-star1/delbueno-web GitHub repo for human review (merging the PR publishes
  it). Use this skill whenever the task is to write, draft, or publish a blog article for
  delbueno / delbuenostudio.com, including the weekly scheduled run, even if the user just
  says "write this week's post" or "draft a blog article". Always use this skill for
  delbueno blog content so voice, SEO rules, ICP targeting, and the review-first workflow
  stay consistent.
---

# delbueno Blog Writer

Produces one publication-ready post for **delbuenostudio.com** end to end:
topic selection, article, featured image, pull request, review summary.

The site is a static Astro build in the GitHub repo **dbottaro-star1/delbueno-web**.
A post is one Markdown file plus its image. Merging the pull request into `main`
deploys it. There is no WordPress anymore.

## Requirements

- A local checkout of the repo with `git` and the GitHub CLI `gh` signed in as
  dbottaro-star1 (`gh auth status`). Default path:
  `~/Desktop/Claude/delbueno new AI website`. If it is missing, clone it with
  `gh repo clone dbottaro-star1/delbueno-web`.
- Node 24 and `npm ci` done in the repo, so the checks can run.
- The Claude in Chrome tools (`mcp__claude-in-chrome__*`) to pick images on unsplash.com. If Chrome is not
  connected, publish without images (leave heroImage and heroAlt out; the site shows its branded share card) and
  say so in the PR body.

If any of these is missing, stop and say which one, instead of guessing.

## Output contract

The post goes up as a **pull request**, never straight to `main`. Do not merge it yourself
unless the invoking prompt explicitly says "publish". Even then, prefer leaving the PR open
for review.

Every run ends with a review file at `~/Documents/Blog/post-{YYYY-MM-DD}.md` (template in
Step 7).

---

## Step 1: Pick a topic that hasn't been covered

1. Sync first: in the repo run `git switch main && git pull --ff-only`.
2. List existing posts: titles, descriptions and categories from the frontmatter of
   `src/content/journal/*.md` (the file name is the URL slug). Also skim
   `research/gsc-*.md` if present, for queries that already have impressions.
3. Choose a topic that is **not** a near-duplicate of any existing post.
4. The topic must sit inside delbueno's world: **product/UX design for B2B SaaS** in Cloud
   Infrastructure, DevOps, Cybersecurity, AI-native products, Fintech, Proptech, Healthtech,
   Productivity tools, and developer platforms.
5. Anchor it to a real ICP pain point. The audience is **founders, product leaders, and
   engineering leaders** at startups and scale-ups (US / Americas), weighing whether to
   build design in-house or partner with a specialized studio.

Good topic shapes: teardowns of a UX pattern in a named product category; "how to" pieces on
a specific design problem (onboarding for dev tools, dashboard density, permission models,
empty states for AI products, pricing-page UX for usage-based SaaS); opinion pieces grounded
in the founder's senior UX work, including platform and infrastructure UX. Prefer concrete
and specific over generic "top 10 tips" listicles.

AI engines (ChatGPT, Perplexity, Google AI) already query this blog with long practical
questions, so answer-shaped topics work well: name the problem in the title, answer it in
the first paragraph.

## Step 2: Write the article

**Length:** 900 to 1300 words. **Language:** English (US).

**Structure:**

- A headline (`title`, the H1) built around one primary keyword. It can be long.
- An SEO title (`seoTitle`) of **60 characters or fewer**. The site adds " | delbueno"
  only when the total still fits in 60, so aim for 48 or fewer to get the brand.
- A slug: lowercase, hyphenated, keyword-led, no stop-word clutter. It becomes the file name
  and the URL `https://delbuenostudio.com/{slug}/`. It must not equal a site section
  (`work`, `services`, `industries`, `journal`, `playground`, `about`, `contact` and so on);
  the build refuses those.
- A meta description (`description`) of **140 to 155 characters**, written to earn the click,
  not to summarize.
- An opening paragraph that answers the headline's question directly in 2 or 3 sentences
  (this is what search and AI engines quote), then a concrete hook: a scenario, number or
  sharp claim. Never "In today's fast-paced SaaS landscape".
- Body in scannable `##` and `###` sections (never a `#` H1 in the body, the page has one).
  Short paragraphs. Use the primary keyword and natural variations without stuffing.
- At least one concrete example, mini-framework, or before/after walkthrough.
- One clear CTA near the end pointing to `/contact/` (or `/free-ux-audit/` when it fits),
  framed as a next step for teams weighing in-house vs a specialized partner. Not a hard sell.

**SEO mechanics:**

- One primary keyword plus 2 or 3 secondary terms, chosen for the ICP's real search intent.
- 2 or 3 internal links as root-relative paths to pages that exist: other posts
  (`/{slug}/`), services (`/services/product-design/` and the others), industries
  (`/industries/ai/` and the others), case studies (`/work/{slug}/`). Check that each target
  exists in `src/content` or `src/pages`. Never invent URLs.
- Descriptive, benefit-led headers.

## Step 3: Voice and banned phrasing

Write like a senior practitioner who has shipped real product, not like a content mill.
Confident, specific, plain. Active voice. Opinions are encouraged.

**Hard rules (the build checks some of these and fails):**

- **No em dashes (—), no en dashes (–), no middle dots (·)** anywhere: title, description,
  alt text or body. Use commas, periods, colons or parentheses. Ranges read "2 to 4 weeks".
  (`npm run lint:copy` fails on them.)
- **Never use the word "ensure."** Rewrite around it every time.
- **No raw HTML in the Markdown**: no `<div>`, `<iframe>`, `<script>`, `<img>`, inline
  styles or `javascript:` links. Plain Markdown only. (The content guard fails the build.)
- No superlatives about delbueno ("best", "#1", "top 1%"), and no invented clients, numbers
  or results. Only cite real case studies from `src/content/work/`.

Avoid AI-tell filler and corporate fog: delve, leverage (as a verb), unlock, elevate,
seamless, robust, game-changer, "navigate the landscape", "at its core", "it's worth noting",
"in conclusion", "moreover", "furthermore", "testament to", "the world of". If a sentence
could open any company's blog, cut it.

Brand name is **delbueno™ Studio**, lowercase "delbueno". The promise: research depth,
decision velocity and AI-augmented workflows; a design partner for B2B SaaS teams in Cloud,
DevOps, Cyber, AI and Fintech that ships complex product UX faster and leaner than in-house
teams. Kickoff the same day, first concepts in 48 hours. Reflect it without reciting it.

## Step 4: Images (Unsplash)

A featured image, plus one or two inline images where they help the reader (a concept the
section explains, not decoration).

1. Derive 1 or 2 specific queries per image from the article's core concept ("data
   dashboard dark interface", "developer working laptop night").
2. In a new Chrome tab, open `https://unsplash.com/s/photos/{query}?orientation=landscape`.
   Pick a clean, non-cliché photo. No handshakes, lightbulbs or suits. Only free photos:
   skip anything marked **Unsplash+** or with a lock or "Premium" badge.
3. Open the photo page (`https://unsplash.com/photos/{id}`) and note the photographer's name
   and the page URL. Download it with
   `curl -fsSL "https://unsplash.com/photos/{id}/download?force=true&w=2400" -o {tmp}/{slug}.jpg`
   into a fresh temp folder, check it with `file` (must be JPEG, PNG or WebP) and that it is
   under 4 MB, then move it to `src/assets/journal/{slug}/` (keep the real extension). Never
   hotlink and never use another image source. Close the tab when done.
4. The featured image goes in `heroImage` and `heroAlt`. Inline images use relative Markdown
   (`![{alt}](../../assets/journal/{slug}/{file})`), never raw HTML, each with a descriptive alt.
5. Credit every photo in one italic line at the very end of the post body, for example
   `*Photos by {Photographer} and {Photographer} on Unsplash.*` (the Unsplash license does not
   require it, but we credit anyway).

## Step 5: Create the post file

Create `src/content/journal/{slug}.md`:

```markdown
---
title: '{headline}'
seoTitle: '{seo title, 60 chars or fewer}'
description: '{140 to 155 characters}'
pubDate: { YYYY-MM-DD }
author: 'Dani Bottaro'
category: '{one of: AI & UX | B2B SaaS | DevOps & Security | Marketing & Growth | UX Strategy | Web Design}'
heroImage: '../../assets/journal/{slug}/{file}'
heroAlt: '{what the photo shows, with the primary keyword only if it fits naturally}'
legacyPath: '/{slug}/'
---

{body}
```

Use exactly one of the six existing categories. Do not create new ones.

## Step 6: Check, commit and open the pull request

In the repo:

1. `git switch -c post/{slug}` (branch from an up-to-date `main`).
2. Run the checks and fix anything they report:
   `npm run check && npm run build && npm run lint:copy && npm run check:seo && npm run check:csp`
3. `git add src/content/journal/{slug}.md src/assets/journal/{slug}/`
4. Commit with a message like `Draft post: {headline}`.
5. `git push -u origin post/{slug}`
6. `gh pr create --draft --title "Post: {headline}" --body "{summary: topic, why, SEO title, description, keyword, category, image credit, internal links}"`

CI runs the same checks on the pull request. The post goes live only when Dani marks the PR
ready and merges it.

## Step 7: Review summary

Write `~/Documents/Blog/post-{YYYY-MM-DD}.md`:

```
# Blog draft, {date}

**Topic:** {title}
**Why this topic:** {1 or 2 lines on the ICP angle and why it is not a duplicate}
**Pull request:** {PR URL}
**SEO title ({n} chars):** {…}
**Meta description ({n} chars):** {…}
**Slug / URL:** {…} / https://delbuenostudio.com/{slug}/
**Primary keyword:** {…} | Secondary: {…}
**Category:** {…}
**Images:** {unsplash photo page urls}
**Attribution:** Photos by {photographers} on Unsplash
**Internal links:** {…}
**Checks:** {pass, or what failed and how it was fixed}
```

Then tell the user in one or two lines that the pull request is ready for review, with its
link. Do not merge.
