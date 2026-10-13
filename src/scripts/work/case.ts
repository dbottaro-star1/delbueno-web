/**
 * Case study choreography.
 *  - Hero lines rise, the cover scales up from 86% as it arrives (scrubbed), metrics count up.
 *  - The summary and the client quote light up word by word with scroll.
 *  - Body headings and blocks rise in, gallery pictures open with a clip-path, pairs stagger.
 *  - The next project preview widens to full bleed while its picture drifts inside it.
 * The sticky section index highlights the current section with a plain scroll listener, so it also works for
 * visitors who prefer reduced motion. Everything else only runs when the motion engine is on.
 */
import { SplitText } from 'gsap/SplitText';
import { whenMotionReady, type Motion } from '../motion';
import { $, $$, countUp, failSafe, revealFade, revealLines, revealMedia, whenFontsReady } from './common';

/* ---------- section index: highlight the section being read ---------- */
function initIndex(): void {
  const links = $$<HTMLAnchorElement>('[data-spy]');
  if (!links.length) return;
  const pairs = links
    .map((link) => ({ link, target: document.getElementById(link.dataset.spy ?? '') }))
    .filter((p): p is { link: HTMLAnchorElement; target: HTMLElement } => !!p.target);
  let ticking = false;
  const update = () => {
    ticking = false;
    const line = window.innerHeight * 0.4;
    let active = -1;
    pairs.forEach((p, i) => {
      if (p.target.getBoundingClientRect().top <= line) active = i;
    });
    pairs.forEach((p, i) => {
      if (i === active) p.link.setAttribute('aria-current', 'true');
      else p.link.removeAttribute('aria-current');
    });
  };
  window.addEventListener(
    'scroll',
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    },
    { passive: true },
  );
  window.addEventListener('resize', update);
  update();
}
initIndex();

/* ---------- motion ---------- */
function lightWords({ gsap }: Motion, el: HTMLElement, from = 0.18): void {
  const split = SplitText.create(el, { type: 'words', wordsClass: 'w' });
  gsap.fromTo(
    split.words,
    { opacity: from },
    {
      opacity: 1,
      ease: 'none',
      stagger: 0.1,
      duration: 0.5,
      scrollTrigger: { trigger: el, start: 'top 82%', end: 'bottom 55%', scrub: true },
    },
  );
}

function init(m: Motion): void {
  const { gsap, ScrollTrigger } = m;
  gsap.registerPlugin(SplitText);
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const wide = window.matchMedia('(min-width: 700px)').matches;
  const inHero = (el: Element) => !!el.closest('.cs-hero');

  /* ---------- hero ---------- */
  $$('.cs-hero [data-split]').forEach((el) => revealLines(m, el, { delay: 0.2, start: 'top 98%' }));
  $$('.cs-hero [data-rv]').forEach((el, i) => revealFade(m, el, { delay: 0.1 + i * 0.12, start: 'top 98%' }));

  /* ---------- cover stage: scale on scroll ---------- */
  const stage = $('[data-stage]');
  const frame = $('[data-frame]');
  if (stage && frame) {
    const st = { trigger: stage, start: 'top 92%', end: 'top 30%', scrub: true };
    gsap.fromTo(frame, { scale: 0.86 }, { scale: 1, ease: 'none', scrollTrigger: st });
    const img = $('[data-frame-img]', frame);
    if (img) gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: st });
    const amb = $('[data-amb]', stage);
    if (amb) gsap.fromTo(amb, { opacity: 0 }, { opacity: 1, ease: 'none', scrollTrigger: st });
  }

  /* ---------- results: count up ---------- */
  $$('[data-metric]').forEach((mt, i) => {
    const num = $('[data-count]', mt);
    if (num) countUp(m, num, i * 0.12);
    gsap.fromTo(
      mt,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        delay: i * 0.1,
        ease: 'expo.out',
        clearProps: 'transform',
        scrollTrigger: { trigger: mt, start: 'top 92%', once: true },
      },
    );
  });

  /* ---------- summary and quote: words light up ---------- */
  const words = $('[data-words]');
  if (words) lightWords(m, words);
  const quote = $('[data-quote]');
  if (quote) lightWords(m, quote, 0.2);

  /* ---------- body ---------- */
  $$('.cs-prose > h2').forEach((h) => revealLines(m, h, { start: 'top 88%' }));
  const blocks = $$('.cs-prose > :not(h2)');
  if (blocks.length) {
    ScrollTrigger.batch(blocks, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) =>
        gsap.fromTo(
          batch,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            stagger: 0.08,
            ease: 'expo.out',
            clearProps: 'transform',
            overwrite: true,
          },
        ),
    });
  }
  const idx = $('[data-index]');
  if (idx)
    gsap.fromTo(
      idx,
      { opacity: 0, x: -16 },
      {
        opacity: 1,
        x: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: { trigger: idx, start: 'top 88%', once: true },
      },
    );

  /* ---------- gallery ---------- */
  $$('[data-fig]').forEach((fig) => {
    const box = $('[data-box]', fig);
    if (box) revealMedia(m, box, $('img', box));
  });
  $$('[data-row]').forEach((row) => {
    if (row.classList.contains('cs-row--full')) {
      const fig = $('[data-fig]', row);
      if (fig) {
        gsap.fromTo(
          fig,
          { scale: 0.92 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: row, start: 'top 92%', end: 'top 35%', scrub: true } },
        );
      }
    } else if (wide) {
      const second = $$('[data-fig]', row)[1];
      if (second) {
        gsap.fromTo(
          second,
          { y: 48 },
          { y: 0, ease: 'none', scrollTrigger: { trigger: row, start: 'top 95%', end: 'center 55%', scrub: true } },
        );
      }
    }
  });

  /* ---------- next project ---------- */
  const nextMedia = $('[data-next-media]');
  if (nextMedia) {
    gsap.fromTo(
      nextMedia,
      { clipPath: 'inset(0% 16% 0% 16% round 14px)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0px)',
        ease: 'none',
        scrollTrigger: { trigger: nextMedia, start: 'top 92%', end: 'top 25%', scrub: true },
      },
    );
    const par = $('[data-next-par]', nextMedia);
    if (par) {
      gsap.fromTo(
        par,
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: 'none',
          scrollTrigger: { trigger: nextMedia, start: 'top bottom', end: 'bottom top', scrub: fine ? 0.5 : true },
        },
      );
    }
  }

  /* ---------- closing section and any other headings or fades ---------- */
  $$('[data-split]')
    .filter((el) => !inHero(el))
    .forEach((el) => revealLines(m, el));
  $$('[data-rv]')
    .filter((el) => !inHero(el) && !el.closest('[data-metric]'))
    .forEach((el) => revealFade(m, el));
}

whenMotionReady((m) => {
  whenFontsReady(() => {
    try {
      init(m);
      m.ScrollTrigger.refresh();
      window.addEventListener('load', () => m.ScrollTrigger.refresh());
    } catch (error) {
      failSafe(error);
    }
  });
});
