/**
 * Scroll reveals for the Vasija pages. Elements with `data-revelar` fade up when they enter the viewport; the children
 * of `data-revelar-grupo` do the same one after another. Elements already on screen at load are left alone, so nothing
 * flashes. Off with prefers-reduced-motion or without IntersectionObserver: everything is simply visible.
 */
export function initRevelar(): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;

  const items: HTMLElement[] = [...document.querySelectorAll<HTMLElement>('[data-revelar]')];
  document.querySelectorAll<HTMLElement>('[data-revelar-grupo]').forEach((grupo) => {
    [...grupo.children].forEach((hijo, i) => {
      if (!(hijo instanceof HTMLElement)) return;
      hijo.style.transitionDelay = `${Math.min(i, 6) * 110}ms`;
      items.push(hijo);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('k-visible');
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
  );

  const limite = window.innerHeight * 0.9;
  items.forEach((el) => {
    if (el.getBoundingClientRect().top < limite) return;
    el.classList.add('k-revelar');
    observer.observe(el);
  });
}

/**
 * The sticky call to action on phones (`[data-barra]`): it shows once the hero's buttons scroll away and hides again
 * while the waitlist is on screen.
 */
export function initBarra(): void {
  const barra = document.querySelector<HTMLElement>('[data-barra]');
  const heroCta = document.querySelector('[data-hero-cta]');
  const lista = document.querySelector('#lista');
  if (!barra || !heroCta || !lista || !('IntersectionObserver' in window)) return;

  let heroVisible = true;
  let listaVisible = false;
  const actualizar = () => {
    const mostrar = !heroVisible && !listaVisible;
    barra.classList.toggle('k-mostrar', mostrar);
    barra.inert = !mostrar;
  };
  barra.inert = true;
  new IntersectionObserver(([entry]) => {
    heroVisible = entry.isIntersecting;
    actualizar();
  }).observe(heroCta);
  new IntersectionObserver(([entry]) => {
    listaVisible = entry.isIntersecting;
    actualizar();
  }).observe(lista);
}
