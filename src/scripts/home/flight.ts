/**
 * Hero stack and flight.
 *
 * Six screens float in front of the particle field as a 3D fan. As you scroll, each one flies (document-space
 * interpolation) to the exact rect of its slot in the Selected work grid and hands over to the real image: the flyer
 * clones the slot's image URL, so the swap at landing is invisible. Where the flight is off (narrow screens, touch
 * layouts that do not suit it, reduced motion) the screens stay as a fan in the hero and the grid behaves normally.
 */
import { gsap } from 'gsap';
import type { ScrollTrigger as ScrollTriggerType } from 'gsap/ScrollTrigger';
import type { Field } from './particles';

/**
 * The flight needs the two-column hero (>= 1024px) and a landscape-ish viewport with a hover-capable or large
 * enough screen. Portrait tablets and phones keep the fan only.
 */
export const FLIGHT_QUERY = '(min-width: 1024px) and (min-aspect-ratio: 5/4)';

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface Flyer {
  el: HTMLElement;
  sh: HTMLElement;
  im: HTMLElement;
  img: HTMLImageElement;
  slot: HTMLElement;
  sImg: HTMLImageElement;
  card: HTMLElement;
  intro: { v: number };
  landed: boolean;
  fan: { x: number; y: number; z: number; rx: number; ry: number; rz: number };
  burst: { x: number; y: number; rz: number };
  rect: { x: number; y: number; w: number; h: number; top: number };
  s0: number;
  S: number;
  E: number;
}

export interface Flight {
  /** Per-frame render, call from the shared loop. */
  render(time: number): void;
  /** Re-measure after layout changes. */
  measure(): void;
  /** Make every screen rise as soon as its own image has loaded. */
  startIntro(t0: number): void;
  /** Reduced motion: render the static fan once images are ready. */
  settleStatic(): void;
  setPointer(x: number, y: number): void;
}

const imgReady = (img: HTMLImageElement) =>
  new Promise<void>((res) => {
    if (img.complete && img.naturalWidth) return res();
    img.addEventListener('load', () => res(), { once: true });
    img.addEventListener('error', () => res(), { once: true });
    window.setTimeout(res, 7000);
  });

