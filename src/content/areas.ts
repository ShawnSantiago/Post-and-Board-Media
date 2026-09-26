/**
 * Service areas. Each record drives /areas/[slug].
 *
 * readiness:
 *   'published' — indexable, in the sitemap, linked from navigation.
 *   'draft'     — built as a short noindex preview (enquiries still welcome),
 *                 excluded from the sitemap. Promote to 'published' only once
 *                 the page has genuinely useful, verified local content.
 *
 * Only include facts you can verify. Do not add household counts, foot
 * traffic, demographics, postal routes or partnerships unless confirmed.
 */

export type Readiness = 'draft' | 'published';

export type ServiceStatus =
  | 'accepting-enquiries'
  | 'recruiting-hosts'
  | 'planning'
  | 'enquiries-only';

export interface AreaSection {
  heading: string;
  body: string[];
}

export interface Community {
  name: string;
  slug: string;
  body: string;
}

export interface Area {
  slug: string;
  name: string;
  /** Plain-language description of where it sits, e.g. region. */
  region: string;
  readiness: Readiness;
  /** One-line summary used on cards. */
  cardLine: string;
  seo: { title: string; description: string };
  h1: string;
  intro: string;
  status: {
    boards: ServiceStatus;
    mailers: ServiceStatus;
    /** Short, honest description of where things stand. */
    summary: string;
  };
  sections: AreaSection[];
  communities?: { heading: string; intro: string; items: Community[] };
  audiences: { household: string; business: string };
  neighbours: string[];
  faqs?: { q: string; a: string }[];
}

export const statusLabels: Record<ServiceStatus, string> = {
  'accepting-enquiries': 'Accepting enquiries',
  'recruiting-hosts': 'Founding host storefronts wanted',
  planning: 'Founding spots open',
  'enquiries-only': 'Coming later',
};

export const areas: Area[] = [
  {
    slug: 'hamilton',
    name: 'Hamilton',
    region: 'City of Hamilton',
    readiness: 'published',
    cardLine: 'Our launch market — sidewalk signs on walkable Hamilton streets and shared mailers across the city.',
    seo: {
      title: 'Local Advertising in Hamilton | Storefront Signs & Shared Mailers | Post and Board',
      description:
        'Advertise on sidewalk signs outside Hamilton storefronts or join a shared neighbourhood mailer. Post and Board Media organizes affordable, shared local advertising in Hamilton.',
    },
    h1: 'Local advertising in Hamilton',
    intro:
      'Hamilton is our home market. We place sponsor ads on the sidewalk signs outside local storefronts and organize shared mailers to Hamilton homes and businesses — so you can reach a neighbourhood without paying for a whole campaign.',
    status: {
      boards: 'recruiting-hosts',
      mailers: 'planning',
      summary:
        'We’re lining up the first host storefronts and shared mailers now. Claim a founding spot in your category before the first campaigns are listed.',
    },
    sections: [
      {
        heading: 'Where storefront signs work in Hamilton',
        body: [
          'Sidewalk signs work best on streets people walk: Locke Street South, James Street North, Ottawa Street North, Westdale Village, Concession Street, King Street West in Dundas and Wilson Street in Ancaster. Those are the kinds of streets where we look for host storefronts — cafés, bakeries, barbers, independent shops — that already put a sign out every day.',
          'A sponsor spot puts your business in front of people walking, shopping and eating on that street, including customers heading into the host business and people who live and work nearby.',
        ],
      },
      {
        heading: 'Shared mailers across Hamilton',
        body: [
          'Mailers reach a defined part of the city — for example West Hamilton, the Mountain or Stoney Creek — and go either to households or to business addresses. Each campaign lists its area, quantity, format and open categories, so you can see exactly who you’ll reach before you book.',
        ],
      },
      {
        heading: 'Pair a sign with a mailer',
        body: [
          'A sponsor spot on a sign on your street plus a mailer to the surrounding homes is a strong local combination: people see you on their walk and in their mailbox.',
        ],
      },
    ],
    communities: {
      heading: 'Communities within Hamilton',
      intro: 'Each community has its own main street and its own customers. Tell us which ones matter to you.',
      items: [
        {
          name: 'Ancaster',
          slug: 'ancaster',
          body: 'The Wilson Street village core is walkable and busy with independent shops and restaurants — a natural fit for storefront signs, with established neighbourhoods around it for mailers.',
        },
        {
          name: 'Dundas',
          slug: 'dundas',
          body: 'King Street West is one of the region’s best-known walkable downtowns, full of independent businesses and foot traffic — ideal for sidewalk sign placements.',
        },
        {
          name: 'Stoney Creek',
          slug: 'stoney-creek',
          body: 'Stretches from the lakeshore to above the escarpment, so campaigns are planned around specific neighbourhoods. A strong area for household mailers.',
        },
        {
          name: 'Waterdown',
          slug: 'waterdown',
          body: 'The village area along Dundas Street is walkable and local, with growing residential neighbourhoods around it for mailers.',
        },
        {
          name: 'Binbrook',
          slug: 'binbrook',
          body: 'A growing residential community in Glanbrook, south of the Mountain — best reached with household mailers.',
        },
      ],
    },
    audiences: {
      household:
        'Household mailers reach residential addresses in a defined part of Hamilton — ideal for restaurants, trades, clinics, fitness studios and other businesses that serve people near home.',
      business:
        'Business-address mailers reach commercial addresses, such as a business district or industrial area — ideal for cleaning, catering, IT, printing and other B2B services.',
    },
    neighbours: ['burlington', 'grimsby', 'brantford'],
    faqs: [
      {
        q: 'Can I choose a specific street or neighbourhood?',
        a: 'Yes. Each sign is on a specific street and each mailer covers a defined area. Tell us where your customers are and we’ll match you with the right placement.',
      },
      {
        q: 'How do I get a founding spot?',
        a: 'Send an enquiry with your neighbourhood and business category. Founding advertisers get first pick of categories on the first Hamilton signs and mailers.',
      },
    ],
  },
  comingLater('burlington', 'Burlington', 'Halton Region', ['hamilton', 'oakville', 'milton']),
  comingLater('oakville', 'Oakville', 'Halton Region', ['burlington', 'milton', 'mississauga']),
  comingLater('milton', 'Milton', 'Halton Region', ['oakville', 'burlington']),
  comingLater('grimsby', 'Grimsby', 'Niagara Region', ['hamilton']),
  comingLater('brantford', 'Brantford', 'Brant', ['hamilton']),
  comingLater('mississauga', 'Mississauga', 'Peel Region', ['oakville']),
];

