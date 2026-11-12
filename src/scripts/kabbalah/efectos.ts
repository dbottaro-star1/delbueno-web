/**
 * Small effects for the Vasija landing:
 * - the corner Vasija fills with light as the page scrolls (`[data-progreso]`, CSS variable --llenado);
 * - numbers count up when they come into view (`[data-contar]`);
 * - the hero's tree sheet and phone follow the pointer a little (`[data-parallax]`, desktop only).
 * With prefers-reduced-motion the numbers show at once and nothing follows the pointer.
 */
const quieto = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initProgreso(): void {
  const el = document.querySelector<HTMLElement>('[data-progreso]');
  if (!el) return;
  let pendiente = false;
  const pintar = () => {
    pendiente = false;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    el.style.setProperty('--llenado', p.toFixed(3));
    el.classList.toggle('k-mostrar', window.scrollY > window.innerHeight * 0.6);
    el.classList.toggle('k-llena', p > 0.97);
  };
  window.addEventListener(
    'scroll',
    () => {
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(pintar);
    },
    { passive: true },
  );
  pintar();
}

function initContadores(): void {
  const items = [...document.querySelectorAll<HTMLElement>('[data-contar]')];
  if (!items.length) return;
  if (quieto() || !('IntersectionObserver' in window)) return;
  const contar = (el: HTMLElement) => {
    const fin = Number(el.dataset.contar);
    const inicio = performance.now();
    const dur = 1100;
    const paso = (t: number) => {
      const k = Math.min(1, (t - inicio) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      el.textContent = String(Math.round(fin * e));
      if (k < 1) requestAnimationFrame(paso);
    };
    el.textContent = '0';
    requestAnimationFrame(paso);
  };
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        contar(entry.target as HTMLElement);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.6 },
  );
  items.forEach((el) => observer.observe(el));
}

function initParallax(): void {
  const zona = document.querySelector<HTMLElement>('[data-parallax]');
  if (!zona || quieto() || !window.matchMedia('(hover: hover) and (min-width: 901px)').matches) return;
  let pendiente = false;
  let x = 0;
  let y = 0;
  window.addEventListener(
    'pointermove',
    (e) => {
      x = e.clientX / window.innerWidth - 0.5;
      y = e.clientY / window.innerHeight - 0.5;
      if (pendiente) return;
      pendiente = true;
      requestAnimationFrame(() => {
        pendiente = false;
        zona.style.setProperty('--mx', x.toFixed(3));
        zona.style.setProperty('--my', y.toFixed(3));
      });
    },
    { passive: true },
  );
}

export function initEfectos(): void {
  initProgreso();
  initContadores();
  initParallax();
}
