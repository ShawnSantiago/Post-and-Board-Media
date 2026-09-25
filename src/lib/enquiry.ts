/** Shared enquiry schema and validation (used by the API route). */

export type EnquiryType = 'advertiser' | 'host';

export interface Enquiry {
  type: EnquiryType;
  submittedAt: string;
  sourcePage: string;
  fields: Record<string, string>;
  /** Opted in to hear about new opportunities. Separate from the enquiry itself. */
  updatesOptIn: boolean;
}

interface FieldRule {
  label: string;
  required?: boolean;
  max?: number;
  kind?: 'email' | 'url' | 'tel';
}

export const advertiserFields: Record<string, FieldRule> = {
  name: { label: 'Name', required: true, max: 120 },
  business: { label: 'Business name', required: true, max: 160 },
  email: { label: 'Email', required: true, max: 200, kind: 'email' },
  area: { label: 'Target area', required: true, max: 80 },
  areaDetail: { label: 'Area details', max: 200 },
  format: { label: 'Advertising format', max: 60 },
  category: { label: 'Business category', max: 120 },
  website: { label: 'Website', max: 300, kind: 'url' },
  phone: { label: 'Phone', max: 40, kind: 'tel' },
  budget: { label: 'Budget range', max: 60 },
  timing: { label: 'Preferred timing', max: 60 },
  message: { label: 'Message', max: 3000 },
  opportunity: { label: 'Selected opportunity', max: 120 },
};

export const hostFields: Record<string, FieldRule> = {
  venueName: { label: 'Venue name', required: true, max: 160 },
  name: { label: 'Contact name', required: true, max: 120 },
  email: { label: 'Email', required: true, max: 200, kind: 'email' },
  area: { label: 'Area', required: true, max: 80 },
  venueType: { label: 'Venue type', required: true, max: 80 },
  website: { label: 'Website', max: 300, kind: 'url' },
  message: { label: 'Message', max: 3000 },
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validate(type: EnquiryType, form: FormData) {
  const rules = type === 'host' ? hostFields : advertiserFields;
  const fields: Record<string, string> = {};
  const errors: Record<string, string> = {};

  for (const [key, rule] of Object.entries(rules)) {
    const raw = form.get(key);
    const value = typeof raw === 'string' ? raw.trim() : '';
    if (rule.required && !value) {
      errors[key] = `${rule.label} is required.`;
      continue;
    }
    if (!value) continue;
    if (rule.max && value.length > rule.max) {
      errors[key] = `${rule.label} is too long.`;
      continue;
    }
    if (rule.kind === 'email' && !emailRe.test(value)) {
      errors[key] = 'Enter a valid email address.';
      continue;
    }
    if (rule.kind === 'url') {
      const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
      try {
        new URL(candidate);
      } catch {
        errors[key] = 'Enter a valid website address.';
        continue;
      }
    }
    fields[key] = value;
  }
  return { fields, errors, ok: Object.keys(errors).length === 0 };
}

export function labelFor(type: EnquiryType, key: string): string {
  if (key === 'areaName') return 'Area name';
  return (type === 'host' ? hostFields : advertiserFields)[key]?.label ?? key;
}
