/**
 * DEVELOPMENT FIXTURES — NOT REAL OPPORTUNITIES.
 * Fictional records used to preview the populated directory. Loaded only when
 * DEMO_OPPORTUNITIES=true without a production SITE_URL. Every record is
 * flagged `isExample` and rendered as a non-bookable example.
 */
import type { Opportunity } from '../opportunities';

export const demoOpportunities: Opportunity[] = [
  {
    slug: 'example-west-hamilton-household-mailer',
    title: 'Example: West Hamilton household mailer',
    format: 'mailer',
    area: 'hamilton',
    locality: 'West Hamilton',
    audience: 'household',
    quantity: 5000,
    specs: '9 × 12 postcard',
    term: 'Example mailing month',
    summary: 'A fictional campaign showing how a real mailer listing looks.',
    artworkDeadline: 'Example deadline',
    spotsTotal: 6,
    spotsBooked: 2,
    categories: [
      { name: 'Real estate', status: 'filled' },
      { name: 'Restaurant', status: 'open' },
      { name: 'Dental', status: 'open' },
      { name: 'Home services', status: 'filled' },
      { name: 'Fitness', status: 'open' },
      { name: 'Other local service', status: 'open' },
    ],
    status: 'accepting-enquiries',
    lastUpdated: '2026-09-01',
    isExample: true,
  },
  {
    slug: 'example-cafe-sidewalk-sign',
    title: 'Example: café sidewalk sign',
    format: 'board',
    area: 'hamilton',
    locality: 'Westdale',
    venueName: 'Example Café (fictional)',
    location: 'Example main street',
    displayHours: 'During business hours',
    specs: 'A-frame sign, 4 sponsor panels',
    term: '6-month placement',
    summary: 'A fictional sign placement showing how a real listing looks.',
    spotsTotal: 4,
    spotsBooked: 3,
    status: 'open-for-applications',
    lastUpdated: '2026-09-01',
    isExample: true,
  },
  {
    slug: 'example-business-mailer',
    title: 'Example: business-address mailer',
    format: 'mailer',
    area: 'hamilton',
    audience: 'business',
    specs: '6 × 9 postcard',
    term: 'Example mailing month',
    summary: 'A fictional business-address campaign, shown as fully booked.',
    spotsTotal: 6,
    spotsBooked: 6,
    status: 'fully-booked',
    lastUpdated: '2026-08-15',
    isExample: true,
  },
];
