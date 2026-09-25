import type { APIRoute } from 'astro';
import { validate, type Enquiry, type EnquiryType } from '../../lib/enquiry';
import { deliver, deliveryConfigured } from '../../lib/delivery';
import { areaLabel } from '../../content/areas';

export const prerender = false;

const wantsJson = (request: Request) => (request.headers.get('accept') ?? '').includes('application/json');

function respond(request: Request, status: number, body: Record<string, unknown>, redirectTo: string) {
  if (wantsJson(request)) {
    return new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
    });
  }
  // No-JS fallback: redirect to a noindex result page.
  return new Response(null, { status: 303, headers: { Location: redirectTo } });
}

export const POST: APIRoute = async ({ request }) => {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return respond(request, 400, { ok: false, error: 'invalid_request' }, '/enquiry-not-sent?reason=invalid');
  }

  const type: EnquiryType = form.get('formType') === 'host' ? 'host' : 'advertiser';
  const back = type === 'host' ? '/host-a-board' : '/contact';

  // Honeypot: bots fill hidden fields. Respond neutrally without sending.
  if (typeof form.get('company_url') === 'string' && (form.get('company_url') as string).length > 0) {
    return respond(request, 400, { ok: false, error: 'rejected' }, `/enquiry-not-sent?reason=invalid&back=${back}`);
  }

  const { fields, errors, ok } = validate(type, form);
  if (!ok) {
    return respond(request, 422, { ok: false, error: 'validation', fields: errors }, `/enquiry-not-sent?reason=invalid&back=${back}`);
  }

  if (!deliveryConfigured()) {
    return respond(request, 503, { ok: false, error: 'not_configured' }, `/enquiry-not-sent?reason=not_configured&back=${back}`);
  }

  const source = String(form.get('sourcePage') ?? '').slice(0, 300);
  const enquiry: Enquiry = {
    type,
    submittedAt: new Date().toISOString(),
    sourcePage: source.startsWith('/') ? source : '/',
    fields: { ...fields, ...(fields.area ? { areaName: areaLabel(fields.area) ?? fields.area } : {}) },
    updatesOptIn: form.get('updatesOptIn') === 'yes',
  };

  const result = await deliver(enquiry);
  if (!result.ok) {
    console.error('Enquiry delivery failed', result.errors);
    return respond(request, 502, { ok: false, error: 'delivery_failed' }, `/enquiry-not-sent?reason=delivery&back=${back}`);
  }
  if (result.errors.length) console.warn('Enquiry partially delivered', result.errors);

  return respond(request, 200, { ok: true }, `/enquiry-received?type=${type}`);
};

/** Lets form pages confirm at runtime whether a destination is configured. */
export const GET: APIRoute = () =>
  new Response(JSON.stringify({ configured: deliveryConfigured() }), {
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

export const ALL: APIRoute = () =>
  new Response(JSON.stringify({ ok: false, error: 'method_not_allowed' }), {
    status: 405,
    headers: { Allow: 'POST', 'Content-Type': 'application/json' },
  });
