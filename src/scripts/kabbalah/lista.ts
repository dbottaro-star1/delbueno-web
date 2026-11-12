/**
 * Waitlist form (src/components/kabbalah/ListaDeEspera.astro): submits in place to the Web3Forms API and shows the
 * confirmation inline. Without scripts the browser posts the form and Web3Forms redirects back with ?enviado=1.
 * No analytics: these pages load none.
 */
export function initLista(): void {
  const params = new URLSearchParams(window.location.search);

  document.querySelectorAll<HTMLFormElement>('[data-lista]').forEach((form) => {
    const root = form.closest('[data-lista-root]');
    const done = root?.querySelector<HTMLElement>('[data-lista-hecho]');
    const error = form.querySelector<HTMLElement>('[data-lista-error]');
    const label = form.querySelector<HTMLElement>('[data-lista-label]');
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const origen = form.querySelector<HTMLInputElement>('[data-lista-origen]');

    const mostrarHecho = () => {
      form.hidden = true;
      if (done) {
        done.hidden = false;
        done.focus();
      }
    };

    if (origen) {
      const tags = ['utm_source', 'utm_campaign', 'utm_content']
        .map((k) => params.get(k))
        .filter(Boolean)
        .join(' / ');
      origen.value = tags || document.referrer || 'directo';
    }

    if (params.get('enviado') === '1') mostrarHecho();

    form.addEventListener('submit', async (event) => {
      const endpoint = form.dataset.ajax;
      if (!endpoint || !window.fetch) return;
      event.preventDefault();
      if (error) error.hidden = true;
      const original = label?.textContent ?? '';
      if (label) label.textContent = form.dataset.enviando ?? original;
      if (button) button.disabled = true;
      try {
        const body = Object.fromEntries(new FormData(form).entries());
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body),
        });
        const result = (await response.json().catch(() => ({}))) as { success?: boolean };
        if (!response.ok || result.success === false) throw new Error(`Status ${response.status}`);
        mostrarHecho();
      } catch (err) {
        console.error('Waitlist form failed', err);
        if (error) error.hidden = false;
        if (label) label.textContent = original;
        if (button) button.disabled = false;
      }
    });
  });
}
