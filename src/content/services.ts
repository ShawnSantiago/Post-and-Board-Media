/** Advertising formats offered at launch, plus the flagged future interest option. */
export type FormatId = 'board' | 'mailer' | 'combined' | 'digital-interest' | 'not-sure';

export interface FormatOption {
  id: FormatId;
  label: string;
  /** Future-only formats are interest enquiries and never bookable. */
  futureOnly?: boolean;
}

export const formatOptions: FormatOption[] = [
  { id: 'board', label: 'Storefront sign placement' },
  { id: 'mailer', label: 'Shared mailer' },
  { id: 'combined', label: 'Both — a sign and a mailer' },
  { id: 'digital-interest', label: 'Future digital screens (interest only)', futureOnly: true },
  { id: 'not-sure', label: 'Not sure yet' },
];

export const formatLabels: Record<string, string> = {
  board: 'Storefront sign',
  mailer: 'Shared mailer',
  combined: 'Sign + mailer',
  'digital-interest': 'Digital screens (future)',
};

export const services = {
  boards: {
    href: '/storefront-signs',
    eyebrow: 'On the street',
    title: 'Storefront signs',
    summary:
      'Advertise on the sidewalk signs local businesses put out every day. The host promotes its own specials on most of the sign; a sponsor section carries a few local advertisers.',
    cta: 'View sign placements',
  },
  mailers: {
    href: '/shared-mailers',
    eyebrow: 'In the mailbox',
    title: 'Shared mailers',
    summary:
      'Reach thousands of local homes or businesses while sharing printing and distribution costs with other advertisers.',
    cta: 'View upcoming mailers',
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
  'Café or bakery',
  'Restaurant or takeout',
  'Pub or bar',
  'Barber shop or salon',
  'Convenience or specialty food store',
  'Independent retailer',
  'Gym or studio',
  'Pet store',
  'Clinic or health business',
  'Other storefront business',
];
