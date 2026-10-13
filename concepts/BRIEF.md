# Homepage concept brief — delbueno™ Studio

Goal: 3 distinct homepage concepts, built as working prototypes with real motion, so Dani (owner, senior product designer) can pick a direction. The bar: it must sit next to lazarev.agency, flexxi.studio, awestudio.agency, tubikstudio.com and feel *at least* as premium. These are design leads judging — generic "AI template" aesthetics (purple gradient blobs everywhere, glassmorphism cards, emoji icons, centered-everything) are a fail.

## Tech (every concept)
- One self-contained file: `concepts/<letter>/index.html` (inline CSS + JS). No build step.
- **GSAP 3.13.0** from cdnjs (`gsap.min.js`, `ScrollTrigger.min.js`, `SplitText.min.js` — SplitText is free since 3.13) and **Lenis 1.1.13** from unpkg (`https://unpkg.com/lenis@1.1.13/dist/lenis.min.js`). Verify each URL returns 200 with curl before relying on it. Wire Lenis to ScrollTrigger (`lenis.on('scroll', ScrollTrigger.update)`, gsap.ticker drives `lenis.raf`).
- Fonts from Google Fonts. Brand continuity: the current display face is **Syne**; you may keep it, or pick a stronger display face if the concept calls for it — justify in a comment at top of file. Body: a clean grotesk (e.g. Geist, Inter Tight, Manrope). No Kanit.
- Animate only transform/opacity/clip-path/filter. No layout thrash. Target 60fps.
- `prefers-reduced-motion: reduce` → content fully visible, no scroll-jacking, no smooth scroll.
- Content must be in the HTML (not injected by JS) — the real site is SEO/AI-search first. Set initial hidden states via a `.js` class on `<html>` so no-JS still shows everything.
- Responsive: looks intentional at 1440, 1024, 390 px wide. No horizontal page scroll at 390.
- Images: hotlink from `https://delbuenostudio.com/wp-content/uploads/...` (paths below). They are modest resolution — present them in frames/device-free cards with `object-fit: cover`, never stretched beyond ~900px wide.
- Semantic HTML: one `<h1>`, sections with `<h2>`, nav in `<nav>`, links real `<a>`.

