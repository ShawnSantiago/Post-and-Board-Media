/**
 * Server-side enquiry delivery. Credentials are read from server-only env
 * vars and never reach the browser.
 *
 *   ENQUIRY_WEBHOOK_URL                           → JSON POST to a webhook (e.g. n8n)
 *   ENQUIRY_WEBHOOK_HEADER_NAME/VALUE             → optional auth header for it
 *   RESEND_API_KEY + ENQUIRY_EMAIL_TO/FROM        → email via Resend
 *
 * If both are configured, both are attempted; the enquiry counts as sent
 * only if at least one succeeds.
 */
import {
  ENQUIRY_EMAIL_FROM,
  ENQUIRY_EMAIL_TO,
  ENQUIRY_WEBHOOK_HEADER_NAME,
  ENQUIRY_WEBHOOK_HEADER_VALUE,
  ENQUIRY_WEBHOOK_URL,
  RESEND_API_KEY,
} from 'astro:env/server';
import { labelFor, type Enquiry } from './enquiry';
import { formatOptions } from '../content/services';

export function deliveryConfigured(): boolean {
  return Boolean(ENQUIRY_WEBHOOK_URL || (RESEND_API_KEY && ENQUIRY_EMAIL_TO && ENQUIRY_EMAIL_FROM));
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

function summaryLines(e: Enquiry): [string, string][] {
  return [
    ...Object.entries(e.fields)
      .filter(([k]) => k !== 'areaName')
      .map(([k, v]) => {
        // Show readable names rather than internal slugs.
        if (k === 'area') v = e.fields.areaName ?? v;
        if (k === 'format') v = formatOptions.find((f) => f.id === v)?.label ?? v;
        return [labelFor(e.type, k), v] as [string, string];
      }),
    ...(e.type === 'advertiser'
      ? [['Wants updates about new opportunities', e.updatesOptIn ? 'Yes' : 'No'] as [string, string]]
      : []),
    ['Submitted from', e.sourcePage],
    ['Submitted at', e.submittedAt],
  ];
}

function subjectFor(e: Enquiry): string {
  return e.type === 'host'
    ? `Host enquiry: ${e.fields.venueName ?? 'venue'}`
    : `Advertiser enquiry: ${e.fields.business ?? 'business'} — ${e.fields.areaName ?? e.fields.area ?? 'area'}`;
}

async function sendWebhook(url: string, e: Enquiry) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (ENQUIRY_WEBHOOK_HEADER_NAME && ENQUIRY_WEBHOOK_HEADER_VALUE) {
    headers[ENQUIRY_WEBHOOK_HEADER_NAME] = ENQUIRY_WEBHOOK_HEADER_VALUE;
  }
  // `subject` and `summaryText` are ready to drop into an email or chat node.
  const body = {
    ...e,
    subject: subjectFor(e),
    replyTo: e.fields.email,
    summaryText: summaryLines(e)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n'),
  };
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15_000),
  });
  // n8n answers 2xx once the workflow accepts the request; anything else
  // (inactive workflow, wrong path, failed auth, a failing node) is an error.
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
}

async function sendResend(e: Enquiry) {
  const subject = subjectFor(e);
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
