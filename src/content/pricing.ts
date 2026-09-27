/**
 * Pricing — edit these numbers to publish price anchors.
 *
 * `fromCad` is the typical starting price per spot, shown as "From $X" on the
 * format pages, the homepage and opportunity cards. Leave it `null` to hide it
 * (the site then says "Ask for current rates"). Individual opportunities can
 * carry their own exact price in src/content/opportunities.ts.
 *
 * If you ever show a monthly equivalent for a longer commitment, also set
 * `upfrontCad` and `commitment` so they're displayed beside it.
 */
export interface PriceRecord {
  id: string;
  label: string;
  /** Typical starting price per spot, in CAD. null = not published yet. */
  fromCad: number | null;
  /** What the price covers, e.g. "per spot, 6-month placement". */
  basis: string | null;
  monthlyEquivalentCad?: number | null;
  upfrontCad?: number | null;
  commitment?: string | null;
  /** Optional launch note, e.g. "Founding Hamilton rates". */
  note?: string | null;
}

export const pricing: Record<'board' | 'mailer', PriceRecord> = {
  board: {
    id: 'board',
    label: 'Storefront sign placement',
    fromCad: null,
    basis: 'per sponsor spot, per term',
    note: null,
  },
  mailer: {
    id: 'mailer',
    label: 'Shared mailer spot',
    fromCad: null,
    basis: 'per spot, per mailing',
    note: null,
  },
};

export const quoteIncludes = [
  'Where your ad appears — the sign location or mailer area',
  'The term or mailing date',
  'Your ad size and position',
  'Artwork help included',
  'The total price, in Canadian dollars',
];
