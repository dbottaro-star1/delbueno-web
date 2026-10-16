/**
 * Site-wide shell behaviour: solid nav on scroll, mobile menu, scroll progress bar, magnetic CTAs and the footer
 * wordmark. Runs on every page.
 *
 * Everything that needs GSAP waits for whenMotionReady(), so visitors who prefer reduced motion
 * get the nav and the menu and nothing else.
 */
import { getMotion, whenMotionReady, type Motion } from './motion';

const FINE = '(hover: hover) and (pointer: fine)';

export const isFinePointer = (): boolean => window.matchMedia(FINE).matches;

export function initShell(): void {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!nav || !toggle || !menu) return;

  /* ---- menu: a modal dialog while open ---- */
  // Everything behind the menu is inert (no focus, no pointer, hidden from assistive technology) except the burger,
  // which stays in the header so the menu can be closed. Whatever was already inert is left alone on close.
  let inerted: HTMLElement[] = [];
  const backdrop = (): HTMLElement[] => {
    const outside = Array.from(document.body.children).filter(
      (el): el is HTMLElement =>
        el instanceof HTMLElement && !['SCRIPT', 'STYLE'].includes(el.tagName) && el !== nav && el !== menu,
    );
    const inHeader = Array.from(
      nav.querySelectorAll<HTMLElement>(':scope > *:not(.nav-right), .nav-right > :not([data-nav-toggle])'),
    );
    return [...outside, ...inHeader].filter((el) => !el.inert);
  };
  const setOpen = (open: boolean) => {
    if (menu.classList.contains('is-open') === open) return;
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', (open ? toggle.dataset.labelClose : toggle.dataset.labelOpen) ?? 'Menu');
    document.documentElement.classList.toggle('menu-open', open);
    if (open) {
      inerted = backdrop();
      inerted.forEach((el) => (el.inert = true));
    } else {
      inerted.forEach((el) => (el.inert = false));
      inerted = [];
    }
    const lenis = getMotion()?.lenis;
    if (open) lenis?.stop();
    else lenis?.start();
    if (open) menu.querySelector<HTMLElement>('a')?.focus({ preventScroll: true });
  };
  toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (!menu.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      setOpen(false);
      toggle.focus();
      return;
    }
    if (e.key !== 'Tab') return;
    // Keep focus inside the menu and its toggle while it is open.
    const items = [toggle, ...Array.from(menu.querySelectorAll<HTMLElement>('a'))];
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    } else if (!items.includes(document.activeElement as HTMLElement)) {
      e.preventDefault();
      first.focus();
    }
  });
  window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => e.matches && setOpen(false));

  /* ---- solid nav ---- */
  const onScroll = () => nav.classList.toggle('is-solid', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  whenMotionReady((m) => {
    scrollMotion(m, nav, menu);
    footerWordmark(m);
    if (isFinePointer()) magnetic(m);
  });
}

/** Hide the nav while scrolling down, show it on the way up, and drive the progress bar. */
function scrollMotion({ gsap, ScrollTrigger }: Motion, nav: HTMLElement, menu: HTMLElement): void {
  let hidden = false;
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      if (menu.classList.contains('is-open')) return;
      const down = self.direction === 1 && self.scroll() > 700;
      if (down && !hidden) {
        hidden = true;
        gsap.to(nav, { yPercent: -110, duration: 0.8, ease: 'power4.inOut', overwrite: 'auto' });
      } else if (self.direction === -1 && hidden) {
        hidden = false;
        gsap.to(nav, { yPercent: 0, duration: 0.8, ease: 'power4.inOut', overwrite: 'auto' });
      }
    },
  });
  // Keep the nav visible when focus lands inside it.
  nav.addEventListener('focusin', () => {
    if (!hidden) return;
    hidden = false;
    gsap.to(nav, { yPercent: 0, duration: 0.5, ease: 'power4.out', overwrite: 'auto' });
  });
  const bar = document.querySelector<HTMLElement>('.progress i');
  if (bar) {
    const setBar = gsap.quickSetter(bar, 'scaleX') as (v: number) => void;
    ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (s) => setBar(s.progress) });
  }
}

function footerWordmark({ gsap }: Motion): void {
  const big = document.getElementById('footBig');
  if (!big) return;
  gsap.fromTo(
    big,
    { yPercent: 38 },
    {
      yPercent: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.foot', start: 'top bottom', end: 'bottom bottom', scrub: true },
    },
  );
}

/** Buttons marked [data-magnetic] lean toward the pointer. */
function magnetic({ gsap }: Motion): void {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.9, ease: 'expo.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.9, ease: 'expo.out' });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.32);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.45);
      el.style.setProperty('--mx', e.clientX - r.left + 'px');
      el.style.setProperty('--my', e.clientY - r.top + 'px');
    };
    el.addEventListener('pointerenter', move);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}
