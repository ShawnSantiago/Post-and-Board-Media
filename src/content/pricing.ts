/**
 * Pricing records — editable, hidden until approved.
 *
 * Nothing here is shown publicly unless `approved: true` AND an amount is set.
 * If you ever show a monthly equivalent for an annual commitment, also set
 * `upfrontCad` and `commitment` — the PriceTag component shows them beside it.
 */
export interface PriceRecord {
  id: string;
  label: string;
  approved: boolean;
  amountCad: number | null;
  basis: string | null; // e.g. "per placement, 12-month term"
  monthlyEquivalentCad?: number | null;
  upfrontCad?: number | null;
  commitment?: string | null;
  notes?: string | null;
}

export const pricing: Record<'board' | 'mailer', PriceRecord> = {
  board: {
    id: 'board',
    label: 'Advertising board placement',
    approved: false,
    amountCad: null,
    basis: null,
  },
  mailer: {
    id: 'mailer',
    label: 'Shared mailer space',
    approved: false,
    amountCad: null,
    basis: null,
  },
};

export const pricingFallback = 'Pricing depends on the placement, campaign, and advertising space.';

export const quoteIncludes = [
  'The placement or distribution coverage',
  'The term or campaign window',
  'What artwork support is included',
  'Production and distribution scope',
  'The total cost, in Canadian dollars',
  'Any conditions — such as category rules or participation requirements',
];
