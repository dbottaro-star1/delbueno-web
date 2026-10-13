/**
 * Motion bootstrap. Sets up Lenis smooth scroll and GSAP ScrollTrigger exactly once,
 * and does nothing at all for visitors who prefer reduced motion.
 *
 * BaseLayout calls initMotion() on every page. Page scripts that need GSAP import
 * whenMotionReady() and run only after the engine exists:
 *
 *   import { whenMotionReady } from '../scripts/motion';
 *   whenMotionReady(({ gsap, ScrollTrigger }) => { ... });
 */
import type Lenis from 'lenis';
import type { gsap as Gsap } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';

export interface Motion {
  gsap: typeof Gsap;
  ScrollTrigger: typeof ScrollTriggerType;
  lenis: Lenis;
}

const REDUCED_QUERY = '(prefers-reduced-motion: reduce)';

let motion: Motion | null = null;
let starting: Promise<Motion | null> | null = null;
let tickerFn: ((time: number) => void) | null = null;
let watching = false;
const waiting = new Set<(m: Motion) => void>();

export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia(REDUCED_QUERY).matches;
}

/** The running engine, or null when motion is off or not started yet. */
export function getMotion(): Motion | null {
  return motion;
}

/** Start Lenis and GSAP once. Safe to call repeatedly. Resolves to null for reduced motion. */
export function initMotion(): Promise<Motion | null> {
  watchPreference();
  if (motion) return Promise.resolve(motion);
  if (prefersReducedMotion()) {
    document.documentElement.classList.remove('js');
    return Promise.resolve(null);
  }
  starting ??= start().catch((error) => {
    // Never leave content hidden if the engine fails to load.
    console.error('Motion failed to start', error);
    document.documentElement.classList.remove('js');
    starting = null;
    return null;
  });
  return starting;
}

async function start(): Promise<Motion> {
  const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
    import('lenis'),
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({ anchors: true, autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  tickerFn = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  motion = { gsap, ScrollTrigger, lenis };
  revealOnScroll(motion);
  waiting.forEach((cb) => cb(motion as Motion));
  waiting.clear();
  // From here scripts own the hidden start states, so the CSS failsafe (see global.css) stands down.
  document.documentElement.classList.add('js-live');
  return motion;
}

/** Run a callback once the engine is ready. Never runs for reduced motion. */
export function whenMotionReady(callback: (m: Motion) => void): void {
  if (motion) callback(motion);
  else waiting.add(callback);
}

/** Stop everything and restore native scrolling. */
export function destroyMotion(): void {
  if (!motion) return;
  const { gsap, ScrollTrigger, lenis } = motion;
  if (tickerFn) gsap.ticker.remove(tickerFn);
  ScrollTrigger.getAll().forEach((t) => t.kill());
  lenis.destroy();
  motion = null;
  starting = null;
  tickerFn = null;
  document.documentElement.classList.remove('js', 'js-live', 'has-cursor');
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    el.style.opacity = '';
    el.style.transform = '';
  });
}

/** Scroll to an element or position, smoothly when motion is on. */
export function scrollTo(target: string | number | HTMLElement, options: { offset?: number } = {}): void {
  if (motion) {
    motion.lenis.scrollTo(target, { offset: options.offset ?? 0 });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target + (options.offset ?? 0) });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  el?.scrollIntoView();
}

/** Fade and lift any [data-reveal] element as it enters the viewport. */
export function revealOnScroll({ gsap, ScrollTrigger }: Motion, root: ParentNode = document): void {
  const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!items.length) return;
  ScrollTrigger.batch(items, {
    start: 'top 90%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08, overwrite: true }),
  });
}

/** Follow runtime changes to the reduced motion preference. */
function watchPreference(): void {
  if (watching || typeof window === 'undefined') return;
  watching = true;
  window.matchMedia(REDUCED_QUERY).addEventListener('change', (event) => {
    if (event.matches) destroyMotion();
    else {
      document.documentElement.classList.add('js');
      void initMotion();
    }
  });
}
