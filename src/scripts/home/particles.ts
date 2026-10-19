/**
 * Signal field: one fixed canvas driven by scroll.
 * Flow-noise chaos eases into an ordered dot grid (graph-paper rhythm: bright lines every 6th cell, violet and
 * lime nodes). Typed arrays, DPR capped at 2 (1.5 on phones), ticked by the shared loop, skipped when faded out,
 * and skipped entirely once settled with nothing moving. The drift stops after a few seconds without scrolling.
 */

import { calm } from './calm';

export interface Field {
  st: { p: number; sp: number; intro: number; fade: number };
  tick(time: number, dtMs: number): void;
  setMetrics(m: Partial<{ pEnd: number; fadeA: number; fadeB: number }>): void;
  /** Reduced motion: draw the ordered grid once. */
  fallback(): void;
}

export function createField(reduce: boolean): Field | null {
  const cv = document.getElementById('field') as HTMLCanvasElement | null;
  if (!cv || !cv.getContext) return null;
  const ctx = cv.getContext('2d');
  if (!ctx) return null;
  const root = document.documentElement;

  const COLORS = ['242,242,245', '242,242,245', '123,107,255', '186,251,68'];
  const SIZE = [1.2, 1.75, 2.2, 2.6];
  const ALPHA0 = [0.26, 0.42, 0.6, 0.7];
  const ALPHA1 = [0.2, 0.4, 0.75, 0.95];
  const cores = navigator.hardwareConcurrency || 8;
  const st = { p: 0, sp: 0, intro: 0, fade: 1 };
  const M = { pEnd: 900, fadeA: 1e9, fadeB: 1e9 + 1 };
  const mouse = { x: -9999, y: -9999 };
  const clarityEl = document.getElementById('clarity');
  const clarityBar = document.getElementById('clarityBar');
  const rail = document.getElementById('clarityRail');
  const rnd = Math.random;
  const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
  const smooth = (x: number) => x * x * (3 - 2 * x);

  let W = 0;
  let H = 0;
  let dpr = 1;
  let cap = 0;
  let n = 0;
  let R = 110;
  let tClock = 0;
  let cxp: Float32Array, cyp: Float32Array, tx: Float32Array, ty: Float32Array, dly: Float32Array;
  let curl: Float32Array, spd: Float32Array, szm: Float32Array, ox: Float32Array, oy: Float32Array;
  let vx: Float32Array, vy: Float32Array, dX: Float32Array, dY: Float32Array, dS: Float32Array;
  let starts = [0, 0, 0, 0, 0];
  let lastPct = -1;
  let lastO = -1;
  let lastRail = -1;
  let settled = false;

  const capFor = (w: number) => (w < 760 ? 900 : cores <= 4 ? 2400 : 3000);

  function setup(): void {
    cap = capFor(W);
    const f = () => new Float32Array(cap);
    cxp = f();
    cyp = f();
    tx = f();
    ty = f();
    dly = f();
    curl = f();
    spd = f();
    szm = f();
    ox = f();
    oy = f();
    vx = f();
    vy = f();
    dX = f();
    dY = f();
    dS = f();
    for (let i = 0; i < cap; i++) {
      curl[i] = (rnd() - 0.5) * 0.5;
      spd[i] = 26 + rnd() * 54;
      szm[i] = 0.55 + rnd() * 1.1;
      cxp[i] = rnd() * W;
      cyp[i] = rnd() * H;
    }
  }

  /* ordered targets: a square grid filling the viewport, at most `cap` nodes */
  function layout(): void {
    let cell = Math.max(14, Math.sqrt((W * H) / cap));
    let cols: number;
    let rows: number;
    for (;;) {
      cols = Math.floor(W / cell) + 1;
      rows = Math.floor(H / cell) + 1;
      if (cols * rows <= cap) break;
      cell += 0.5;
    }
    const x0 = (W - (cols - 1) * cell) / 2;
    const y0 = (H - (rows - 1) * cell) / 2;
    const L: number[][] = [[], [], [], []];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const k =
          c % 12 === 0 && r % 12 === 0 ? 3 : c % 6 === 0 && r % 6 === 0 ? 2 : c % 6 === 0 || r % 6 === 0 ? 1 : 0;
        L[k].push(x0 + c * cell, y0 + r * cell);
      }
    }
    let k = 0;
    starts = [0];
    for (let c = 0; c < 4; c++) {
      const a = L[c];
      for (let i = 0; i < a.length; i += 2, k++) {
        tx[k] = a[i];
        ty[k] = a[i + 1];
        dly[k] = (0.55 * (a[i + 1] / H) + 0.45 * rnd()) * 0.5 + (c > 1 ? 0.08 : 0);
      }
      starts.push(k);
    }
    n = k;
    R = Math.max(80, Math.min(130, W * 0.08));
  }

  function resize(): void {
    const w = cv!.clientWidth;
    const h = cv!.clientHeight;
    if (!w || !h) return;
    if (w === W && Math.abs(h - H) < 90) return;
    const first = W === 0;
    const wasCap = cap;
    W = w;
    H = h;
    dpr = Math.min(window.devicePixelRatio || 1, W < 760 ? 1.5 : 2);
    cv!.width = Math.round(W * dpr);
    cv!.height = Math.round(H * dpr);
    if (first || capFor(W) !== wasCap) setup();
    layout();
    settled = false;
  }

  function update(dt: number, t: number): boolean {
    const P = st.sp;
    const k60 = Math.min(dt * 60, 3);
    const drift = calm.level; // the drift eases out when the visitor stops scrolling (calm.ts)
    const flow = P < 1 && dt > 0 && drift > 0;
    const mx = mouse.x;
    const my = mouse.y;
    const R2 = R * R;
    const D = 0.6;
    const inv = 1 / (1 - D);
    let act = false;
    for (let i = 0; i < n; i++) {
      let x = cxp[i];
      let y = cyp[i];
      if (flow) {
        const a =
          (Math.sin(x * 0.0021 + t * 0.21) + Math.sin(y * 0.0027 - t * 0.17) + Math.sin((x + y) * 0.0013 + t * 0.11)) *
          2.1;
        x += Math.cos(a) * spd[i] * dt * drift;
        y += Math.sin(a) * spd[i] * dt * drift;
        if (x < -20) x += W + 40;
        else if (x > W + 20) x -= W + 40;
        if (y < -20) y += H + 40;
        else if (y > H + 20) y -= H + 40;
        cxp[i] = x;
        cyp[i] = y;
      }
      let q = (P - dly[i]) * inv;
      q = q < 0 ? 0 : q > 1 ? 1 : q;
      const e = smooth(q);
      const s = Math.sin(q * Math.PI) * curl[i];
      const ddx = tx[i] - x;
      const ddy = ty[i] - y;
      const px = x + ddx * e - ddy * s;
      const py = y + ddy * e + ddx * s;
      if (dt > 0) {
        const rx = px - mx;
        const ry = py - my;
        const d2 = rx * rx + ry * ry;
        if (d2 < R2 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = 1 - d / R;
          const g = f * f * 2.6 * k60;
          vx[i] += (rx / d) * g;
          vy[i] += (ry / d) * g;
        }
        vx[i] *= 0.88;
        vy[i] *= 0.88;
        ox[i] = (ox[i] + vx[i] * k60) * 0.93;
        oy[i] = (oy[i] + vy[i] * k60) * 0.93;
        if (ox[i] > 0.03 || ox[i] < -0.03 || oy[i] > 0.03 || oy[i] < -0.03) act = true;
      }
      dX[i] = px + ox[i];
      dY[i] = py + oy[i];
      dS[i] = szm[i] + (1 - szm[i]) * e;
    }
    return act;
  }

  function draw(): void {
    const c = ctx!;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, W, H);
    const P = st.sp;
    const a = smooth(Math.min(1, P * 1.1));
    for (let k = 0; k < 4; k++) {
      const a0 = starts[k];
      const a1 = starts[k + 1];
      if (a0 === a1) continue;
      c.fillStyle = 'rgb(' + COLORS[k] + ')';
      c.globalAlpha = ALPHA0[k] + (ALPHA1[k] - ALPHA0[k]) * a;
      const base = SIZE[k] * (1 + 0.2 * P);
      for (let i = a0; i < a1; i++) {
        const s = base * dS[i];
        c.fillRect(dX[i] - s * 0.5, dY[i] - s * 0.5, s, s);
      }
    }
    c.globalAlpha = 1;
  }

  function readout(): void {
    const pct = Math.round(st.sp * 100);
    if (pct !== lastPct) {
      lastPct = pct;
      if (clarityEl) clarityEl.textContent = String(pct).padStart(3, '0');
      if (clarityBar) clarityBar.style.transform = 'scaleY(' + st.sp.toFixed(3) + ')';
    }
  }

  function tick(_time: number, dtMs: number): void {
    const sy = window.scrollY || 0;
    const vh = window.innerHeight;
    st.p = clamp(sy / M.pEnd, 0, 1);
    st.fade = 1 - clamp((sy - M.fadeA) / (M.fadeB - M.fadeA), 0, 1);
    const o = +(st.intro * st.fade).toFixed(3);
    if (o !== lastO) {
      lastO = o;
      cv!.style.opacity = String(o);
    }
    if (rail) {
      const ro = +(st.intro * clamp(1 - (sy - M.pEnd) / (vh * 0.8), 0, 1)).toFixed(3);
      if (ro !== lastRail) {
        lastRail = ro;
        rail.style.opacity = String(ro);
      }
    }
    if (st.fade <= 0.002) return;
    const dt = Math.min(dtMs / 1000, 0.05);
    tClock += dt;
    st.sp += (st.p - st.sp) * (1 - Math.exp(-dt * 7));
    if (Math.abs(st.p - st.sp) < 0.0005) st.sp = st.p;
    const act = update(dt, tClock);
    const nowSettled = (st.sp >= 1 || calm.level === 0) && !act;
    if (nowSettled && settled) return;
    settled = nowSettled;
    draw();
    readout();
  }

  function drawStatic(): void {
    st.p = st.sp = 1;
    update(0, 0);
    draw();
  }

  resize();
  if (reduce) {
    drawStatic();
    cv.style.opacity = '0.4';
  }
  let rt = 0;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = window.setTimeout(() => {
      resize();
      if (reduce) drawStatic();
    }, 120);
  });
  if (!reduce) {
    window.addEventListener(
      'pointermove',
      (e) => {
        if (e.pointerType === 'touch') return;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
      },
      { passive: true },
    );
    root.addEventListener('mouseleave', () => {
      mouse.x = mouse.y = -9999;
    });
  }

  return {
    st,
    tick,
    setMetrics(m) {
      Object.assign(M, m);
    },
    fallback() {
      drawStatic();
      cv.style.opacity = '0.4';
    },
  };
}
