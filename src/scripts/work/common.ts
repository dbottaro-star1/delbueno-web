/** Small helpers shared by the /work/ scripts: line reveals, fades, count-up and a safety net for failures. */
import { SplitText } from 'gsap/SplitText';
import type { Motion } from '../motion';

export const $ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) => c.querySelector<T>(s);
export const $$ = <T extends Element = HTMLElement>(s: string, c: ParentNode = document) =>
  Array.from(c.querySelectorAll<T>(s));

/** Run once fonts are ready (SplitText must measure the final glyphs), or after a timeout. */
export function whenFontsReady(run: () => void): void {
  let done = false;
  const go = () => {
    if (done) return;
    done = true;
    run();
  };
  (document.fonts?.ready ?? Promise.resolve()).then(go);
  window.setTimeout(go, 2500);
}

/** Never leave content hidden if something below throws. */
export function failSafe(error: unknown): void {
  console.error('Work page motion failed', error);
  document.documentElement.classList.remove('js');
}

interface RevealOpts {
  delay?: number;
  start?: string;
}

/** Masked line-by-line rise for headings marked [data-split]. */
export function revealLines(
  { gsap }: Motion,
  el: HTMLElement,
  { delay = 0, start = 'top 88%' }: RevealOpts = {},
): void {
  gsap.registerPlugin(SplitText);
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
        {
          yPercent: 0,
          duration: 1.3,
          stagger: 0.09,
          delay,
          ease: 'expo.out',
          scrollTrigger: { trigger: el, start, once: true },
        },
      );
    },
  });
}

/** Fade and lift for elements marked [data-rv]. */
export function revealFade({ gsap }: Motion, el: HTMLElement, { delay = 0, start = 'top 90%' }: RevealOpts = {}): void {
  gsap.fromTo(
    el,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1.2, delay, ease: 'expo.out', scrollTrigger: { trigger: el, start, once: true } },
  );
}

/** Count a number up from zero when it scrolls into view. Its final value stays in the HTML. */
export function countUp({ gsap, ScrollTrigger }: Motion, el: HTMLElement, delay = 0): void {
  const to = parseFloat(el.dataset.count ?? '0');
  const dec = parseInt(el.dataset.dec || '0', 10);
  const comma = el.dataset.comma === '1';
  const fmt = (v: number) =>
    comma || v >= 1000
      ? v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec })
      : v.toFixed(dec);
  const o = { v: 0 };
  el.textContent = fmt(0);
  ScrollTrigger.create({
    trigger: el,
    start: 'top 92%',
    once: true,
    onEnter: () =>
      gsap.to(o, {
        v: to,
        duration: 2.2,
        delay,
        ease: 'power4.out',
        onUpdate: () => (el.textContent = fmt(o.v)),
        onComplete: () => (el.textContent = fmt(to)),
      }),
  });
}

/** Clip-path reveal with a settling image, for a media frame holding a [data-par] or img layer. */
export function revealMedia(
  { gsap, ScrollTrigger }: Motion,
  media: HTMLElement,
  inner: HTMLElement | null,
  radius = 12,
): void {
  const hidden = `inset(100% 0% 0% 0% round ${radius}px)`;
  const shown = `inset(0% 0% 0% 0% round ${radius}px)`;
  gsap.set(media, { clipPath: hidden });
  if (inner) gsap.set(inner, { scale: 1.3 });
  ScrollTrigger.create({
    trigger: media,
    start: 'top 90%',
    once: true,
    onEnter: () => {
      gsap.to(media, {
        clipPath: shown,
        duration: 1.3,
        ease: 'expo.out',
        onComplete: () => {
          media.classList.add('is-in');
          gsap.set(media, { clearProps: 'clipPath' });
        },
      });
      if (inner) gsap.to(inner, { scale: 1, duration: 1.8, ease: 'expo.out' });
    },
  });
}
