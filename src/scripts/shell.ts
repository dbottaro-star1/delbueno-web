/**
 * Site-wide shell behaviour: solid nav on scroll, mobile menu, scroll progress bar, custom cursor,
 * magnetic CTAs and the footer wordmark. Runs on every page.
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

  /* ---- menu ---- */
  const setOpen = (open: boolean) => {
    if (menu.classList.contains('is-open') === open) return;
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Menu');
    document.documentElement.classList.toggle('menu-open', open);
    const lenis = getMotion()?.lenis;
    if (lenis) open ? lenis.stop() : lenis.start();
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
    }
  });
  window.matchMedia('(min-width: 861px)').addEventListener('change', (e) => e.matches && setOpen(false));

  /* ---- solid nav ---- */
  const onScroll = () => nav.classList.toggle('is-solid', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  whenMotionReady((m) => {
    scrollMotion(m, nav, menu);
    footerWordmark(m);
    if (isFinePointer()) {
      cursor(m);
      magnetic(m);
    }
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

/** Dot plus ring cursor that turns into a labelled lens over [data-cursor] elements. */
function cursor({ gsap }: Motion): void {
  const root = document.documentElement;
  const dot = document.querySelector<HTMLElement>('.c-dot');
  const ring = document.querySelector<HTMLElement>('.c-ring');
  const bg = document.querySelector<HTMLElement>('.c-bg');
  const label = document.querySelector<HTMLElement>('.c-label');
  if (!dot || !ring || !bg || !label) return;

  root.classList.add('has-cursor');
  gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });
  const dx = gsap.quickTo(dot, 'x', { duration: 0.12, ease: 'power3' });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.12, ease: 'power3' });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.6, ease: 'expo.out' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.6, ease: 'expo.out' });
  let shown = false;
  window.addEventListener(
    'pointermove',
    (e) => {
      if (e.pointerType === 'touch') return;
      if (!shown) {
        shown = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { opacity: 1, duration: 0.6 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    },
    { passive: true },
  );
  root.addEventListener('mouseleave', () => gsap.to([dot, ring], { opacity: 0, duration: 0.4 }));
  root.addEventListener('mouseenter', () => shown && gsap.to([dot, ring], { opacity: 1, duration: 0.4 }));

  // A modal <dialog> renders in the browser's top layer, above any z-index, so the cursor would sit
  // under it with the native pointer hidden. While a dialog is open the cursor moves inside it.
  const cursorEl = dot.closest<HTMLElement>('.cursor');
  const home = cursorEl?.parentElement;
  if (cursorEl && home) {
    const follow = () => {
      const open = document.querySelector<HTMLDialogElement>('dialog[open]');
      const target = open ?? home;
      if (cursorEl.parentElement !== target) target.appendChild(cursorEl);
    };
    new MutationObserver(follow).observe(document.body, { subtree: true, attributes: true, attributeFilter: ['open'] });
  }

  let state = '';
  const setState = (s: string, text?: string) => {
    if (s === state && (s !== 'view' || label.textContent === text)) return;
    state = s;
    ring.classList.toggle('is-view', s === 'view');
    cursorEl?.classList.toggle('is-view', s === 'view');
    ring.classList.toggle('is-link', s === 'link');
    gsap.to(bg, { scale: s === 'view' ? 2 : s === 'link' ? 1.5 : 1, duration: 0.7, ease: 'expo.out' });
    gsap.to(dot, { scale: s === 'view' ? 0 : 1, duration: 0.4 });
    label.textContent = text || '';
    gsap.to(label, { opacity: s === 'view' ? 1 : 0, duration: 0.4 });
  };
  document.addEventListener('pointerover', (e) => {
    const t = e.target as Element | null;
    if (!t || !t.closest) return;
    const v = t.closest<HTMLElement>('[data-cursor]');
    if (v) return setState('view', v.dataset.cursor);
    setState(t.closest('a,button,[role="button"]') ? 'link' : '');
  });
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
