# Post and Board Media — website

Marketing site for **Post and Board Media** (*Shared space. Local reach.*): advertising boards inside local businesses and shared mailers. It's for advertiser enquiries and host-venue applications. It is not a booking platform.

- **Stack:** [Astro](https://astro.build). Every page is pre-rendered to static HTML. Only `/api/enquiry` runs on the server.
- **Hosting:** Vercel works out of the box. Any Node 22+ host also works, using `npm start`.
- **No database, no accounts, no paid APIs required.**

## Run it

```bash
npm install
cp .env.example .env      # optional; see "Configuration"
npm run dev               # http://localhost:4321
```

| Command | What it does |
| --- | --- |
| `npm run build` | Builds static pages and the enquiry server route into `dist/` |
| `npm start` | Runs the built site as a standalone Node server (`PORT`, `HOST` env vars) |
| `npm run check` | Astro and TypeScript type checks |
| `npm run lint` | ESLint |
| `npm run verify` | Checks the built output: no invented prices or claims, noindex/canonical rules, sitemap contents, no demo data in production, no secrets in client JS |
| `npm test` | All of the above, in order |

## Deploy

**Vercel (recommended).** Import the repo. The build detects Vercel (`VERCEL=1`) and switches to the Vercel adapter automatically. Set the environment variables below in *Project → Settings → Environment Variables*, then redeploy.

**Any Node host.** Run `npm ci && npm run build`, then `npm start`. Put it behind your usual HTTPS proxy.

Set environment variables **before building**. `SITE_URL` controls canonicals, the sitemap and `robots.txt` at build time.

## Configuration (environment variables)

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | The production domain you own, e.g. `https://www.example.com`. **Leave empty for previews.** Without it, every page is `noindex`, there are no canonicals, the sitemap is empty and `robots.txt` disallows crawling. Never set it to a domain you don't own. |
| `ENQUIRY_WEBHOOK_URL` | Form delivery: the n8n Webhook node's Production URL (see below). Any HTTPS endpoint that accepts a JSON POST also works. |
| `ENQUIRY_WEBHOOK_HEADER_NAME`, `ENQUIRY_WEBHOOK_HEADER_VALUE` | Optional shared-secret header sent with every webhook call. Match it with n8n *Header Auth*. |
| `RESEND_API_KEY`, `ENQUIRY_EMAIL_TO`, `ENQUIRY_EMAIL_FROM` | Optional: also, or instead, email each enquiry via [Resend](https://resend.com). `FROM` must use a domain verified in Resend. `TO` can be a comma-separated list. |
| `DEMO_OPPORTUNITIES` | `true` shows fictional example listings, for development only. The build **fails** if this is combined with `SITE_URL`. |

Secrets are read only on the server (`astro:env/server`) and never reach the browser. `npm run verify` checks this too.

### Connecting the forms to n8n

The forms post to an [n8n](https://n8n.io) Webhook node. From there you can route enquiries anywhere: email, Google Sheets, Slack or a CRM.

1. **Import the workflow.** In n8n, go to *Workflows → Import from File* and choose `n8n/post-and-board-enquiries.workflow.json`. It contains a **Website enquiry** webhook (`POST /webhook/post-and-board-enquiry`), a **Confirm to website** response node, and setup notes.
2. **Secure it.** In the webhook node, create a *Header Auth* credential. Use a header name such as `X-Post-And-Board-Key` and a long random value.
3. **Add your actions** between the two nodes, for example Gmail or *Send Email*. Handy expressions:
   - `{{ $json.body.subject }}`, e.g. "Advertiser enquiry: Jo's Bakery — Dundas (Hamilton)"
   - `{{ $json.body.summaryText }}`, every field as readable lines
   - `{{ $json.body.replyTo }}`, the enquirer's email, for *Reply-To*
   - `{{ $json.body.type }}`, `advertiser` or `host`, for routing with an IF or Switch node
   - `{{ $json.body.fields.business }}`, `{{ $json.body.fields.areaName }}` and so on
4. **Activate** the workflow and copy the webhook's **Production URL**. It contains `/webhook/`, not `/webhook-test/`.
5. **Set the environment variables** on the site host (e.g. Vercel → Settings → Environment Variables), then redeploy:

   ```
   ENQUIRY_WEBHOOK_URL=https://your-n8n.example.com/webhook/post-and-board-enquiry
   ENQUIRY_WEBHOOK_HEADER_NAME=X-Post-And-Board-Key
   ENQUIRY_WEBHOOK_HEADER_VALUE=<the same secret as the n8n credential>
   ```

6. **Test** by sending an enquiry from `/contact` and from `/host-a-board`. Each should appear under *Executions* in n8n.

The site shows "sent" only when n8n answers with a 2xx status. Because the workflow responds from the last node, a failing email or Sheets step makes the visitor see "not sent — please try again" instead of a false confirmation. An inactive workflow (404) or a wrong secret (403) is treated the same way, and the error is logged on the server.

With no destination configured, the forms show *"Preview: this form isn't connected yet"*. Pages confirm the real status with `GET /api/enquiry`, so the notice stays accurate even when env vars are only set at runtime.

**Email instead of, or as well as, n8n.** Set `RESEND_API_KEY`, `ENQUIRY_EMAIL_TO` and `ENQUIRY_EMAIL_FROM` to email each enquiry through [Resend](https://resend.com). If both are configured, an enquiry counts as sent when either one succeeds.

The payload n8n receives:

```json
{
  "type": "advertiser",
  "submittedAt": "2026-09-25T20:05:12.657Z",
  "sourcePage": "/areas/hamilton",
  "fields": { "name": "Jo", "business": "Jo's Bakery", "email": "jo@example.com", "area": "hamilton-dundas", "areaName": "Dundas (Hamilton)", "format": "board", "opportunity": "…" },
  "updatesOptIn": false,
  "subject": "Advertiser enquiry: Jo's Bakery — Dundas (Hamilton)",
  "replyTo": "jo@example.com",
  "summaryText": "Name: Jo\nBusiness name: Jo's Bakery\n…"
}
```

Host enquiries carry `venueName`, `name`, `email`, `area`, `venueType`, `website` and `message`. `updatesOptIn` records the separate, unticked-by-default checkbox for opportunity updates; nobody is subscribed automatically. If you store enquiries in n8n (for example in Sheets), mention that in the privacy notice.

Spam protection is a hidden honeypot field plus Astro's built-in origin check on POSTs. If spam becomes a problem, add a CAPTCHA or rate limiting in `src/pages/api/enquiry.ts`.

## Editing content

All business content lives in plain TypeScript files. There's no CMS.

| File | Contents |
| --- | --- |
| `src/config/site.ts` | Name, tagline, owner, contact email and phone (`null` until confirmed), the launch line, the optional Parkdale Digital line (`show: false`), feature flags |
| `src/content/services.ts` | Format options, budget and timing ranges, venue types |
| `src/content/areas.ts` | Area pages: copy, status, readiness, Hamilton communities, neighbours |
| `src/content/opportunities.ts` | **Production opportunity records. Empty on purpose.** |
| `src/content/fixtures/demo-opportunities.ts` | Fictional development fixtures. They never ship to production. |
| `src/content/faqs.ts` | FAQs, tagged by the page they appear on |
| `src/content/pricing.ts` | Price records, hidden until `approved: true` |
| `src/pages/privacy.astro`, `src/pages/terms.astro` | Draft legal pages with "Owner review" markers |

### Publishing an opportunity

Only add a record once the placement or campaign is genuinely approved and every field is accurate.

1. Open `src/content/opportunities.ts` and add an object to `publishedOpportunities`:

   ```ts
   {
     slug: 'dundas-cafe-board-2027',            // becomes /opportunities/dundas-cafe-board-2027
     title: 'Café specials board — Dundas',
     format: 'board',                           // 'board' | 'mailer'
     area: 'hamilton',                          // an area slug
     locality: 'Dundas',
     venueName: 'Verified Venue Name',          // only if the host agreed to be named
     displayPosition: 'Beside the order counter',
     term: '12 months from installation',
     summary: 'One-sentence description.',
     adSpace: 'One of four advertiser panels',
     artworkHelp: 'Layout from your logo and text',
     installationWindow: 'Early March 2027',
     categoryRules: 'One advertiser per category on this board',
     ifUnavailable: 'Explained in the placement agreement',
     // audience: 'household' | 'business', quantity: 5000 — for mailers only
     // price: { amountCad: 000, basis: 'per placement, 12-month term' } — only once approved
     // spacesAvailable: 2 — only if you'll keep it accurate
     status: 'accepting-enquiries',             // | 'open-for-applications' | 'fully-booked' | 'completed'
     lastUpdated: '2027-01-15',
   },
   ```

2. Build and deploy. The detail page, the directory filters, the area page listing and the sitemap entry are all generated from the record. **Enquire** links prefill the contact form with the opportunity, area and format.
3. When it fills up, change `status` and `lastUpdated` rather than deleting the record. Enquiry buttons turn off automatically for `fully-booked` and `completed`.

Optional fields are hidden when empty, so leave out anything you haven't confirmed.

### Adding or publishing a service area

1. Add a record to `areas` in `src/content/areas.ts`, or edit an existing one. Give it a slug, name, region, SEO title and description, H1, intro, status, `sections`, audience notes and `neighbours`.
2. Keep `readiness: 'draft'` until the page has genuinely useful, verified local content. Draft pages build as short **noindex** previews, are left out of the sitemap and aren't linked from area cards (visitors are sent to a prefilled enquiry instead).
3. Switch to `readiness: 'published'` when it's ready. It then appears in navigation, the footer, the homepage and the sitemap, and gets a canonical URL.

Don't add household counts, foot traffic, demographics, postal routes or partnerships unless you've verified them. Don't copy one city's page and swap the name.

### Pricing

Everything in `src/content/pricing.ts` stays hidden, showing "Request pricing", until `approved: true` and `amountCad` are both set. If you show a monthly equivalent for an annual commitment, you must also set `upfrontCad` and `commitment`; they're displayed beside it. Prices are formatted as CAD.

### Future digital screens

`site.features.digitalScreensInterest` in `src/config/site.ts` controls the small "Interested in future digital screen placements?" section, the interest-only form option, the related FAQ and the Terms line. Set it to `false` to hide all of them. It never adds booking, pricing or screen metrics.

### Domain

Set `SITE_URL` to the owned production domain and rebuild. Canonicals, Open Graph URLs, BreadcrumbList and Organization structured data, `sitemap.xml` and `robots.txt` all follow it. Structured data covers only real business information: no address, opening hours, reviews or per-area LocalBusiness entities.

## Project structure

```
src/
  config/site.ts            business settings and feature flags
  content/                  areas, opportunities, FAQs, pricing, services (+ fixtures/)
  components/
    layout/                 header, footer, breadcrumbs
    mockups/                "Example layout" board and mailer SVGs (fictional businesses)
    forms/                  advertiser and host enquiry forms
    opportunities/          directory card and launch-state panel
    sections/, ui/          shared page sections and small UI pieces
  layouts/BaseLayout.astro  <head>, SEO, canonical/noindex logic
  lib/                      seo, opportunities loader, enquiry validation and delivery, form JS
  pages/                    one file per route; api/enquiry.ts is the only server route
scripts/verify-build.mjs    post-build honesty and indexing checks
n8n/                        importable n8n workflow for enquiries
```

## Launch-blocker checklist

These are missing real business details. The site deliberately shows nothing where these would go.

- [ ] **Production domain** registered and set as `SITE_URL`. Until then the site is noindex.
- [ ] **n8n workflow** imported, secured with Header Auth, given a real action (email, Sheets…), activated, and its Production URL and secret set on the site host. Test both forms end to end.
- [ ] **Public contact email** (and a phone number, if wanted) added in `src/config/site.ts`.
- [ ] **Legal business name and registration** confirmed for Privacy and Terms.
- [ ] **Privacy notice reviewed**: hosting provider, form delivery service, data location, retention period, privacy contact.
- [ ] **Terms reviewed**: governing law, HST and payment terms, and cancellation and refund policy.
- [ ] **Written agreements drafted**: advertiser quote and terms, and the host placement agreement (term, position, maintenance, removal, ad category rules).
- [ ] **Campaign policies decided**: what happens when a campaign doesn't fill, artwork deadlines and replacement costs, category-exclusivity wording.
- [ ] **Distribution provider(s)** chosen for mailers. Don't reference Canada Post or use its marks without authorization.
- [ ] **Pricing** approved before any value is set to `approved: true`.
- [ ] **First real opportunities** added, only when confirmed.
- [ ] **Parkdale Digital line**: confirm wording and relationship before setting `parkdaleDigital.show: true`.
- [ ] **Brand name check**: confirm "Post and Board Media" is available to use (trade name registration, domain, social handles).
- [ ] **Area pages**: have someone local review the Hamilton, Burlington and Oakville copy before launch.
- [ ] **Social preview image**: add an Open Graph image if wanted (none is set).
