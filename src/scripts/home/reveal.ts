/**
 * Scroll choreography for the homepage below the hero: line reveals, fades, work card captions, stacking service
 * panels, the speed rail, count-up numbers, the scroll-lit testimonial and the engagement cards rising in.
 */
import { SplitText } from 'gsap/SplitText';
import type { Motion } from '../motion';

const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => c.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => Array.from(c.querySelectorAll<T>(s));

export function initReveals({ gsap, ScrollTrigger }: Motion, opts: { flight: boolean }): void {
  gsap.registerPlugin(SplitText);

  /* ---------- text line reveals ---------- */
  $$('[data-split]').forEach((el) => {
    const inPanel = el.closest('.svc');
    const trigger = inPanel || el;
    const start = inPanel ? 'top 62%' : 'top 86%';
    SplitText.create(el, {
      type: 'lines',
      mask: 'lines',
      linesClass: 'ln',
      autoSplit: true,
      onSplit(self) {
        gsap.set(el, { opacity: 1 });
        return gsap.fromTo(
          self.lines,
          { yPercent: 118 },
          { yPercent: 0, duration: 1.3, stagger: 0.09, ease: 'expo.out', scrollTrigger: { trigger, start, once: true } },
        );
      },
    });
  });
  gsap.fromTo(
    '.final .hl-i',
    { yPercent: 118 },
    { yPercent: 0, duration: 1.4, stagger: 0.1, ease: 'expo.out', scrollTrigger: { trigger: '.final .h2', start: 'top 82%', once: true } },
  );
  $$('[data-rv]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 44 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } },
    );
  });

  /* ---------- work cards: caption reveal, and clip/scale reveal when the screens do not fly ---------- */
  $$('.wc').forEach((card) => {
    const media = $('.wc__media', card)!;
    const cap = $('.wc__cap', card)!;
    const img = $('img', media);
    gsap.set(cap, { opacity: 0, y: 24 });
    if (!opts.flight) {
      gsap.set(media, { clipPath: 'inset(100% 0% 0% 0% round 12px)' });
      if (img) gsap.set(img, { scale: 1.3 });
    }
    ScrollTrigger.create({
      trigger: card,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        gsap.to(cap, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', delay: opts.flight ? 0.1 : 0.15 });
        if (!opts.flight) {
          gsap.to(media, {
            clipPath: 'inset(0% 0% 0% 0% round 12px)',
            duration: 1.3,
            ease: 'expo.out',
            onComplete: () => gsap.set(media, { clearProps: 'clipPath' }),
          });
          if (img) gsap.to(img, { scale: 1, duration: 1.8, ease: 'expo.out' });
        }
      },
    });
  });

  /* ---------- services: stacking sticky panels ---------- */
  const panels = $$('.svc');
  panels.forEach((p, i) => {
    const next = panels[i + 1];
    if (!next) return;
    const trig = { trigger: next, start: 'top bottom', end: 'top top', scrub: true };
    gsap.to(p, { scale: 0.93, ease: 'none', scrollTrigger: trig });
    gsap.to($('.svc-dim', p), { opacity: 0.68, ease: 'none', scrollTrigger: trig });
  });
  $$('.svc-art').forEach((a) =>
    gsap.fromTo(
      a,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.4, ease: 'expo.out', scrollTrigger: { trigger: a.closest('.svc'), start: 'top 55%', once: true } },
    ),
  );

  /* ---------- speed: line draws with scroll ---------- */
  const fill = $('#railFill');
  const steps = $$('.step');
  const stepsEl = $('#steps');
  if (fill && stepsEl) {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 861px)', () => {
      gsap.set(fill, { scaleX: 0, scaleY: 1, transformOrigin: 'left center' });
      ScrollTrigger.create({
        trigger: stepsEl,
        start: 'top 72%',
        end: 'top 22%',
        scrub: true,
        onUpdate(self) {
          gsap.set(fill, { scaleX: self.progress });
          const w = stepsEl.offsetWidth;
          steps.forEach((s) => s.classList.toggle('is-on', self.progress * w >= s.offsetLeft - 1));
        },
      });
      return () => steps.forEach((s) => s.classList.remove('is-on'));
    });
    mm.add('(max-width: 860px)', () => {
      gsap.set(fill, { scaleY: 0, scaleX: 1, transformOrigin: 'top center' });
      ScrollTrigger.create({
        trigger: stepsEl,
        start: 'top 70%',
        end: 'bottom 62%',
        scrub: true,
        onUpdate(self) {
          gsap.set(fill, { scaleY: self.progress });
          const h = stepsEl.offsetHeight;
          steps.forEach((s) => s.classList.toggle('is-on', self.progress * h >= s.offsetTop - 4));
        },
      });
      return () => steps.forEach((s) => s.classList.remove('is-on'));
    });
  }

  /* ---------- numbers: count up on enter ---------- */
  $$('[data-count]').forEach((el) => {
    const to = parseFloat(el.dataset.count ?? '0');
    const dec = parseInt(el.dataset.dec || '0', 10);
    const o = { v: 0 };
    el.textContent = (0).toFixed(dec);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(o, { v: to, duration: 2.4, ease: 'power4.out', onUpdate: () => (el.textContent = o.v.toFixed(dec)) }),
    });
  });

  /* ---------- testimonial: words light up with scroll ---------- */
  const q = $('#quoteText');
  if (q) {
    const qs = SplitText.create(q, { type: 'words', wordsClass: 'w' });
    gsap.fromTo(
      qs.words,
      { opacity: 0.2 },
      { opacity: 1, ease: 'none', stagger: 0.12, duration: 0.5, scrollTrigger: { trigger: q, start: 'top 78%', end: 'bottom 52%', scrub: true } },
    );
  }

  /* ---------- engagements: cards rise in (the flip itself is CSS, or a tap on touch) ---------- */
  gsap.fromTo(
    '.flip',
    { opacity: 0, y: 90 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12, clearProps: 'transform', scrollTrigger: { trigger: '#flipGrid', start: 'top 86%', once: true } },
  );
}
