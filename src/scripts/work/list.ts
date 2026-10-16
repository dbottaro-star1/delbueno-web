/**
 * /work/ choreography: header line reveal, the client name ticker drifting with scroll, and each card opening with
 * a clip-path while its picture settles and then moves inside the frame as you scroll (inner parallax).
 * Hover scale is CSS, so it works without this file.
 */
import { whenMotionReady, type Motion } from '../motion';
import { $, $$, failSafe, revealFade, revealLines, whenFontsReady } from './common';

function init(m: Motion): void {
  const { gsap, ScrollTrigger } = m;

  /* ---------- header ---------- */
  $$('.wk-head [data-split]').forEach((el) => revealLines(m, el, { delay: 0.15, start: 'top 98%' }));
  $$('.wk-head [data-rv]').forEach((el, i) => revealFade(m, el, { delay: 0.3 + i * 0.12, start: 'top 98%' }));

  /* ---------- ticker ---------- */
  const track = $('[data-ticker-track]');
  if (track) {
    gsap.fromTo(
      track,
      { xPercent: 0 },
      {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: { trigger: '[data-ticker]', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      },
    );
  }

  /* ---------- cards ---------- */
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  $$('[data-card]').forEach((card) => {
    const media = $('.wk-card__media', card);
    const par = $('[data-par]', card);
    const cap = $('[data-cap]', card);
    if (!media || !cap) return;

    gsap.set(media, { clipPath: 'inset(100% 0% 0% 0% round 12px)' });
    if (par) gsap.set(par, { scale: 1.3 });
    ScrollTrigger.create({
      trigger: card,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(media, {
          clipPath: 'inset(0% 0% 0% 0% round 12px)',
          duration: 1.4,
          ease: 'expo.out',
          onComplete: () => {
            card.classList.add('is-in');
            gsap.set(media, { clearProps: 'clipPath' });
          },
        });
        if (par) gsap.to(par, { scale: 1, duration: 1.9, ease: 'expo.out' });
        gsap.fromTo(
          cap,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.1, delay: 0.25, ease: 'expo.out', clearProps: 'transform' },
        );
      },
    });

    if (par) {
      gsap.fromTo(
        par,
        { yPercent: -2.8 },
        {
          yPercent: 2.8,
          ease: 'none',
          immediateRender: false,
          scrollTrigger: { trigger: media, start: 'top bottom', end: 'bottom top', scrub: fine ? 0.5 : true },
        },
      );
    }
  });
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
