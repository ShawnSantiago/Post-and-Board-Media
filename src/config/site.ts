/**
 * Central business settings. Edit these values rather than hard-coding
 * details in pages. `null` means "not confirmed yet" — the site hides the
 * field instead of inventing a value. See README → Launch blockers.
 */
export const site = {
  name: 'Post and Board Media',
  shortName: 'Post and Board',
  tagline: 'Shared space. Local reach.',
  positioning: 'Post and Board Media helps local businesses share the cost of neighbourhood advertising.',
  /** One-paragraph company description (About page, structured data). */
  description:
    'Post and Board Media is a Hamilton-based local advertising company run by Shawn Santiago. We organize shared advertising campaigns for small businesses, including neighbourhood mailers and sponsored storefront signs.',
  owner: 'Shawn Santiago',
  locale: 'en-CA',
  currency: 'CAD',

  /** Public contact details. Leave null until confirmed. */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    /** Shown as a region, never a street address. */
    serviceRegion: 'Hamilton, Ontario',
  },

  /**
   * Optional relationship line for the About page. Keep `show: false` until
   * the wording and legal relationship are confirmed.
   */
  parkdaleDigital: {
    show: false,
    text: 'Post and Board Media is developed alongside Parkdale Digital.',
    url: null as string | null,
  },

  /** Launch-stage line used on the homepage hero and elsewhere. */
  launchLine: 'Launching in Hamilton.',
  /** Launch city. Other areas stay as noindex previews until they have real inventory. */
  launchCity: 'Hamilton',

  features: {
    /**
     * Shows a small "future digital screens" interest section and an
     * interest-only option on the enquiry form. Never adds booking or pricing.
     */
    digitalScreensInterest: true,
  },
} as const;

export type Site = typeof site;
