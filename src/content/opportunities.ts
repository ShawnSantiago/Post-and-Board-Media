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

export type OpportunityFormat = 'board' | 'mailer';
export type Audience = 'household' | 'business';

export type OpportunityStatus =
  | 'accepting-enquiries'
  | 'open-for-applications'
  | 'fully-booked'
  | 'completed';

export interface Opportunity {
  slug: string;
  title: string;
  format: OpportunityFormat;
  /** Area slug from src/content/areas.ts */
  area: string;
  /** Optional finer location, e.g. "Dundas" or "Downtown Burlington". */
  locality?: string;
  /** Boards only — the verified host venue name, when the host agreed to be named. */
  venueName?: string;
  /** Boards only — where the board hangs inside the venue. */
  displayPosition?: string;
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
  /** Leave undefined unless an approved price exists — then "Request pricing" shows. */
  price?: { amountCad: number; basis: string; notes?: string };
  /** Only set if maintained accurately. Otherwise omitted from the page. */
  spacesAvailable?: number;
  status: OpportunityStatus;
  /** ISO date, e.g. "2026-10-01". */
  lastUpdated: string;
  /** Set true only on development fixtures. */
  isExample?: boolean;
}

export const opportunityStatusLabels: Record<OpportunityStatus, string> = {
  'accepting-enquiries': 'Accepting enquiries',
  'open-for-applications': 'Open for applications',
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