export function createFlight(opts: { reduce: boolean; fine: boolean; field: Field | null }): Flight | null {
  const { reduce, fine, field } = opts;
  const root = document.documentElement;
  const layer = document.getElementById('flyLayer');
  const stage = document.getElementById('stage');
  const heroEl = document.getElementById('top');
  const workEl = document.getElementById('work');
  const slots = Array.from(document.querySelectorAll<HTMLElement>('#workGrid .wc__media'));
  if (!layer || !stage || !heroEl || !workEl || !slots.length) return null;

  const easeIO = gsap.parseEase('power3.inOut');
  const mq = window.matchMedia(FLIGHT_QUERY);
  const twoCol = window.matchMedia('(min-width: 1024px)');
  const FLY = {
    items: [] as Flyer[],
    W: 600,
    cx: 0,
    cy: 0,
    flight: false,
    vh: window.innerHeight,
    mx: 0,
    my: 0,
    smx: 0,
    smy: 0,
    maxE: 0,
    heroBottom: 0,
    ready: false,
  };

  slots.forEach((slot) => {
    const sImg = slot.querySelector('img') as HTMLImageElement;
    const el = document.createElement('div');
    el.className = 'fly';
    const shadow = document.createElement('span');
    shadow.className = 'fly__sh';
    const frame = document.createElement('span');
    frame.className = 'fly__im';
    const img = document.createElement('img');
    img.alt = '';
    img.decoding = 'async';
    img.draggable = false;
    frame.appendChild(img);
    el.append(shadow, frame);
    // Same generated URL as the grid image, so the browser serves one download for both.
    img.src = sImg.currentSrc || sImg.src;
    layer.appendChild(el);
    FLY.items.push({
      el,
      sh: el.firstChild as HTMLElement,
      im: el.lastChild as HTMLElement,
      img,
      slot,
      sImg,
      card: slot.closest('.wc') as HTMLElement,
      intro: { v: 0 },
      landed: false,
      fan: { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 },
      burst: { x: 0, y: 0, rz: 0 },
      rect: { x: 0, y: 0, w: 0, h: 0, top: 0 },
      s0: 1,
      S: 0,
      E: 0,
    });
    /* slot images fade in on load (never an empty dark frame once its turn comes) */
    if (root.classList.contains('js')) imgReady(sImg).then(() => sImg.classList.add('is-ld'));
  });

  function measure(): void {
    const sy = window.scrollY || 0;
    const vh = window.innerHeight;
    FLY.vh = vh;
    FLY.flight = !reduce && mq.matches;
    root.classList.toggle('fly-on', FLY.flight);
    // The flight hands over to the real slot image, which must be loaded by then.
    if (FLY.flight) FLY.items.forEach((f) => (f.sImg.loading = 'eager'));
    const hr = heroEl!.getBoundingClientRect();
    FLY.heroBottom = hr.bottom + sy;
    layer!.style.height = hr.height + 'px';
    const sr = stage!.getBoundingClientRect();
    FLY.W = sr.width;
    FLY.cx = sr.left + sr.width / 2;
    FLY.cy = sr.top + sy + sr.height / 2;
    layer!.style.perspectiveOrigin = FLY.cx + 'px ' + FLY.cy + 'px';
    const u = FLY.W / 600;
    const mob = !twoCol.matches;
    let maxE = 0;
    FLY.items.forEach((f, i) => {
      const r = f.slot.getBoundingClientRect();
      f.rect = { x: r.left + r.width / 2, y: r.top + sy + r.height / 2, w: r.width, h: r.height, top: r.top + sy };
      f.el.style.width = r.width + 'px';
      f.el.style.height = r.height + 'px';
      const k = i - 2.5;
      const cw = FLY.W * (mob ? 0.6 : 0.5);
      f.s0 = cw / r.width;
      f.fan = {
        x: k * FLY.W * (mob ? 0.085 : 0.092) - (mob ? 0 : FLY.W * 0.06),
        y: k * FLY.W * (mob ? 0.06 : 0.075) + (i % 2 ? 8 : -8) * u,
        z: k * 62 * u,
        rx: 9,
        ry: -21 + k * 1.8,
        rz: -7 + k * 1.6,
      };
      f.burst = { x: k * 70 * u + ((i % 3) - 1) * 40, y: (i % 2 ? 1 : -1) * (60 + i * 10) * u, rz: k * 7 };
      f.S = i * 10 + 8;
      f.E = Math.max(f.S + vh * 0.7, f.rect.top - vh * 0.6 + (i % 3) * vh * 0.07);
      maxE = Math.max(maxE, f.E);
    });
    FLY.maxE = maxE;
    FLY.ready = true;
    /* particle scene is scrubbed over the same scroll as the first row of landings */
    if (field) {
      const row1 = FLY.items.slice(0, 3).reduce((a, f) => a + f.E, 0) / 3;
      const workEnd = workEl!.getBoundingClientRect().bottom + sy;
      field.setMetrics({
        pEnd: FLY.flight ? Math.max(vh * 0.9, row1) : vh * 0.95,
        fadeA: workEnd - vh * 1.6,
        fadeB: workEnd - vh * 0.6,
      });
    }
  }

  function render(time: number): void {
    if (!FLY.ready) return;
    const sy = window.scrollY || 0;
    const flight = FLY.flight;
    const W = FLY.W;
    const u = W / 600;
    if (!flight && !reduce && sy > FLY.heroBottom + 200) return;
    if (flight && sy > FLY.maxE + FLY.vh && FLY.items.every((f) => f.landed)) return;
    FLY.smx += (FLY.mx - FLY.smx) * 0.075;
    FLY.smy += (FLY.my - FLY.smy) * 0.075;
    const mx = fine && !reduce ? FLY.smx : 0;
    const my = fine && !reduce ? FLY.smy : 0;
    const t = reduce ? 0 : time;
    FLY.items.forEach((f, i) => {
      const p = flight ? clamp((sy - f.S) / (f.E - f.S), 0, 1) : 0;
      if (p >= 1) {
        if (!f.landed) {
          f.landed = true;
          f.el.style.visibility = 'hidden';
          f.card.classList.add('is-landed');
        }
        return;
      }
      if (f.landed) {
        f.landed = false;
        f.el.style.visibility = '';
        f.card.classList.remove('is-landed');
      }
      const e = p <= 0 ? 0 : easeIO(p);
      const it = f.intro.v;
      const A = f.fan;
      const calm = 1 - e;
      const arc = Math.sin(Math.PI * e);
      const x = A.x * it + mx * (18 + i * 9) * u * calm;
      let y = A.y * it + my * (12 + i * 6) * u * calm + (1 - it) * 50 * u;
      y += Math.sin(t * 0.9 + i * 1.1) * 9 * u * calm * it;
      const z = A.z * it;
      const rx = (A.rx * it - my * 7) * calm + Math.sin(t * 0.7 + i) * 1.2 * calm;
      const ry = (A.ry * it + mx * 11) * calm;
      const rz = A.rz * it * calm + Math.sin(t * 0.6 + i * 0.8) * 1 * calm + f.burst.rz * arc;
      const sc = lerp(f.s0 * (0.78 + 0.22 * it), 1, e);
      const cx = lerp(FLY.cx + x, f.rect.x, e) + f.burst.x * arc;
      const cy = lerp(FLY.cy + y, f.rect.y, e) + f.burst.y * arc;
      gsap.set(f.el, {
        x: cx - f.rect.w / 2,
        y: cy - f.rect.h / 2,
        z: z * calm,
        rotationX: rx,
        rotationY: ry,
        rotationZ: rz,
        scale: sc,
        opacity: Math.min(1, it * 2.2),
      });
      f.sh.style.opacity = String(calm);
      if (it < 1) f.im.style.clipPath = 'inset(' + (1 - it) * 100 + '% 0 0 0 round 12px)';
      else if (f.im.style.clipPath) f.im.style.clipPath = '';
    });
  }

  return {
    render,
    measure,
    setPointer(x, y) {
      FLY.mx = (x / window.innerWidth - 0.5) * 2;
      FLY.my = (y / window.innerHeight - 0.5) * 2;
    },
    startIntro(t0) {
      FLY.items.forEach((f, i) =>
        imgReady(f.img).then(() => {
          const wait = Math.max(0, 0.35 + i * 0.09 - (performance.now() - t0) / 1000);
          gsap.to(f.intro, { v: 1, duration: 1.9, ease: 'expo.out', delay: wait });
        }),
      );
    },
    settleStatic() {
      const re = () => {
        measure();
        render(0);
      };
      FLY.items.forEach((f) =>
        imgReady(f.img).then(() => {
          f.intro.v = 1;
          render(0);
        }),
      );
      window.addEventListener('resize', re);
      window.addEventListener('load', re);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(re);
      re();
    },
  };
}

/** Hook the flight re-measure to ScrollTrigger refreshes. */
export function remeasureOnRefresh(ScrollTrigger: typeof ScrollTriggerType, flight: Flight): void {
  ScrollTrigger.addEventListener('refresh', () => flight.measure());
}