/**
 * Short noindex preview for areas we'll expand into after Hamilton. Promote an
 * area by replacing its line with a full record (see Hamilton) and setting
 * readiness to 'published' once it has real inventory.
 */
function comingLater(slug: string, name: string, region: string, neighbours: string[]): Area {
  return {
    slug,
    name,
    region,
    readiness: 'draft',
    cardLine: 'Coming after Hamilton.',
    seo: {
      title: `Local Advertising in ${name} | Post and Board Media`,
      description: `Storefront sign placements and shared mailers are coming to ${name}. Tell Post and Board Media you’re interested.`,
    },
    h1: `Local advertising in ${name}`,
    intro: `We’re launching in Hamilton first, and ${name} is on our list for what comes next. Tell us where you want to advertise and you’ll be first to hear when ${name} signs and mailers open.`,
    status: { boards: 'enquiries-only', mailers: 'enquiries-only', summary: `${name} campaigns will follow our Hamilton launch.` },
    sections: [],
    audiences: {
      household: 'Household mailers reach residential addresses in a defined area.',
      business: 'Business-address mailers reach commercial addresses and are planned separately.',
    },
    neighbours,
  };
}

export const publishedAreas = areas.filter((a) => a.readiness === 'published');
export const draftAreas = areas.filter((a) => a.readiness === 'draft');

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

/** Options for enquiry form "target area" selects. */
export const areaOptions: { value: string; label: string }[] = [
  ...areas.map((a) => ({ value: a.slug, label: a.name })),
  ...(areas.find((a) => a.slug === 'hamilton')?.communities?.items ?? []).map((c) => ({
    value: `hamilton-${c.slug}`,
    label: `${c.name} (Hamilton)`,
  })),
  { value: 'other', label: 'Somewhere else' },
  { value: 'not-sure', label: 'Not sure yet' },
];

export function areaLabel(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  return areaOptions.find((o) => o.value === value)?.label;
}
