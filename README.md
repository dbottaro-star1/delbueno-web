# delbueno™ Studio website

Production site for [delbuenostudio.com](https://delbuenostudio.com), replacing the old WordPress build.
Built with Astro 7 (static output), TypeScript, GSAP and Lenis. Content lives in Markdown in this repository.

## Requirements

- Node 24 (see `.nvmrc`). With nvm, run `nvm use`.
- npm

## Commands

| Command | What it does |
| --- | --- |
| `npm install` | Installs dependencies |
| `npm run dev` | Starts the dev server at http://localhost:4321 |
| `npm run build` | Builds the static site into `dist/` |
| `npm run preview` | Serves `dist/` locally |
| `npm run check` | Type checks the project with `astro check` |
| `npm run lint:copy` | Scans the built HTML, `llms.txt`, `llms-full.txt` and the RSS feed for em dashes, en dashes and middle dots |
| `npm run check:redirects` | Confirms every redirect target in `redirects/redirects.csv` exists in `dist/` |
| `npm run verify` | Runs check, build and lint:copy in order |

Copy rule: site copy never uses em dashes, en dashes or middle dots. Write ranges as "2 to 4 weeks" and use commas,
colons or periods as separators. `lint:copy` runs in the deploy workflow and fails the build if it finds any.

## Environment variables

All optional. The defaults are the production values. See `.env.example`.

| Variable | Default | Purpose |
| --- | --- | --- |
| `SITE_URL` | `https://delbuenostudio.com` | Origin the build is served from |
| `BASE_PATH` | `/` | Path prefix the build is served under |
| `PREVIEW` | `false` | When `true`: adds `noindex, nofollow` to every page, serves a `Disallow: /` robots.txt and skips the sitemap |

Canonical URLs, Open Graph URLs and structured data always point at https://delbuenostudio.com, even on the preview.

Every internal link and asset goes through the `url()` helper in `src/lib/url.ts`, which applies the base path.
Links written inside Markdown bodies (for example `[About](/about/)`) are prefixed automatically by
`plugins/satteri-base-links.mjs`.

Example preview build:

```
PREVIEW=true BASE_PATH=/delbueno-web SITE_URL=https://dbottaro-star1.github.io npm run build
```

## Project layout

```
src/
  content.config.ts      Collections: work and journal (glob loaders, files starting with _ are ignored)
  content/work/          Case studies, one Markdown file each
  content/journal/       Journal posts, one Markdown file each. The file name is the URL slug
  assets/work/<slug>/    Case study images, referenced relatively from the Markdown
  assets/journal/<slug>/ Journal images, referenced relatively from the Markdown
  data/                  Services, engagement models and industries
  components/            Nav, Footer, Seo, JsonLd, Faq, Breadcrumbs and cards
  components/home/       Homepage sections (hero, work grid, playground strip, services, engagements, ...)
  components/playground/ Shot card, lightbox and shared shot styles
  layouts/BaseLayout.astro
  lib/                   Site constants, url() helper, JSON-LD builders, llms.txt builders
  scripts/motion.ts      Lenis and GSAP bootstrap, skipped for prefers-reduced-motion
  scripts/shell.ts       Site-wide nav, menu, progress bar, cursor and magnetic buttons
  scripts/loop.ts        The single shared gsap.ticker callback, paused while the tab is hidden
  scripts/home/          Homepage: particles, hero flight, marquees, tilt, flip cards, scroll reveals
  scripts/playground/    Draggable strip, hover/touch video, lightbox and tag filter
  styles/global.css      Design tokens and base styles
  pages/                 Routes
plugins/                 Markdown plugin
redirects/               Cloudflare redirects and the 410 list
scripts/                 Quality gates (lint-copy, check-redirects)
public/                  Static files. Icons are placeholders
```

## Routes

`/`, `/work/`, `/playground/`, `/work/[slug]/`, `/services/`, `/services/[slug]/`, `/engagements/`, `/industries/`,
`/industries/[slug]/`, `/about/`, `/journal/` (12 per page, `/journal/2/` and so on), `/free-ux-audit/`,
`/contact/`, `/careers/`, `/terms/`, `/privacy/`, `/accessibility/`, `404`.

Journal posts are served from the site root as `/[slug]/` so they keep their old WordPress URLs. The slug is the file
name in `src/content/journal/`. The build fails if a post slug equals a built-in route such as `contact`.

Generated files: `/sitemap-index.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/journal/rss.xml`.

## Adding content

Journal post: add `src/content/journal/<old-wordpress-slug>.md` with `title`, `description`, `pubDate`, `category`,
`legacyPath` and optionally `updatedDate`, `author`, `heroImage` and `heroAlt`. Put images in
`src/assets/journal/<slug>/` and reference them relatively, for example `../../assets/journal/<slug>/hero.jpg`.

Case study: add `src/content/work/<slug>.md` with the fields in `src/content.config.ts`. Set `draft: true` to hide it.

A file name that starts with `_` is ignored by both collections.

## Playground shots (Dribbble)

The Playground section reads the `shots` collection. Each shot is one file, `src/content/shots/<dribbble-shot-id>.json`, with its still image in `src/assets/shots/<id>.jpg`. The fields are `title`, `url`, `image`, `imageAlt`, `width`, `height`, `tags`, `featured`, `order`, and optionally `video` and `publishedAt`. See `src/content.config.ts`.

The `video` field is a hotlinked mp4 on `cdn.dribbble.com` for animated shots. The video is not downloaded. If a shot has no `video`, show the still.

The current 23 shots came from the public profile, https://dribbble.com/delbueno-studio. Dribbble blocks scripted access to the shot pages, so no `video` links are set yet. To add one, open the shot in your browser, copy the mp4 address from the player, and add it as `video` in the shot file.

### Automatic sync

`npm run sync:dribbble` pulls new shots from your Dribbble account. It needs a token. Without one it prints help and exits cleanly.

For each new shot it downloads the image and writes the JSON file. For shots already in the repo it only refreshes `order` and fills a missing `video`. It never deletes anything and never changes `featured`, `imageAlt`, `title` or `tags`. New shots start with `featured: false`, and `imageAlt` is only a placeholder, so write a real description of the UI before you merge.

### Create the token (one time, about ten minutes)

Dribbble does not show a ready-made token. You get one through a short sign-in flow.

1. Sign in to Dribbble and open https://dribbble.com/account/applications/new.
2. Register an application. Name: "delbueno website". Website: https://delbuenostudio.com. Callback URL: http://localhost:8787/callback (nothing needs to run there, you only copy a code from the address bar).
3. Open the application and copy its Client ID and Client Secret. Keep the secret private.
4. In your browser, open `https://dribbble.com/oauth/authorize?client_id=YOUR_CLIENT_ID&scope=public` and approve. The browser lands on a localhost page that does not load. Copy the `code` value from its address bar. It expires quickly, so do the next step right away.
5. In your terminal, exchange the code for a token:
   `curl -s -X POST https://dribbble.com/oauth/token -d client_id=YOUR_CLIENT_ID -d client_secret=YOUR_CLIENT_SECRET -d code=THE_CODE`
   The reply contains `access_token`. That is the token.
6. Store it as a GitHub Actions secret named `DRIBBBLE_TOKEN`: run `gh secret set DRIBBBLE_TOKEN --repo dbottaro-star1/delbueno-web` and paste the token when asked, or use Settings, Secrets and variables, Actions, New repository secret.

The `public` scope is read-only, so the token can only read public information. Animated shots come with a WebM video on cdn.dribbble.com, which the sync stores as `video`.

To run it by hand on your computer, use `DRIBBBLE_TOKEN=your_token npm run sync:dribbble`. Do not commit the token.

### The weekly workflow

`.github/workflows/sync-dribbble.yml` runs every Monday and can also be started from the Actions tab (Run workflow). It runs the sync, and if anything changed it pushes the files to a branch called `dribbble-sync` and puts a link in the job summary. Open the pull request from that link yourself (GitHub Actions is not allowed to open pull requests here). New shots only go live when you merge that pull request. If the `DRIBBBLE_TOKEN` secret is missing, the workflow skips itself and shows a notice.

## Structured data

Every page carries Organization, ProfessionalService, founder Person and WebSite JSON-LD. Inner pages add
BreadcrumbList. Journal posts add Article, case studies add CreativeWork, service and industry pages add Service.
The `Faq` component renders a visible FAQ and the matching FAQPage JSON-LD from the same data.

## Deploy

`.github/workflows/deploy.yml` runs on every push to `main`: install, type check, build, copy lint, then publish to
GitHub Pages. It currently builds a noindex preview:

- URL: https://dbottaro-star1.github.io/delbueno-web/
- `PREVIEW=true`, `BASE_PATH=/delbueno-web`, `SITE_URL=https://dbottaro-star1.github.io`

One time setup: in the repository settings, open Pages and set the source to GitHub Actions.

### Switching to the custom domain

1. Add `public/CNAME` containing `delbuenostudio.com`.
2. In `.github/workflows/deploy.yml` set `PREVIEW: 'false'`, `BASE_PATH: /` and `SITE_URL: https://delbuenostudio.com`.
3. In the repository settings, set the custom domain under Pages and enforce HTTPS.
4. Point DNS at GitHub Pages through Cloudflare.
5. Import the redirects and create the 410 rule. See `redirects/README.md`.

Once `PREVIEW` is false, the sitemap is generated and robots.txt welcomes search and AI crawlers (GPTBot,
OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot).
