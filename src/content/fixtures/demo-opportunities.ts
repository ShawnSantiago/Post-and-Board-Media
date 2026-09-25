/**
 * DEVELOPMENT FIXTURES — NOT REAL OPPORTUNITIES.
 * Fictional records used to test the populated directory. Loaded only when
 * DEMO_OPPORTUNITIES=true without a production SITE_URL. Every record is
 * flagged `isExample` and rendered as a non-bookable example.
 */
import type { Opportunity } from '../opportunities';

export const demoOpportunities: Opportunity[] = [
  {
    slug: 'example-board-cafe-dundas',
    title: 'Example: café specials board',
    format: 'board',
    area: 'hamilton',
    locality: 'Dundas',
    venueName: 'Example Café (fictional)',
    displayPosition: 'Beside the order counter',
    term: '12 months from installation',
    summary: 'A fictional board placement used to preview how a real listing will look.',
    adSpace: 'One of four advertiser panels',
    artworkHelp: 'Basic layout from your logo and text',
    installationWindow: 'Example window only',
    categoryRules: 'One advertiser per category on this board',
    ifUnavailable: 'Explained in the written placement agreement',
    status: 'accepting-enquiries',
    lastUpdated: '2026-09-01',
    isExample: true,
  },
  {
    slug: 'example-mailer-households-burlington',
    title: 'Example: household shared mailer',
    format: 'mailer',
    area: 'burlington',
    audience: 'household',
    term: 'Example mailing window',
    summary: 'A fictional household campaign used to preview how a real listing will look.',
    adSpace: 'One of eight postcard panels',
    artworkDeadline: 'Example deadline',
    categoryRules: 'One advertiser per category in this campaign',
    participationRequirements: 'Confirmed in the campaign proposal',
    status: 'open-for-applications',
    lastUpdated: '2026-09-01',
    isExample: true,
  },
  {
    slug: 'example-mailer-business-oakville',
    title: 'Example: business-address mailer',
    format: 'mailer',
    area: 'oakville',
    audience: 'business',
    term: 'Example mailing window',
    summary: 'A fictional business-address campaign, shown as fully booked.',
    status: 'fully-booked',
    lastUpdated: '2026-08-15',
    isExample: true,
  },
];
