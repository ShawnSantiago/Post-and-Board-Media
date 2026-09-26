/**
 * Opportunity directory — manually maintained.
 *
 * PRODUCTION RECORDS GO IN `publishedOpportunities` BELOW. It is empty on
 * purpose: only add a record once the campaign or placement is genuinely
 * approved and every field shown is accurate. See README → Publishing an
 * opportunity.
 *
 * Example records for development live in ./fixtures/demo-opportunities.ts and
 * are only loaded when DEMO_OPPORTUNITIES=true and no production SITE_URL is
 * set (enforced in src/lib/opportunities.ts).
 */

/** 'board' = storefront sign placement. */
export type OpportunityFormat = 'board' | 'mailer';
export type Audience = 'household' | 'business';

export type OpportunityStatus =
  | 'accepting-enquiries'
  | 'open-for-applications'
  | 'fully-booked'
  | 'completed';

export interface CategorySlot {
  /** e.g. "Real estate", "Restaurant", "Dental". */
  name: string;
  status: 'open' | 'filled';
}

export interface Opportunity {
  slug: string;
  title: string;
  format: OpportunityFormat;
  /** Area slug from src/content/areas.ts */
  area: string;
  /** Optional finer location, e.g. "Dundas" or "Downtown Burlington". */
  locality?: string;
  /** Signs only — the host business name, when the host agreed to be named. */
  venueName?: string;
  /** Signs only — street location, e.g. "King Street West, Westdale". */
  location?: string;
  /** Signs only — when the sign is usually out, e.g. "Daily, 8 am – 6 pm". */
  displayHours?: string;
  /** Print format, e.g. "9 × 12 postcard" or "A-frame, 4 sponsor panels". */
  specs?: string;
  /** Mailers only. */
  audience?: Audience;
  /** Mailers only — confirmed quantity. */
  quantity?: number;
  /** Term (boards) or campaign window (mailers), in plain words. */
  term: string;
  summary: string;
  adSpace?: string;
  artworkDeadline?: string;
  artworkHelp?: string;
  installationWindow?: string;
  categoryRules?: string;
  participationRequirements?: string;
  ifUnavailable?: string;
  /** Exact price per spot. Leave undefined to fall back to the format's "from" anchor. */
  price?: { amountCad: number; basis: string; notes?: string };
  /** Total advertiser spots. Shown with spotsBooked as "4 of 6 booked". */
  spotsTotal?: number;
  /** Keep accurate — update as spots sell. */
  spotsBooked?: number;
  /** Per-category availability, shown as a table. */
  categories?: CategorySlot[];
  status: OpportunityStatus;
  /** ISO date, e.g. "2026-10-01". */
  lastUpdated: string;
  /** Set true only on development fixtures. */
  isExample?: boolean;
}

export const opportunityStatusLabels: Record<OpportunityStatus, string> = {
  'accepting-enquiries': 'Spots available',
  'open-for-applications': 'Founding spots open',
  'fully-booked': 'Fully booked',
  completed: 'Completed',
};

export const audienceLabels: Record<Audience, string> = {
  household: 'Households',
  business: 'Business addresses',
};

export const publishedOpportunities: Opportunity[] = [
  // Add approved opportunities here.
];
