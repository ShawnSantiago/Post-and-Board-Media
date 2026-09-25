/**
 * Progressive enhancement for enquiry forms: URL prefill, accessible
 * validation messages, and honest loading / success / failure states.
 * Without JavaScript the form still posts to /api/enquiry and redirects.
 */

type OppMap = Record<string, { title: string; area: string; format: string }>;

const messages: Record<string, string> = {
  valueMissing: 'This field is required.',
  typeMismatch: 'Please check the format of this field.',
  tooLong: 'This is too long.',
};

const errorCopy: Record<string, string> = {
  not_configured:
    'Your enquiry was not sent: this form isn’t connected to a delivery destination yet. Please try again later.',
  delivery_failed:
    'Your enquiry was not sent because of a problem on our side. Please try again in a few minutes.',
  validation: 'Your enquiry was not sent. Please check the highlighted fields.',
  network: 'Your enquiry was not sent — we couldn’t reach the server. Check your connection and try again.',
  default: 'Your enquiry was not sent. Please try again.',
};

function fieldError(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement): string {
  const v = el.validity;
  if (v.valueMissing) return messages.valueMissing;
  if (v.typeMismatch && el.type === 'email') return 'Enter a valid email address, like name@example.com.';
  if (v.typeMismatch) return messages.typeMismatch;
  if (v.tooLong) return messages.tooLong;
  if (v.customError) return el.validationMessage;
  return '';
}

function setError(el: Element, msg: string) {
  const input = el as HTMLInputElement;
  const errId = input.getAttribute('aria-describedby')?.split(' ').find((id) => id.endsWith('-err'));
  const errEl = errId ? document.getElementById(errId) : null;
  if (msg) input.setAttribute('aria-invalid', 'true');
  else input.removeAttribute('aria-invalid');
  if (errEl) errEl.textContent = msg;
}

function checkWebsite(el: HTMLInputElement | null) {
  if (!el) return;
  const value = el.value.trim();
  let msg = '';
  if (value) {
    try {
      new URL(/^https?:\/\//i.test(value) ? value : `https://${value}`);
      if (!value.includes('.')) msg = 'Enter a valid website address.';
    } catch {
      msg = 'Enter a valid website address.';
    }
  }
  el.setCustomValidity(msg);
}

function selectIfPresent(select: HTMLSelectElement | null, value: string | null) {
  if (!select || !value) return false;
  const match = Array.from(select.options).some((o) => o.value === value);
  if (match) select.value = value;
  return match;
}

function prefill(form: HTMLFormElement, wrap: Element) {
  const params = new URLSearchParams(window.location.search);
  selectIfPresent(form.querySelector<HTMLSelectElement>('[data-area]'), params.get('area'));
  selectIfPresent(form.querySelector<HTMLSelectElement>('[data-format]'), params.get('format'));

  const slug = params.get('opportunity');
  const map: OppMap = JSON.parse(form.dataset.opportunities || '{}');
  if (slug && map[slug]) {
    const opp = map[slug];
    form.querySelector<HTMLInputElement>('[data-opportunity]')!.value = slug;
    selectIfPresent(form.querySelector<HTMLSelectElement>('[data-area]'), opp.area);
    selectIfPresent(form.querySelector<HTMLSelectElement>('[data-format]'), opp.format);
    const ctx = wrap.querySelector<HTMLElement>('[data-context]');
    const title = wrap.querySelector<HTMLElement>('[data-context-title]');
    if (ctx && title) {
      title.textContent = opp.title;
      ctx.hidden = false;
    }
  }
}

async function syncConnectionNotices() {
  const notices = document.querySelectorAll<HTMLElement>('[data-connection-notice]');
  if (!notices.length) return;
  try {
    const res = await fetch('/api/enquiry', { headers: { Accept: 'application/json' } });
    const data = await res.json();
    notices.forEach((n) => (n.hidden = data.configured === true));
  } catch {
    // Keep the build-time state if the status check fails.
  }
}

export function enhanceEnquiryForms() {
  void syncConnectionNotices();
  document.querySelectorAll<HTMLFormElement>('form[data-enquiry-form]').forEach((form) => {
    if (form.dataset.enhanced) return;
    form.dataset.enhanced = 'true';
    const wrap = form.closest('[data-enquiry-wrap]') ?? form.parentElement!;
    const status = form.querySelector<HTMLElement>('[data-status]')!;
    const submit = form.querySelector<HTMLButtonElement>('[data-submit]')!;
    const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]')!;
    const idleLabel = submitLabel.textContent;
    const website = form.querySelector<HTMLInputElement>('input[name="website"]');
    const source = form.querySelector<HTMLInputElement>('[data-source]');
    if (source) source.value = window.location.pathname + window.location.search;

    if (form.dataset.prefill === 'url') prefill(form, wrap);

    const fields = Array.from(form.querySelectorAll<HTMLInputElement>('input:not([type=hidden]):not([name=company_url]), select, textarea'));
    fields.forEach((el) => {
      el.addEventListener('blur', () => {
        if (el === website) checkWebsite(website);
        if (el.value || el.getAttribute('aria-invalid')) setError(el, fieldError(el));
      });
      el.addEventListener('input', () => {
        if (el.getAttribute('aria-invalid')) {
          if (el === website) checkWebsite(website);
          setError(el, fieldError(el));
        }
      });
    });

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      status.innerHTML = '';
      checkWebsite(website);

      let firstInvalid: HTMLElement | null = null;
      for (const el of fields) {
        const msg = el.checkValidity() ? '' : fieldError(el);
        setError(el, msg);
        if (msg && !firstInvalid) firstInvalid = el;
      }
      if (firstInvalid) {
        status.innerHTML = '<div class="notice notice--error">Please fix the highlighted fields.</div>';
        firstInvalid.focus();
        return;
      }

      submit.setAttribute('aria-busy', 'true');
      submit.disabled = true;
      submitLabel.textContent = 'Sending…';

      let errorKey: string;
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.ok === true) {
          const success = wrap.querySelector<HTMLElement>('[data-success]');
          form.hidden = true;
          wrap.querySelector<HTMLElement>('[data-context]')?.setAttribute('hidden', '');
          if (success) {
            success.hidden = false;
            success.focus();
          }
          return;
        }
        errorKey = data.error ?? 'default';
        if (data.fields) {
          for (const [name, msg] of Object.entries(data.fields as Record<string, string>)) {
            const el = form.querySelector(`[name="${name}"]`);
            if (el) setError(el, msg);
          }
        }
      } catch {
        errorKey = 'network';
      } finally {
        submit.removeAttribute('aria-busy');
        submit.disabled = false;
        submitLabel.textContent = idleLabel;
      }
      {
        const div = document.createElement('div');
        div.className = 'notice notice--error';
        div.textContent = errorCopy[errorKey] ?? errorCopy.default;
        status.replaceChildren(div);
      }
    });
  });
}
