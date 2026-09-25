/**
 * Central business settings. Edit these values rather than hard-coding
 * details in pages. `null` means "not confirmed yet" — the site hides the
 * field instead of inventing a value. See README → Launch blockers.
 */
export const site = {
  name: 'Post and Board Media',
  shortName: 'Post and Board',
  tagline: 'Shared space. Local reach.',
  positioning:
    'We bring businesses together on shared mailers and advertising boards, making local advertising easier to organize.',
  owner: 'Shawn Santiago',
  locale: 'en-CA',
  currency: 'CAD',

  /** Public contact details. Leave null until confirmed. */
  contact: {
    email: null as string | null,
    phone: null as string | null,
    /** Shown as a region, never a street address. */
    serviceRegion: 'Hamilton and surrounding communities, Ontario',
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
  launchLine: 'Launching in Hamilton and accepting enquiries from surrounding communities.',

  features: {
    /**
     * Shows a small "future digital screens" interest section and an
     * interest-only option on the enquiry form. Never adds booking or pricing.
     */
    digitalScreensInterest: true,
  },
} as const;

export type Site = typeof site;
