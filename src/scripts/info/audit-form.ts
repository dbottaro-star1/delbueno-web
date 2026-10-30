/**
 * Free UX audit form (src/components/info/AuditForm.astro): submits in place to the Web3Forms API and shows
 * the confirmation inline. Without scripts the browser posts the form and Web3Forms redirects back with ?sent=1.
 */
export function initAuditForm(): void {
  const forms = document.querySelectorAll<HTMLFormElement>('[data-audit-form]');
  const params = new URLSearchParams(window.location.search);

  forms.forEach((form) => {
    const root = form.closest('.af');
    const done = root?.querySelector<HTMLElement>('[data-done]');
    const error = form.querySelector<HTMLElement>('[data-error]');
    const label = form.querySelector<HTMLElement>('[data-label]');
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const source = form.querySelector<HTMLInputElement>('[data-source]');

    const showDone = () => {
      form.hidden = true;
      if (done) done.hidden = false;
    };

    // Keep the campaign tags with the request, so each lead shows which ad it came from.
    if (source) {
      const tags = ['utm_source', 'utm_campaign', 'utm_content']
        .map((k) => params.get(k))
        .filter(Boolean)
        .join(' / ');
      source.value = tags || document.referrer || 'direct';
    }

    if (params.get('sent') === '1') showDone();

    form.addEventListener('submit', async (event) => {
      const ajax = form.dataset.ajax;
      if (!ajax || !window.fetch) return;
      event.preventDefault();
      if (error) error.hidden = true;
      const original = label?.textContent ?? '';
      if (label) label.textContent = form.dataset.sending ?? original;
      if (button) button.disabled = true;
      try {
        const body = Object.fromEntries(new FormData(form).entries());
        const response = await fetch(ajax, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(body),
        });
        const result = (await response.json().catch(() => ({}))) as { success?: boolean };
        if (!response.ok || result.success === false) throw new Error(`Status ${response.status}`);
        showDone();
      } catch (err) {
        console.error('Audit form failed', err);
        if (error) error.hidden = false;
        if (label) label.textContent = original;
        if (button) button.disabled = false;
      }
    });
  });
}
