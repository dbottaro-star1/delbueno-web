/**
 * Scripts for the Kabbalah app pages (src/layouts/KabbalahLayout.astro). Bundled modules, so the CSP needs no new hash.
 */
import { initLista } from './lista';

export function initKabbalah(): void {
  // The header gets its bottom rule once the page scrolls under it.
  const cabecera = document.querySelector<HTMLElement>('[data-cabecera]');
  if (cabecera) {
    const marcar = () => cabecera.toggleAttribute('data-scrolled', window.scrollY > 8);
    marcar();
    window.addEventListener('scroll', marcar, { passive: true });
  }
  initLista();
}
