/**
 * Copy-to-clipboard buttons. A button marked [data-copy="text"] stays hidden until the Clipboard API is available,
 * so the plain mailto link next to it remains the fallback. Feedback goes through a polite live region.
 */
export function initCopy(): void {
  const canCopy = typeof navigator !== 'undefined' && !!navigator.clipboard?.writeText && window.isSecureContext;
  document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((button) => {
    if (!canCopy) return;
    button.hidden = false;
    const label = button.querySelector<HTMLElement>('[data-copy-label]');
    const idle = label?.textContent ?? 'Copy email';
    const status = document.getElementById(button.dataset.copyStatus ?? '');
    let timer = 0;
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy ?? '');
        button.classList.add('is-done');
        if (label) label.textContent = 'Copied';
        if (status) status.textContent = 'Email address copied to the clipboard.';
      } catch {
        if (status) status.textContent = 'Copy is not available here. Use the email link instead.';
        return;
      }
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        button.classList.remove('is-done');
        if (label) label.textContent = idle;
        if (status) status.textContent = '';
      }, 2400);
    });
  });
}