## Brand
- Wordmark: lowercase **delbueno™** (set it in type; no logo file needed). Name forms: "delbueno™ Studio" first mention, then "delbueno".
- Current palette (evolve, don't discard): violet **#3F29D8**, lime **#BAFB44**, lavender #E9E5FF, black, off-white #F7F7FA. Each concept may re-balance these (e.g. lime as a rare spark, violet deepened), but delbueno should still be recognizable.
- Voice: confident, specific, no superlatives ("best", "#1", "top 1%" are banned). Numbers over adjectives.

## Content (use this copy; you may tighten, not invent new claims or numbers)

**Nav:** Work · Services · Engagements · Journal · About · CTA **Book a call** → https://app.lemcal.com/@delbuenostudio/15-minutes

**Hero**
- H1 must contain, in plain words, what we are (for AI search): *Product design & development studio for B2B SaaS and startups.* It can be the eyebrow-sized H1 under/over a bigger display line, or the display line itself. Concept-specific display line given per concept.
- Sub: "delbueno™ Studio designs and builds products, websites and design systems for B2B SaaS teams and ambitious startups. Kickoff today. First concepts in 48 hours."
- CTAs: **Book a call** (primary) · **See the work** (secondary, #work)

**Trusted by** (text wordmarks or logo images): BigID · JFrog · NetApp · Palo Alto Networks · Uleadz — logo PNGs (small, dark-on-transparent): `/wp-content/uploads/2023/05/bigid-logo.png`, `jfrog-logo.png`, `netapp-logo-.png`, `palo-alto-logo.png`, `uleadz-logo.png`. If they look poor, set the names in type instead.

**Selected work** (H2 e.g. "Selected work") — 6 cases, each: client, what, one metric, image
1. CloudGuardia — Cloud security SaaS · UX/UI & design system — **+42%** user satisfaction — `/wp-content/uploads/2025/11/1-Cloudguardia-Dashboard.png`
2. Flapz — Private-jet marketplace, LATAM · Website design & build — **+62%** organic conversion — `/wp-content/uploads/2024/02/Flapz-Home.png`
3. Buzz Bunny — AI investing app · Mobile app design — **47%** adoption at beta, 1,000 users in 2 weeks — `/wp-content/uploads/2025/11/Buzz-Bunny-2.jpg`
4. Toyota Uruguay — RAV4 Hybrid launch page · Interactive landing — **+64%** engagement — `/wp-content/uploads/2026/03/Toyota-1.jpg` (video available: `/wp-content/uploads/2026/03/Animation-Toyota-web.mp4`, 15 MB — only load on hover/in-view, `preload="none"`, muted, loop, playsinline)
5. Shay — LATAM loyalty app · Mobile app — **+37%** customer retention — `/wp-content/uploads/2026/03/Shay-1.jpg`
6. Uleadz — Field-service SaaS · Product & website UX — **+27%** conversion — `/wp-content/uploads/2025/11/2-Uleadz-app.png`
CTA: "All case studies"

**Services** (H2 e.g. "What we do")
01 **Product Strategy** — Research, product audits, usability testing and roadmaps. Decide what to build before you build it.
02 **Product Design** — UX/UI for web and mobile, and design systems that cut dev rework by ~30%.
03 **Websites & Brand** — Marketing sites, motion and launch assets built to convert.
04 **Build** — No/low-code MVPs, automations and internal tools, production-ready in weeks.

**Speed / process** (H2 e.g. "Kickoff today. Concepts in 48 hours.")
- **Today** — Strategic kickoff. One focused call to align on goals and scope; we start the moment we hang up.
- **Within 24h** — Your portal goes live. A dedicated Notion workspace with your backlog, plus a shared Slack channel. No email chains.
- **48h later** — First high-fidelity concepts. No waiting weeks for a big reveal.

**Numbers:** 10+ years designing digital products · 58+ products shipped · 85% of clients come back for more · 4.9★ on Clutch

**Testimonial** (featured): "Our company had a super challenging project and we were looking for a super sharp and innovative UX/UI designer, and I am happy we found Dani and the team at delbueno. He is the best expression of what it means to be a UI and UX designer, combining these two perfectly by giving the logical and analytical approach that every pixel-perfect design needs." — **Yaron S.**, Managing Director, Type5 VC
Secondary (optional): "Working with delbueno™ Studio was a delight from start to finish. They seamlessly captured our brand essence in the design, and the user experience they crafted for our mobile app exceeded all expectations." — **Ionatan G.**, CEO & Co-Founder, Flapz

**Engagements** (H2 e.g. "Three ways to work with us") — no prices
- **Launch Sprint** — Fixed scope, flat fee, 2–4 weeks. For MVPs, redesigns and new modules with a guaranteed budget and timeline.
- **Design Partner** — A monthly subscription. Unlimited requests, one at a time, each delivered in 24–48h. For roadmaps that move every week.
- **Designer on Demand** — A dedicated delbueno designer embedded in your Slack and Figma, part-time or full-time. Pause anytime.
Line: "Many clients ship an MVP in a Launch Sprint, then roll into Design Partner."

**Final CTA** (H2): "Let's build something people get instantly." → Book a call · or hello@delbuenostudio.com

**Footer:** delbueno™ Studio · Punta del Este, Uruguay — remote-first, synced with US hours · hello@delbuenostudio.com · LinkedIn https://www.linkedin.com/company/delbueno-studio/ · Dribbble https://dribbble.com/delbueno-studio · Instagram https://www.instagram.com/delbuenostudio/ · Clutch https://clutch.co/profile/delbueno-studio · © 2026

## Done = 
- File opens via a local static server with zero console errors.
- Every section above present, in a sensible order for the concept.
- At least: (1) a signature hero moment, (2) split-line/word text reveals, (3) image clip/scale reveals, (4) one pinned/scrubbed scroll scene, (5) hover micro-interactions on work + CTAs (magnetic or similar), (6) a polished mobile layout.
- Report back: the concept's one-sentence idea, fonts/colors chosen, the list of motion moments, and anything you couldn't do.
