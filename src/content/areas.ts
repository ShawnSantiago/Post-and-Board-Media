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
  'recruiting-hosts': 'Recruiting host venues',
  planning: 'Planning first campaigns',
  'enquiries-only': 'Enquiries welcome',
};

export const areas: Area[] = [
  {
    slug: 'hamilton',
    name: 'Hamilton',
    region: 'City of Hamilton',
    readiness: 'published',
    cardLine: 'Our launch area — including Ancaster, Dundas, Stoney Creek, Waterdown and Binbrook.',
    seo: {
      title: 'Local Advertising in Hamilton | Boards & Shared Mailers | Post and Board Media',
      description:
        'Explore physical advertising boards and shared mailer campaigns for Hamilton businesses. Ask Post and Board Media about areas, artwork, and upcoming opportunities.',
    },
    h1: 'Local advertising in Hamilton',
    intro:
      'Hamilton is where Post and Board Media is starting. We’re organizing the first advertising boards inside local businesses and planning the first shared mailers — and we’d like to hear which parts of the city you want to reach.',
    status: {
      boards: 'recruiting-hosts',
      mailers: 'planning',
      summary:
        'We’re looking for the first host venues and gathering advertiser interest for the first campaigns. No placements are confirmed yet, so every enquiry helps shape where the first boards and mailers go.',
    },
    sections: [
      {
        heading: 'Planning a Hamilton campaign',
        body: [
          'Hamilton covers a lot of ground — the lower city, the Mountain above the escarpment, and former municipalities that each have their own main streets and shopping areas. A campaign works best when it’s planned around the specific part of the city your customers come from, rather than “all of Hamilton.”',
          'When you enquire, tell us the neighbourhoods, streets or communities you care about. For a board, that helps us look for a host venue your customers actually visit. For a mailer, it helps us define a distribution area that matches your service radius.',
        ],
      },
      {
        heading: 'Advertising boards in Hamilton',
        body: [
          'We’re looking for customer-facing host venues — restaurants, cafés and similar businesses — where a specials board would be genuinely useful. Each approved board has a large area for the venue’s own specials and a designated section for local advertisers.',
          'If you advertise, your placement is tied to a specific approved venue and display position, confirmed in writing before anything is produced.',
        ],
      },
      {
        heading: 'Shared mailers in Hamilton',
        body: [
          'Shared mailers are organized as individual campaigns. Each one has its own distribution area, recipient type (households or business addresses), quantity, artwork deadline and mailing window. You buy a defined space in a campaign — you don’t need to find the other advertisers.',
        ],
      },
    ],
    communities: {
      heading: 'Communities within Hamilton',
      intro:
        'These communities are part of the City of Hamilton, and each has its own character. Mention the one you’re interested in when you enquire.',
      items: [
        {
          name: 'Ancaster',
          slug: 'ancaster',
          body: 'Centred on the Wilson Street village core, with residential areas spreading across the escarpment. A good fit for businesses serving nearby households.',
        },
        {
          name: 'Dundas',
          slug: 'dundas',
          body: 'A walkable downtown along King Street West with many independent shops and restaurants — the kind of setting where an in-venue board can suit local service businesses.',
        },
        {
          name: 'Stoney Creek',
          slug: 'stoney-creek',
          body: 'Stretches from the lakeshore up above the escarpment, so “Stoney Creek” can mean quite different areas. Tell us whether you mean lower or upper Stoney Creek.',
        },
        {
          name: 'Waterdown',
          slug: 'waterdown',
          body: 'In Flamborough, with its village area along Dundas Street. Useful for businesses serving north-west Hamilton and nearby rural areas.',
        },
        {
          name: 'Binbrook',
          slug: 'binbrook',
          body: 'A growing community in Glanbrook, south of the Hamilton Mountain. Mailer campaigns here would be planned around specific residential areas.',
        },
      ],
    },
    audiences: {
      household:
        'Household campaigns go to residential addresses in a defined part of the city. Useful for trades, home services, restaurants, clinics and other businesses that serve people near where they live.',
      business:
        'Business-address campaigns go to commercial addresses — for example, a business district or an industrial area. Useful for B2B services such as cleaning, catering, printing or IT support. These are separate campaigns from household mailers.',
    },
    neighbours: ['burlington', 'grimsby', 'brantford'],
    faqs: [
      {
        q: 'Can I choose a specific Hamilton neighbourhood?',
        a: 'Yes — tell us which neighbourhoods or communities you want to reach. Each mailer campaign has a defined distribution area, and each board is at a specific venue. We’ll tell you honestly if we don’t have something suitable there yet.',
      },
      {
        q: 'Are there Hamilton boards available right now?',
        a: 'Not yet. We’re looking for the first host venues. If you enquire now, we’ll contact you as suitable placements are confirmed.',
      },
    ],
  },
  {
    slug: 'burlington',
    name: 'Burlington',
    region: 'Halton Region',
    readiness: 'published',
    cardLine: 'Accepting advertiser enquiries and suggestions for host venues.',
    seo: {
      title: 'Shared Mailers & Advertising Boards in Burlington | Post and Board Media',
      description:
        'Ask about shared mailer campaigns and in-venue advertising boards for Burlington businesses. Tell Post and Board Media which parts of Burlington you want to reach.',
    },
    h1: 'Shared mailers and advertising boards in Burlington',
    intro:
      'Post and Board Media is launching in Hamilton, right next door, and we’re accepting enquiries from Burlington businesses now. Tell us who you want to reach and we’ll let you know when a suitable campaign or placement comes together.',
    status: {
      boards: 'enquiries-only',
      mailers: 'enquiries-only',
      summary:
        'No Burlington campaigns are confirmed yet. We’re gathering advertiser interest and host-venue suggestions to decide where the first Burlington placements make sense.',
    },
    sections: [
      {
        heading: 'Planning around Burlington’s areas',
        body: [
          'Burlington sits between Hamilton and Oakville, with the downtown around Brant Street near the waterfront, established neighbourhoods like Aldershot in the west, and newer residential areas to the north. A campaign aimed at downtown foot traffic looks very different from one aimed at households in north Burlington.',
          'When you enquire, name the neighbourhoods or streets that matter to your business. If your customers also come from Hamilton or Oakville, say so — a combined plan may make more sense than one city on its own.',
        ],
      },
      {
        heading: 'Shared mailers for Burlington businesses',
        body: [
          'A shared mailer lets several non-competing businesses split the cost of printing and distribution. Each campaign lists its distribution area, whether it goes to households or business addresses, the quantity, your ad space, the artwork deadline and the mailing window — before you commit.',
          'Where category exclusivity is offered, it applies to that one campaign. For example, a campaign might include only one landscaper — but that doesn’t cover every Post and Board product or all of Burlington.',
        ],
      },
      {
        heading: 'Know a Burlington venue that could host a board?',
        body: [
          'If you run — or regularly visit — a restaurant, café or other customer-facing business in Burlington that could use a better specials board, suggest it. Hosting is subject to approval and a written placement agreement.',
        ],
      },
    ],
    audiences: {
      household:
        'Household campaigns reach residential addresses in a defined part of Burlington. Most useful for businesses that serve people close to home.',
      business:
        'Business-address campaigns reach commercial addresses, such as those in a business park or along a commercial corridor. They’re planned separately from household mailers, and we never combine the two into one reach figure.',
    },
    neighbours: ['hamilton', 'oakville', 'milton'],
  },
  {
    slug: 'oakville',
    name: 'Oakville',
    region: 'Halton Region',
    readiness: 'published',
    cardLine: 'Accepting advertiser enquiries for boards and shared mailers.',
    seo: {
      title: 'Advertising Boards in Oakville | Shared Mailers | Post and Board Media',
      description:
        'Enquire about advertising boards inside Oakville businesses and shared mailer campaigns. Post and Board Media helps local businesses advertise in a defined area.',
    },
    h1: 'Advertising boards and shared mailers in Oakville',
    intro:
      'Oakville businesses can enquire now about in-venue advertising boards and shared mailers. We’re launching in Hamilton first, and we’ll build Oakville campaigns around real advertiser interest and suitable host venues.',
    status: {
      boards: 'enquiries-only',
      mailers: 'enquiries-only',
      summary:
        'We don’t have confirmed Oakville placements yet. Enquiries help us decide which parts of Oakville to plan for first.',
    },
    sections: [
      {
        heading: 'Choosing where in Oakville',
        body: [
          'Oakville has several distinct commercial areas — Downtown Oakville along Lakeshore Road, Kerr Village, Bronte Village, and plazas across the north and west of town. A board inside a venue in one of these areas reaches a different crowd than a mailer to nearby homes.',
          'Tell us where your customers are. If you serve all of Oakville, we can still talk about which area makes sense for a first placement rather than trying to cover everything at once.',
        ],
      },
      {
        heading: 'Advertising boards inside Oakville venues',
        body: [
          'Boards are installed only at approved host venues. The venue keeps most of the board for its own specials or announcements, and advertisers share a smaller, clearly designed section. Each placement specifies the venue, display position, term, ad size and artwork requirements in writing.',
        ],
      },
      {
        heading: 'Shared mailers in Oakville',
        body: [
          'Mailer campaigns are planned one at a time, each with a defined area and recipient type. You join a campaign and buy a defined space; we coordinate the artwork, printing and distribution through appropriate providers.',
        ],
      },
    ],
    audiences: {
      household:
        'Household campaigns reach residential addresses within a defined part of Oakville — useful for local services, restaurants, fitness, health and home businesses.',
      business:
        'Business-address campaigns reach commercial addresses and are planned as separate campaigns, for businesses that sell to other businesses.',
    },
    neighbours: ['burlington', 'milton', 'mississauga'],
  },
  {
    slug: 'milton',
    name: 'Milton',
    region: 'Halton Region',
    readiness: 'draft',
    cardLine: 'Enquiries welcome.',
    seo: {
      title: 'Local Advertising in Milton | Post and Board Media',
      description: 'Enquire about advertising boards and shared mailers in Milton.',
    },
    h1: 'Local advertising in Milton',
    intro:
      'We’re accepting enquiries from Milton businesses while we launch in Hamilton. Tell us where you want to advertise and we’ll be in touch when something suitable is planned.',
    status: { boards: 'enquiries-only', mailers: 'enquiries-only', summary: 'No Milton campaigns are planned yet.' },
    sections: [],
    audiences: {
      household: 'Household campaigns reach residential addresses in a defined area.',
      business: 'Business-address campaigns reach commercial addresses and are planned separately.',
    },
    neighbours: ['oakville', 'burlington'],
  },
  {
    slug: 'grimsby',
    name: 'Grimsby',
    region: 'Niagara Region',
    readiness: 'draft',
    cardLine: 'Enquiries welcome.',
    seo: {
      title: 'Local Advertising in Grimsby | Post and Board Media',
      description: 'Enquire about advertising boards and shared mailers in Grimsby.',
    },
    h1: 'Local advertising in Grimsby',
    intro:
      'We’re accepting enquiries from Grimsby businesses while we launch in Hamilton. Tell us where you want to advertise and we’ll be in touch when something suitable is planned.',
    status: { boards: 'enquiries-only', mailers: 'enquiries-only', summary: 'No Grimsby campaigns are planned yet.' },
    sections: [],
    audiences: {
      household: 'Household campaigns reach residential addresses in a defined area.',
      business: 'Business-address campaigns reach commercial addresses and are planned separately.',
    },
    neighbours: ['hamilton'],
  },
  {
    slug: 'brantford',
    name: 'Brantford',
    region: 'Brant',
    readiness: 'draft',
    cardLine: 'Enquiries welcome.',
    seo: {
      title: 'Local Advertising in Brantford | Post and Board Media',
      description: 'Enquire about advertising boards and shared mailers in Brantford.',
    },
    h1: 'Local advertising in Brantford',
    intro:
      'We’re accepting enquiries from Brantford businesses while we launch in Hamilton. Tell us where you want to advertise and we’ll be in touch when something suitable is planned.',
    status: { boards: 'enquiries-only', mailers: 'enquiries-only', summary: 'No Brantford campaigns are planned yet.' },
    sections: [],
    audiences: {
      household: 'Household campaigns reach residential addresses in a defined area.',
      business: 'Business-address campaigns reach commercial addresses and are planned separately.',
    },
    neighbours: ['hamilton'],
  },
  {
    slug: 'mississauga',
    name: 'Mississauga',
    region: 'Peel Region',
    readiness: 'draft',
    cardLine: 'Enquiries welcome.',
    seo: {
      title: 'Local Advertising in Mississauga | Post and Board Media',
      description: 'Enquire about advertising boards and shared mailers in Mississauga.',
    },
    h1: 'Local advertising in Mississauga',
    intro:
      'We’re accepting enquiries from Mississauga businesses while we launch in Hamilton. Tell us where you want to advertise and we’ll be in touch when something suitable is planned.',
    status: { boards: 'enquiries-only', mailers: 'enquiries-only', summary: 'No Mississauga campaigns are planned yet.' },
    sections: [],
    audiences: {
      household: 'Household campaigns reach residential addresses in a defined area.',
      business: 'Business-address campaigns reach commercial addresses and are planned separately.',
    },
    neighbours: ['oakville'],
  },
];

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
