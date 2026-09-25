/**
 * Server-side enquiry delivery. Credentials are read from server-only env
 * vars and never reach the browser.
 *
 *   ENQUIRY_WEBHOOK_URL                           → JSON POST to any webhook
 *   RESEND_API_KEY + ENQUIRY_EMAIL_TO/FROM        → email via Resend
 *
 * If both are configured, both are attempted; the enquiry counts as sent
 * only if at least one succeeds.
 */
import {
  ENQUIRY_EMAIL_FROM,
  ENQUIRY_EMAIL_TO,
  ENQUIRY_WEBHOOK_URL,
  RESEND_API_KEY,
} from 'astro:env/server';
import { labelFor, type Enquiry } from './enquiry';

export function deliveryConfigured(): boolean {
  return Boolean(ENQUIRY_WEBHOOK_URL || (RESEND_API_KEY && ENQUIRY_EMAIL_TO && ENQUIRY_EMAIL_FROM));
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function summaryLines(e: Enquiry): [string, string][] {
  return [
    ...Object.entries(e.fields).map(([k, v]) => [labelFor(e.type, k), v] as [string, string]),
    ['Wants updates about new opportunities', e.updatesOptIn ? 'Yes' : 'No'],
    ['Submitted from', e.sourcePage],
    ['Submitted at', e.submittedAt],
  ];
}

async function sendWebhook(url: string, e: Enquiry) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(e),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

async function sendResend(e: Enquiry) {
  const subject =
    e.type === 'host'
      ? `Host enquiry: ${e.fields.venueName ?? 'venue'}`
      : `Advertiser enquiry: ${e.fields.business ?? 'business'} (${e.fields.area ?? 'area'})`;
  const lines = summaryLines(e);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: ENQUIRY_EMAIL_FROM,
      to: ENQUIRY_EMAIL_TO!.split(',').map((s) => s.trim()),
      reply_to: e.fields.email,
      subject,
      text: lines.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `<table>${lines
        .map(([k, v]) => `<tr><th align="left" valign="top">${escapeHtml(k)}</th><td>${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`)
        .join('')}</table>`,
    }),
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) throw new Error(`Resend responded ${res.status}`);
}

export async function deliver(e: Enquiry): Promise<{ ok: boolean; errors: string[] }> {
  const attempts: Promise<void>[] = [];
  if (ENQUIRY_WEBHOOK_URL) attempts.push(sendWebhook(ENQUIRY_WEBHOOK_URL, e));
  if (RESEND_API_KEY && ENQUIRY_EMAIL_TO && ENQUIRY_EMAIL_FROM) attempts.push(sendResend(e));
  if (attempts.length === 0) return { ok: false, errors: ['not_configured'] };

  const results = await Promise.allSettled(attempts);
  const errors = results.flatMap((r) => (r.status === 'rejected' ? [String(r.reason)] : []));
  return { ok: results.some((r) => r.status === 'fulfilled'), errors };
}
