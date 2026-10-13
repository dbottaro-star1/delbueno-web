/**
 * 404 particle field. The number "404" is sampled from the display font into a few thousand dots that start as
 * drifting noise and settle into the shape, the same chaos to order idea as the homepage. Pointer movement pushes
 * dots away and they spring back; a click or tap bursts them apart.
 *
 * Reduced motion draws the settled number once and never ticks. Without scripts the plain gradient "404" in the
 * markup stays visible.
 */
import { addTick } from '../loop';
import { prefersReducedMotion } from '../motion';

interface Dots {
  x: Float32Array;
  y: Float32Array;
  vx: Float32Array;
  vy: Float32Array;
  tx: Float32Array;
  ty: Float32Array;
  hue: Float32Array;
  size: Float32Array;
  n: number;
}

const VIOLET = [123, 107, 255];
const LIME = [186, 251, 68];
const INK = [242, 242, 245];

export function initNotFound(): void {
  const stage = document.querySelector<HTMLElement>('[data-nf]');
  const cv = stage?.querySelector<HTMLCanvasElement>('canvas');
  const ctx = cv?.getContext('2d');
  if (!stage || !cv || !ctx) return;

  const reduce = prefersReducedMotion();
  const pointer = { x: -9999, y: -9999 };
  let W = 0;
  let H = 0;
  let dpr = 1;
  let dots: Dots | null = null;
  let intro = reduce ? 1 : 0;
  let visible = true;
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;

  /** Sample the glyph pixels of "404" on a grid. */
  function sample(): [number[], number[]] {
    const off = document.createElement('canvas');
    off.width = W;
    off.height = H;
    const o = off.getContext('2d', { willReadFrequently: true });
    const xs: number[] = [];
    const ys: number[] = [];
    if (!o) return [xs, ys];
    let size = H * 1.05;
    o.font = `800 ${size}px Syne, 'Helvetica Neue', Arial, sans-serif`;
    const width = o.measureText('404').width;
    if (width > W * 0.96) {
      size *= (W * 0.96) / width;
      o.font = `800 ${size}px Syne, 'Helvetica Neue', Arial, sans-serif`;
    }
    o.textAlign = 'center';
    o.textBaseline = 'alphabetic';
    o.fillStyle = '#fff';
    o.fillText('404', W / 2, H / 2 + size * 0.36);
    const data = o.getImageData(0, 0, W, H).data;
    const step = Math.max(4.5, Math.round(Math.sqrt((W * H) / (W < 760 ? 4200 : 9500))));
    for (let y = step / 2; y < H; y += step) {
      for (let x = step / 2; x < W; x += step) {
        if (data[((y | 0) * W + (x | 0)) * 4 + 3] > 140) {
          xs.push(x);
          ys.push(y);
        }
      }
    }
    return [xs, ys];
  }

  function build(): void {
    const [xs, ys] = sample();
    const n = xs.length;
    const f = () => new Float32Array(n);
    const d: Dots = {
      x: f(),
      y: f(),
      vx: f(),
      vy: f(),
      tx: Float32Array.from(xs),
      ty: Float32Array.from(ys),
      hue: f(),
      size: f(),
      n,
    };
    for (let i = 0; i < n; i++) {
      d.x[i] = reduce ? d.tx[i] : rnd() * W;
      d.y[i] = reduce ? d.ty[i] : rnd() * H;
      d.hue[i] = rnd();
      d.size[i] = (1.8 + rnd() * 1.8) * (W < 760 ? 0.62 : 1);
    }
    dots = d;
  }

  function resize(): void {
    const w = Math.round(stage!.clientWidth);
    const h = Math.round(stage!.clientHeight);
    if (!w || !h || (w === W && h === H)) return;
    W = w;
    H = h;
    dpr = Math.min(window.devicePixelRatio || 1, W < 760 ? 1.5 : 2);
    cv!.width = Math.round(W * dpr);
    cv!.height = Math.round(H * dpr);
    build();
    if (reduce) draw();
  }

  function draw(): void {
    if (!dots) return;
    const c = ctx!;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, W, H);
    const { x, y, hue, size, tx, n } = dots;
    for (let i = 0; i < n; i++) {
      const t = tx[i] / W;
      let rgb: number[];
      if (hue[i] < 0.38) rgb = INK;
      else {
        const k = Math.min(1, Math.max(0, (t - 0.1) / 0.8));
        rgb = [0, 1, 2].map((j) => VIOLET[j] + (LIME[j] - VIOLET[j]) * k);
      }
      c.fillStyle = `rgb(${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0})`;
      c.globalAlpha = hue[i] < 0.38 ? 0.75 : 0.95;
      const s = size[i];
      c.fillRect(x[i] - s / 2, y[i] - s / 2, s, s);
    }
    c.globalAlpha = 1;
  }

  function tick(_time: number, dtMs: number): void {
    if (!dots || !visible) return;
    const dt = Math.min(dtMs / 1000, 0.05);
    const k60 = dt * 60;
    intro = Math.min(1, intro + dt / 2.4);
    const e = intro * intro * (3 - 2 * intro);
    const spring = 0.004 + 0.05 * e;
    const R = Math.max(70, Math.min(130, W * 0.1));
    const R2 = R * R;
    const { x, y, vx, vy, tx, ty, n } = dots;
    for (let i = 0; i < n; i++) {
      if (e < 0.98) {
        // Flow noise while the number is still forming.
        const a = Math.sin(x[i] * 0.011 + _time * 0.6) + Math.cos(y[i] * 0.013 - _time * 0.5);
        vx[i] += Math.cos(a * 2.1) * 0.12 * (1 - e) * k60;
        vy[i] += Math.sin(a * 2.1) * 0.12 * (1 - e) * k60;
      }
      vx[i] += (tx[i] - x[i]) * spring * k60;
      vy[i] += (ty[i] - y[i]) * spring * k60;
      const rx = x[i] - pointer.x;
      const ry = y[i] - pointer.y;
      const d2 = rx * rx + ry * ry;
      if (d2 < R2 && d2 > 0.01) {
        const d = Math.sqrt(d2);
        const g = (1 - d / R) ** 2 * 3.2 * k60;
        vx[i] += (rx / d) * g;
        vy[i] += (ry / d) * g;
      }
      const damp = Math.pow(0.86, k60);
      vx[i] *= damp;
      vy[i] *= damp;
      x[i] += vx[i] * k60;
      y[i] += vy[i] * k60;
    }
    draw();
  }

  /** Throw every dot outward from a point. */
  function burst(px: number, py: number): void {
    if (!dots) return;
    const { x, y, vx, vy, n } = dots;
    for (let i = 0; i < n; i++) {
      const rx = x[i] - px;
      const ry = y[i] - py;
      const d = Math.hypot(rx, ry) + 12;
      const f = Math.min(26, 2600 / d) * (0.6 + rnd() * 0.8);
      vx[i] += (rx / d) * f;
      vy[i] += (ry / d) * f;
    }
  }

  const ready = (document.fonts?.load('800 100px Syne', '404') ?? Promise.resolve()).catch(() => undefined);
  ready.then(() => {
    resize();
    stage.classList.add('has-field');
    if (reduce) return;
    addTick(tick);
    new IntersectionObserver(([entry]) => (visible = entry.isIntersecting), { threshold: 0 }).observe(stage);
    stage.addEventListener(
      'pointermove',
      (ev) => {
        const r = cv.getBoundingClientRect();
        pointer.x = ev.clientX - r.left;
        pointer.y = ev.clientY - r.top;
      },
      { passive: true },
    );
    stage.addEventListener('pointerleave', () => {
      pointer.x = pointer.y = -9999;
    });
    stage.addEventListener('pointerdown', (ev) => {
      const r = cv.getBoundingClientRect();
      burst(ev.clientX - r.left, ev.clientY - r.top);
    });
  });

  let timer = 0;
  window.addEventListener('resize', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(resize, 150);
  });
}
