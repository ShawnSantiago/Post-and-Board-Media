import { DEMO_OPPORTUNITIES, SITE_URL } from 'astro:env/server';
import { publishedOpportunities, type Opportunity } from '../content/opportunities';
import { demoOpportunities } from '../content/fixtures/demo-opportunities';

/**
 * Demo fixtures can never ship to a production domain: if both flags are set
 * the build fails loudly instead of silently publishing example inventory.
 */
if (DEMO_OPPORTUNITIES && SITE_URL) {
  throw new Error(
    'DEMO_OPPORTUNITIES=true cannot be combined with a production SITE_URL. Unset DEMO_OPPORTUNITIES.',
  );
}

export const demoMode = DEMO_OPPORTUNITIES && !SITE_URL;

export const opportunities: Opportunity[] = [
  ...publishedOpportunities.filter((o) => !o.isExample),
  ...(demoMode ? demoOpportunities : []),
];

export const isEnquirable = (o: Opportunity) =>
  !o.isExample && (o.status === 'accepting-enquiries' || o.status === 'open-for-applications');

export function getOpportunity(slug: string) {
  return opportunities.find((o) => o.slug === slug);
}
