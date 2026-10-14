# delbueno™ Studio website

Production site for [delbuenostudio.com](https://delbuenostudio.com), replacing the old WordPress build.
Built with Astro 7 (static output), TypeScript, GSAP and Lenis. Content lives in Markdown in this repository.

## Requirements

- Node 24 (see `.nvmrc`). With nvm, run `nvm use`.
- npm

## Commands

| Command                                   | What it does                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm install`                             | Installs dependencies                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `npm run dev`                             | Starts the dev server at http://localhost:4321                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `npm run build`                           | Builds the static site into `dist/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `npm run preview`                         | Serves `dist/` locally                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `npm run check`                           | Type checks the project with `astro check`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `npm run lint:copy`                       | Scans the built HTML, `llms.txt`, `llms-full.txt` and the RSS feed for em dashes, en dashes and middle dots                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `npm run check:redirects`                 | Confirms every redirect target in `redirects/redirects.csv` and `redirects/es-subdomain.csv` exists in `dist/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `npm run check:csp`                       | Checks `dist/` against `security/csp.json`: inline script hashes, no inline styles, the CSP meta tag, and that `docs/security/cloudflare.md` quotes the same policy                                                                                                                                                                                                                                                                                                                                                                                                           |
| `npm run check:seo`                       | Parses `dist/` and fails on a title over 65 characters, a description outside 70 to 165, duplicate titles or descriptions, a missing canonical or `og:image`, a relative `og:image`, an `h1` count other than 1, or a JSON-LD block that does not parse. It also checks `<html lang>` and `og:locale` against the page's language, that `hreflang` alternates are complete, reciprocal and point at real pages, and holds Spanish pages to the authoring targets (title up to 60, description 140 to 155). Add `--report` to list every title and description with its length |
| `npm run build:icons`                     | Regenerates the favicon, app icons, manifest and logo in `public/` from `src/assets/brand/mark.svg`                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `npm run lint`                            | ESLint (Astro, TypeScript, accessibility rules; bans `innerHTML` and `set:html`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `npm run format` / `npm run format:check` | Prettier, write or check only                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `npm run verify`                          | Runs lint, format:check, check, build, lint:copy, check:redirects, check:csp and check:seo in order                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |

Copy rule: site copy never uses em dashes, en dashes or middle dots. Write ranges as "2 to 4 weeks" and use commas,
colons or periods as separators. `lint:copy` runs in the deploy workflow and fails the build if it finds any.

## Environment variables

All optional. The defaults are the production values. See `.env.example`.

| Variable    | Default                      | Purpose                                                                                                      |
| ----------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `SITE_URL`  | `https://delbuenostudio.com` | Origin the build is served from                                                                              |
| `BASE_PATH` | `/`                          | Path prefix the build is served under                                                                        |
| `PREVIEW`   | `false`                      | When `true`: adds `noindex, nofollow` to every page, serves a `Disallow: /` robots.txt and skips the sitemap |

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
  content.config.ts      Collections: work, workEs, journal and shots (glob loaders, files starting with _ are ignored)
  content/work/          Case studies, one Markdown file each
  content/work-es/       The Spanish case studies, same fields plus `translationOf`
  i18n/                  Languages: URL map (routes.ts), UI strings (en.ts, es.ts, t() helper), per-page copy (pages/)
  views/                 One view per page, shared by the English and Spanish routes (they take a `lang` prop)
  content/journal/       Journal posts, one Markdown file each. The file name is the URL slug
  assets/work/<slug>/    Case study images, referenced relatively from the Markdown
  assets/journal/<slug>/ Journal images, referenced relatively from the Markdown
  data/                  Services, engagement models, industries and testimonials, with Spanish copy in *.es.ts next to them
  components/            Nav, Footer, Seo, JsonLd, Faq, Breadcrumbs and cards
  components/home/       Homepage sections (hero, work grid, playground strip, services, engagements, ...)
  components/playground/ Shot card, lightbox and shared shot styles
  layouts/BaseLayout.astro
  assets/brand/mark.svg  The source of the favicon and every app icon (see Brand icons)
  lib/                   Site constants, url() helper, JSON-LD builders, llms.txt builders, social card renderer (og.ts, og-render.ts)
  scripts/motion.ts      Lenis and GSAP bootstrap, skipped for prefers-reduced-motion
  scripts/shell.ts       Site-wide nav, menu, progress bar, cursor and magnetic buttons
  scripts/loop.ts        The single shared gsap.ticker callback, paused while the tab is hidden
  scripts/home/          Homepage: particles, hero flight, marquees, tilt, flip cards, scroll reveals
  scripts/playground/    Draggable strip, hover/touch video, lightbox and tag filter
  styles/global.css      Design tokens and base styles
  styles/es.css          Type adjustments for Spanish, scoped to html[lang='es']
  pages/                 Routes. English at the root, Spanish in pages/es/. Each page file renders a view
plugins/                 Markdown plugins (base-path links, content guard that fails the build on raw HTML and unsafe URLs)
security/                csp.json: the one source for the Content-Security-Policy (meta tag, Cloudflare header, CI check)
redirects/               Cloudflare redirects and the 410 list
scripts/                 Node tools: quality gates (lint-copy, check-redirects, check-csp, check-seo), build-icons and the Dribbble sync
public/                  Static files. The icons are generated by `npm run build:icons`
```

## Routes

`/`, `/work/`, `/playground/`, `/work/[slug]/`, `/services/`, `/services/[slug]/`, `/engagements/`, `/industries/`,
`/industries/[slug]/`, `/about/`, `/journal/` (12 per page, `/journal/2/` and so on), `/free-ux-audit/`,
`/contact/`, `/careers/`, `/terms/`, `/privacy/`, `/accessibility/`, `404`.

Spanish, under `/es/`: `/es/`, `/es/trabajo/`, `/es/trabajo/[slug]/`, `/es/playground/`, `/es/servicios/`,
`/es/servicios/[slug]/` (`estrategia-de-producto`, `diseno-de-producto`, `diseno-web`, `desarrollo-de-mvp`),
`/es/modelos-de-trabajo/`, `/es/industrias/`, `/es/industrias/[slug]/` (`nube`, `ciberseguridad`, `devops`, `ia`,
`fintech`), `/es/nosotros/`, `/es/blog/`, `/es/auditoria-ux-gratis/`, `/es/contacto/`, `/es/trabaja-con-nosotros/`,
`/es/terminos/`, `/es/privacidad/`, `/es/accesibilidad/`, `/es/404/`.

Journal posts are served from the site root as `/[slug]/` so they keep their old WordPress URLs. The slug is the file
name in `src/content/journal/`. The build fails if a post slug equals a built-in route such as `contact`.

Generated files: `/sitemap-index.xml` (with `hreflang` alternates), `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/es/llms.txt`, `/es/llms-full.txt`, `/journal/rss.xml`, `/og-default.png` and one social card per page without a hero image under `/og/`.

## Languages

The site is published in English (the root) and Spanish (`/es/`, neutral Latin American Spanish with "tú"). There is no
automatic redirect by IP or browser language, because it hurts search and misfires. Instead:

- A switcher (EN / ES) in the header, the mobile menu and the footer links to the same page in the other language, or to
  the other language's home when the page has no twin (journal posts go to `/es/blog/`).
- A small banner, written in the language it suggests, appears when `navigator.languages` prefers the other language.
  The choice (accept, stay, or using the switcher) is kept in `localStorage` under `delbueno-lang`, and the banner never
  returns. It is a bundled module (`src/scripts/lang.ts`), not an inline script, so the CSP is untouched.

**URLs.** One table, `src/i18n/routes.ts`, maps every English path to its Spanish one (`/work/` to `/es/trabajo/`,
`/services/product-design/` to `/es/servicios/diseno-de-producto/`, and so on). Links, the language switcher, `hreflang`
alternates, the sitemap alternates and the social card names all come from it. To add a page, add it to the table and to
`src/pages/es/`.

**Strings.** Interface strings live in `src/i18n/en.ts` and `src/i18n/es.ts` with typed keys (`t(lang, 'cta.book')`, or
`const t = translator(lang)` in a component). The Spanish file has the same shape as the English one, so a missing key
fails `npm run check`. Long copy that belongs to one page is in `src/i18n/pages/<page>.ts` as `{ en, es }`. Services,
industries, engagements, testimonials and shot alt text keep their Spanish next to the English (`services.es.ts`,
`industries.es.ts`, ...). Legal pages are data written with a tiny inline markup (`**bold**` and `[label](key)`).

**Components** take a `lang` prop. `BaseLayout` sets `<html lang>`, the `hreflang` alternates, `og:locale` and the
language of the JSON-LD.

**Case studies.** Add `src/content/work-es/<slug>.md` with the same fields as the English file plus
`translationOf: "<slug>"`. The build fails if a published English case study has no Spanish twin, or the reverse.

**Journal.** Posts are English only. `/es/blog/` lists them in Spanish UI with an "En inglés" tag. The author and the
posts keep their root URLs.

**Testimonials** are quotes from real people. The Spanish versions are translations and are marked "Traducido del inglés".

**Machine files.** `/es/llms.txt` and `/es/llms-full.txt`. Social cards for Spanish pages are generated with the English
ones from `src/lib/og.ts` (`/og/es-*.png`).

GitHub Pages serves a single `404.html` (English). A missing address under `/es/` is handed to `/es/404/` by a small
bundled script on that page.

The old Spanish subdomain is covered in `redirects/README.md`.

## Adding content

Journal post: add `src/content/journal/<old-wordpress-slug>.md` with `title`, `description`, `pubDate`, `category`,
`legacyPath` and optionally `seoTitle`, `updatedDate`, `author`, `heroImage` and `heroAlt`. Put images in
`src/assets/journal/<slug>/` and reference them relatively, for example `../../assets/journal/<slug>/hero.jpg`.

Case study: add `src/content/work/<slug>.md` with the fields in `src/content.config.ts`. Set `draft: true` to hide it.

A file name that starts with `_` is ignored by both collections.

## Titles, descriptions and social images

`title` is the headline and the page `h1`. `seoTitle` (optional, on journal posts and case studies) is what goes in the
browser tab, search results and social cards. Write it to 60 characters or fewer, or 49 or fewer if you want the
` | delbueno` suffix, which `Seo.astro` adds only when the whole title still fits in 60 characters. Without a
`seoTitle`, the `title` is used. `description` is the meta description: 140 to 155 characters, unique on the site.
Case studies fall back to `summary` when they have no `description`, but `summary` is usually too long.

Static pages set their title and description where they are defined: the `title` and `description` props of
`BaseLayout`. Services and industries keep a `seoDescription` in `src/data/`. `npm run check:seo` is the gate.

Every page gets a 1200 by 630 social image. Posts and case studies use their hero or cover. Every other page gets a
branded card (dark canvas, grain, the title in Syne 800, the wordmark, a violet to lime rule) that is drawn at build time
by `src/lib/og-render.ts` (satori and @resvg/resvg-js, dev dependencies) and served from `/og/<name>.png`. The list of
cards and their text is `src/lib/og.ts`. To add a card for a new page, add it to the `STATIC` list there. The fallback
is `/og-default.png`, drawn the same way.

## Brand icons

The favicon, app icons, web manifest and the logo used in structured data are all generated from one file:
`src/assets/brand/mark.svg`. It is the "db" monogram: lowercase d and b in Syne 800 sharing one stem, off-white
`#F2F2F5` on `#0A0A0F`, with a lime `#BAFB44` dot where the ™ sits in the wordmark. The letters are outlines, so it needs
no font.

To use your own mark:

1. Export a square SVG (a 512 by 512 viewBox works well) with text converted to outlines, and save it over
   `src/assets/brand/mark.svg`. The file is copied as is to `public/favicon.svg`, so any `prefers-color-scheme`
   rules you put inside it work in the browser tab. The current file shows a dark tile in light browsers and drops the
   tile in dark ones.
2. Run `npm run build:icons`. It writes `favicon.svg`, `favicon.ico` (16, 32 and 48 px), `apple-touch-icon.png`,
   `icon-192.png`, `icon-512.png`, `icon-maskable-512.png`, `logo.png` and `site.webmanifest` into `public/`.
3. Commit the files in `public/`.

The PNGs are drawn without `prefers-color-scheme`, so they show the default styling of the SVG. The apple-touch and
maskable icons put the mark on `#0A0A0F` (the theme color at the top of the script). Change `THEME` and `MASKABLE_SCALE`
in `scripts/build-icons.mjs` if the new mark needs a different background or more room.

## Playground shots (Dribbble)

The Playground section reads the `shots` collection. Each shot is one file, `src/content/shots/<dribbble-shot-id>.json`, with its still image in `src/assets/shots/<id>.jpg`. The fields are `title`, `url`, `image`, `imageAlt`, `width`, `height`, `tags`, `featured`, `order`, and optionally `video` and `publishedAt`. See `src/content.config.ts`.

The `video` field is a hotlinked mp4 on `cdn.dribbble.com` for animated shots. The video is not downloaded. If a shot has no `video`, show the still.

The current 23 shots came from the public profile, https://dribbble.com/delbueno-studio.

### Adding motion to a shot

Dribbble's API only returns still images, even for animated shots, so the motion comes from your original exports. Run:

`npm run shot:video -- <dribbble-shot-id> "<path to your .mp4 or .mov export>"`

It re-encodes the clip into a small silent MP4 (at most 1600 px wide) at `public/shots/<id>.mp4` and sets `"video": "shots/<id>.mp4"` in the shot file. Keep loops short (5 to 15 seconds). It needs ffmpeg (`brew install ffmpeg`). The shot id is the number in the Dribbble URL.

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

The branch is never force-pushed. If `dribbble-sync` already has commits that are not on `main` (an open review, maybe with your edits to `imageAlt` or `featured`), the next run adds a commit on top of it. If `main` cannot be merged into the branch cleanly, the run uses a new branch called `dribbble-sync-<date>` instead and the job summary says so.

**Run CI on the branch.** Pushes made by a workflow with the built-in token do not start other workflows, so the pull request shows no checks until you run them: open the Actions tab, choose CI in the left list, press Run workflow, pick the `dribbble-sync` branch (or the dated one), and run it. The result attaches to the branch head, so the pull request gets its checks. Closing and reopening the pull request also starts CI.

## Structured data

Every page carries Organization, ProfessionalService, founder Person and WebSite JSON-LD (the Organization has a logo
and the WebSite names it as publisher). Inner pages add BreadcrumbList. Journal posts add Article (with `dateModified`,
an `image` with width and height, `wordCount`, `inLanguage`, and the author with `sameAs`), case studies add
CreativeWork, service and industry pages add Service. The sitemap carries a `lastmod` for every URL: the post's
`updatedDate` or `pubDate`, and the build date for other pages.
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
