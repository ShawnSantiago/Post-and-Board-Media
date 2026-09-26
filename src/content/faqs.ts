/** Frequently asked questions. `tags` control which pages show each answer. */
export type FaqTag = 'home' | 'boards' | 'mailers' | 'host' | 'contact';

export interface Faq {
  id: string;
  q: string;
  a: string[];
  tags: FaqTag[];
  /** Hidden when the digital-screens feature flag is off. */
  digital?: boolean;
}

export const faqs: Faq[] = [
  {
    id: 'what-is-sign',
    q: 'What is a storefront sign placement?',
    a: [
      'Many local businesses put a sidewalk or A-frame sign outside every day. We provide the host a professional sign: most of it promotes the host’s own specials, and a smaller sponsor section carries ads from a few complementary local businesses. You buy one of those sponsor spaces for a set term.',
    ],
    tags: ['home', 'boards'],
  },
  {
    id: 'who-sees-sign',
    q: 'Who sees a storefront sign?',
    a: [
      'People walking, shopping and spending time on that street — pedestrians, nearby residents and workers, customers heading into the host business, and people passing by. Each placement lists its location and when the sign is usually out, so you can judge whether it suits your customers.',
    ],
    tags: ['boards'],
  },
  {
    id: 'what-is-shared-mailer',
    q: 'What is a shared mailer?',
    a: [
      'One printed postcard or card carrying ads from several local businesses. The advertisers share the cost of design, printing and distribution, and each one gets a defined space.',
    ],
    tags: ['home', 'mailers'],
  },
  {
    id: 'who-finds-advertisers',
    q: 'Who finds the other advertisers?',
    a: ['We do. We organize each campaign and fill it. You just pick an open spot.'],
    tags: ['home', 'mailers'],
  },
  {
    id: 'choose-area',
    q: 'Can I choose the area?',
    a: [
      'Yes. Every sign has a specific street location and every mailer has a defined distribution area. Browse current opportunities, or tell us the neighbourhood you want and we’ll let you know what’s planned there.',
    ],
    tags: ['home', 'mailers', 'boards'],
  },
  {
    id: 'competitor',
    q: 'Will a competitor appear beside my business?',
    a: [
      'Campaigns are organized by category, so each spot is usually one business per category — the listing shows which categories are open. Exactly what’s exclusive is written into your quote for that sign or mailer.',
    ],
    tags: ['home', 'boards', 'mailers'],
  },
  {
    id: 'artwork',
    q: 'Do I need finished artwork?',
    a: [
      'No. Send finished artwork if you have it, or send your logo, text and images and we’ll lay out your ad for you to approve.',
    ],
    tags: ['home', 'boards', 'mailers', 'contact'],
  },
  {
    id: 'board-term',
    q: 'How long does a sign placement run?',
    a: [
      'Each placement has a set term — listed on the opportunity — such as six months. Sponsor panels are printed, so changing artwork mid-term may involve a small replacement cost, which your quote spells out.',
    ],
    tags: ['boards'],
  },
  {
    id: 'prices',
    q: 'How much does it cost?',
    a: [
      'Each opportunity shows its price per spot, and each format page shows typical starting prices. Your quote confirms the total, the term or mailing date, and what’s included before you pay.',
    ],
    tags: ['home', 'boards', 'mailers', 'contact'],
  },
  {
    id: 'booking',
    q: 'How do I book a spot?',
    a: [
      'Pick an opportunity and send an enquiry. We confirm the spot is still open, send a short quote, and your spot is booked once you accept and pay. Then we collect your artwork and handle the rest.',
    ],
    tags: ['home', 'contact', 'boards', 'mailers'],
  },
  {
    id: 'campaign-not-fill',
    q: 'What if a mailer doesn’t fill?',
    a: [
      'Each campaign lists how many spots it needs to go ahead, and your quote explains exactly what happens to your booking if it doesn’t fill in time.',
    ],
    tags: ['mailers'],
  },
  {
    id: 'reporting',
    q: 'What do I get after my campaign runs?',
    a: [
      'Photos of your sign placement once it’s out, or confirmation of the print quantity and distribution date for a mailer.',
    ],
    tags: ['boards', 'mailers'],
  },
  {
    id: 'combine',
    q: 'Can I combine a sign and a mailer?',
    a: [
      'Yes — a sign on a nearby street plus a mailer to the same neighbourhood is a good combination. Each is booked and priced separately.',
    ],
    tags: ['home', 'boards', 'mailers'],
  },
  {
    id: 'digital',
    q: 'Do you offer digital screens?',
    a: ['Not yet. Digital screens may come later — you can register your interest.'],
    tags: ['home'],
    digital: true,
  },
  {
    id: 'host-cost',
    q: 'What does hosting a sign cost?',
    a: [
      'Little or nothing up front. Sponsors in the lower section help cover the cost of the sign, so you get a professional storefront sign for your own specials. The exact arrangement is set out in a simple host agreement.',
    ],
    tags: ['host'],
  },
  {
    id: 'host-content',
    q: 'How much of the sign is mine?',
    a: [
      'Most of it. The top section is yours for specials, menus, events, hours or sales. The sponsor section sits below it.',
    ],
    tags: ['host'],
  },
  {
    id: 'host-control',
    q: 'Can I say no to certain sponsors?',
    a: [
      'Yes. We never place a direct competitor on your sign, and the host agreement lists any categories you’d rather not show.',
    ],
    tags: ['host'],
  },
  {
    id: 'host-daily',
    q: 'What do I need to do each day?',
    a: [
      'Put the sign out when you open and bring it in when you close — the same as any sidewalk sign. We handle sponsor artwork, printing and any replacement panels.',
    ],
    tags: ['host'],
  },
  {
    id: 'host-permit',
    q: 'Do sidewalk signs need a permit?',
    a: [
      'Signs placed on a public sidewalk can be subject to municipal sign rules. We check the requirements for each location before a sign goes out.',
    ],
    tags: ['host', 'boards'],
  },
  {
    id: 'host-fit',
    q: 'Which businesses make good hosts?',
    a: [
      'Storefront businesses on walkable streets that are open most days — cafés, restaurants, bakeries, barbers and salons, convenience and specialty food stores, independent shops, gyms and pet stores. Especially if you already put a sign out.',
    ],
    tags: ['host'],
  },
];

export function faqsFor(tag: FaqTag, digitalEnabled: boolean): Faq[] {
  return faqs.filter((f) => f.tags.includes(tag) && (digitalEnabled || !f.digital));
}
