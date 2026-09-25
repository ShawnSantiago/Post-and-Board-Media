/** Advertising formats offered at launch, plus the flagged future interest option. */
export type FormatId = 'board' | 'mailer' | 'combined' | 'digital-interest' | 'not-sure';

export interface FormatOption {
  id: FormatId;
  label: string;
  /** Future-only formats are interest enquiries and never bookable. */
  futureOnly?: boolean;
}

export const formatOptions: FormatOption[] = [
  { id: 'board', label: 'Advertising board inside a local business' },
  { id: 'mailer', label: 'Shared mailer' },
  { id: 'combined', label: 'Both — a board and a mailer' },
  { id: 'digital-interest', label: 'Future digital screens (interest only)', futureOnly: true },
  { id: 'not-sure', label: 'Not sure yet' },
];

export const formatLabels: Record<string, string> = {
  board: 'Advertising board',
  mailer: 'Shared mailer',
  combined: 'Board + mailer',
  'digital-interest': 'Digital screens (future)',
};

export const services = {
  boards: {
    href: '/advertising-boards',
    eyebrow: 'Inside local businesses',
    title: 'Advertising boards',
    summary:
      'A branded board inside an approved host venue. The venue keeps a large area for its own specials; advertisers share a designated section.',
    cta: 'Ask about board placements',
  },
  mailers: {
    href: '/shared-mailers',
    eyebrow: 'Delivered to a defined area',
    title: 'Shared mailers',
    summary:
      'Several businesses share one printed mailer and its campaign costs. Each advertiser buys a defined space in a campaign we organize.',
    cta: 'Ask about upcoming mailers',
  },
} as const;

export const budgetRanges = [
  'Not sure yet',
  'Under $250',
  '$250 – $500',
  '$500 – $1,000',
  '$1,000 – $2,500',
  'Over $2,500',
];

export const timingOptions = [
  'Not sure yet',
  'As soon as possible',
  'Within the next 3 months',
  'Later this year',
  'Just exploring',
];

export const venueTypes = [
  'Restaurant',
  'Café or bakery',
  'Bar or pub',
  'Salon, barber or spa',
  'Gym or studio',
  'Retail shop',
  'Laundromat',
  'Other customer-facing business',
];
