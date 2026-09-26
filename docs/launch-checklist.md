# Launch checklist (private — not published)

Business decisions and reviews still needed. The public Privacy and Terms pages use general wording that points to each quote where these aren't decided yet. Update the pages when each one is settled.

## Legal and policy
- [ ] Have a lawyer review `/terms` and `/privacy` (neither has been legally reviewed).
- [ ] Confirm the legal entity or trade name, its registration, and that Ontario is the governing law.
- [ ] Payment terms (deposit or full payment, when it's due, accepted methods) and HST treatment.
- [ ] Cancellation and refund policy for sign placements and mailer spots.
- [ ] What happens to bookings when a mailer doesn't reach its minimum spots.
- [ ] Artwork deadlines, and replacement-panel costs for signs.
- [ ] Host agreement: term, where the sign sits, daily display, maintenance, damage, removal, excluded sponsor categories.
- [ ] Advertising content rules and prohibited categories.
- [ ] **Municipal sidewalk-sign rules**: check the City of Hamilton's requirements (permits, placement, size) for signs on public sidewalks at each host location.
- [ ] Privacy: name the hosting provider and the tools n8n forwards enquiries to, where their data is stored, and a retention period.

## Commitments the website now makes (confirm or edit)
- [ ] Sponsor spots are one business per category on each sign or mailer.
- [ ] Hosts never get a direct competitor in their sponsor section.
- [ ] Hosts receive the sign for "little or no upfront cost".
- [ ] Advertisers receive photos of their placed sign, or print and distribution confirmation for mailers.
- [ ] We check sidewalk-sign requirements for each location.

## Operations
- [ ] Production domain set as `SITE_URL`.
- [ ] n8n workflow live: acknowledgement email to the enquirer, notification to you, lead stored (for example in Google Sheets).
- [ ] Public contact email in `src/config/site.ts`.
- [ ] Price anchors (`fromCad`) in `src/content/pricing.ts`.
- [ ] First real opportunities in `src/content/opportunities.ts`.
- [ ] Owner photo for the About page.
- [ ] Photos of the first real sign (#001) and first real mailer (#001).
