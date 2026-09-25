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
    id: 'what-is-shared-mailer',
    q: 'What is a shared mailer?',
    a: [
      'A shared mailer is one printed piece — usually a postcard or folded card — carrying ads from several different local businesses. The advertisers share the cost of design coordination, printing and distribution, and each one buys a defined space on it.',
    ],
    tags: ['home', 'mailers'],
  },
  {
    id: 'who-finds-advertisers',
    q: 'Who finds the other advertisers?',
    a: [
      'We do. Post and Board organizes each campaign and brings the advertisers together. You don’t need to recruit anyone — you choose a space in a campaign that suits you.',
    ],
    tags: ['home', 'mailers'],
  },
  {
    id: 'choose-area',
    q: 'Can I choose the area?',
    a: [
      'You tell us where you want to reach, and we match you with suitable campaigns or placements. Each mailer campaign has a defined distribution area, and each board is at a specific venue. If nothing suitable exists yet, we’ll say so rather than sell you something that doesn’t fit.',
    ],
    tags: ['home', 'mailers', 'boards'],
  },
  {
    id: 'choose-host',
    q: 'Can I choose a host location?',
    a: [
      'You can tell us which venues or streets you’d like, and suggest a venue you think would work. Boards only go into approved host venues that have agreed to the arrangement, so the exact options depend on what’s confirmed in your area.',
    ],
    tags: ['boards'],
  },
  {
    id: 'competitor',
    q: 'Will a competitor appear beside my business?',
    a: [
      'Where category exclusivity is offered, it’s stated in the written proposal and applies to that specific board or campaign — not a whole city or every Post and Board product. If exclusivity isn’t listed, assume it isn’t included.',
    ],
    tags: ['home', 'boards', 'mailers'],
  },
  {
    id: 'artwork',
    q: 'Do I need finished artwork?',
    a: [
      'No. You can send finished artwork that meets the size and file requirements, or share your logo, text and images and we’ll coordinate a layout for you to approve. What artwork help is included is listed in your quote.',
    ],
    tags: ['home', 'boards', 'mailers', 'contact'],
  },
  {
    id: 'board-term',
    q: 'How long does a board placement run?',
    a: [
      'Each placement has a set term, stated in the proposal before you commit. Because board ads are printed, changing your artwork mid-term may involve a replacement cost — that’s also confirmed in writing.',
    ],
    tags: ['boards'],
  },
  {
    id: 'campaign-not-fill',
    q: 'What happens if a campaign doesn’t fill?',
    a: [
      'Each campaign proposal states its participation requirements and what happens if they aren’t met — including timing and how any payment is handled. Please read that section before you commit.',
    ],
    tags: ['home', 'mailers'],
  },
  {
    id: 'prices',
    q: 'How are prices confirmed?',
    a: [
      'Pricing depends on the placement, campaign, and advertising space. After an enquiry we send a written quote that lists the placement or coverage, term, artwork support, production and distribution scope, total cost and any conditions. Nothing is booked until you accept it.',
    ],
    tags: ['home', 'boards', 'mailers', 'contact'],
  },
  {
    id: 'reporting',
    q: 'What reporting is included?',
    a: [
      'The proposal states what confirmation you’ll receive for your placement or campaign. We don’t promise response rates, leads or sales, and we don’t provide tracking that isn’t agreed in writing.',
    ],
    tags: ['boards', 'mailers'],
  },
  {
    id: 'combine',
    q: 'Can I combine a board and a mailer?',
    a: [
      'Yes, when the audiences and geography fit. Each placement and mailing is still quoted and committed separately, with its own term, space and price — a board purchase doesn’t automatically include a mailing.',
    ],
    tags: ['home', 'boards', 'mailers'],
  },
  {
    id: 'digital',
    q: 'Is digital screen advertising available?',
    a: [
      'Not currently. Digital screens are something we may offer in the future. You can register interest, but there are no screens, bookings or prices yet.',
    ],
    tags: ['home'],
    digital: true,
  },
  {
    id: 'enquiry-books',
    q: 'Does sending an enquiry book a space?',
    a: [
      'No. An enquiry just starts the conversation. We confirm what’s actually available, send a written quote, and nothing is reserved until you accept it.',
    ],
    tags: ['contact', 'home'],
  },
  {
    id: 'host-cost',
    q: 'Does hosting a board cost anything?',
    a: [
      'Approved venues receive a branded board at no upfront cost once the advertising for it is funded and the placement agreement is signed. The agreement covers the display position, the term and the advertising rules.',
    ],
    tags: ['host'],
  },
  {
    id: 'host-control',
    q: 'Can I say no to certain advertisers?',
    a: [
      'The placement agreement sets out advertising categories and approval rules before anything is installed. We won’t place ads that conflict with those rules or compete directly with your business.',
    ],
    tags: ['host'],
  },
  {
    id: 'host-accept',
    q: 'Will every venue be accepted?',
    a: [
      'No. We look at whether the display position is visible to customers, whether it suits advertisers, and whether a board would genuinely help the venue. We’ll tell you plainly if it isn’t the right fit.',
    ],
    tags: ['host'],
  },
  {
    id: 'host-revenue',
    q: 'Do hosts get paid?',
    a: [
      'The standard arrangement is a useful board for your own specials, funded by the advertisers. Any other terms would be set out in the written agreement — we don’t promise host revenue.',
    ],
    tags: ['host'],
  },
  {
    id: 'host-damage',
    q: 'What if the board gets damaged or needs updating?',
    a: [
      'Contact us and we’ll sort out next steps. Responsibilities for maintenance, repairs and removal are set out in the placement agreement.',
    ],
    tags: ['host'],
  },
];

export function faqsFor(tag: FaqTag, digitalEnabled: boolean): Faq[] {
  return faqs.filter((f) => f.tags.includes(tag) && (digitalEnabled || !f.digital));
}
