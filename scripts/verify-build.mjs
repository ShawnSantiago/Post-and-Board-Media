#!/usr/bin/env node
/**
 * Post-build checks for content honesty and indexing rules.
 * Run after `npm run build`:  npm run verify
 * Uses SITE_URL from the environment (or .env) to know whether the build is a
 * production build (canonicals + sitemap) or a preview (noindex everywhere).
 */
import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from 'vite';

const env = { ...loadEnv('production', process.cwd(), ''), ...process.env };
const SITE_URL = (env.SITE_URL || '').trim().replace(/\/+$/, '');
const production = Boolean(SITE_URL);

const root = ['dist/client', '.vercel/output/static', 'dist'].find((d) => fs.existsSync(path.join(d, 'index.html')));
if (!root) {
  console.error('No build output found. Run `npm run build` first.');
  process.exit(1);
}

const failures = [];
const fail = (msg) => failures.push(msg);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : [p];
  });
}

const htmlFiles = walk(root).filter((f) => f.endsWith('.html'));
const routeOf = (f) => {
  let r = '/' + path.relative(root, f).replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '').replace(/\.html$/, '');
  return r.length > 1 ? r.replace(/\/$/, '') : '/';
};

const visibleText = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<option[\s\S]*?<\/option>/gi, ' ') // budget ranges are the visitor's choice, not prices
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ');

const banned = [
  /(?<!\bno )guaranteed (customers|leads|sales|exposure|results|impressions)/i,
  /revolutionary/i,
  /unprecedented/i,
  /dominate your/i,
  /leading advertising network/i,
  /canada post/i,
  /official partner/i,
  /testimonial/i,
  /\b\d+(\.\d+)?\s?% (off|savings|cheaper)/i,
  /free trial/i,
  /(only|just) \d+ (spots|spaces) left/i,
];

const draftAreas = ['milton', 'grimsby', 'brantford', 'mississauga'];
const alwaysNoindex = ['/enquiry-received', '/enquiry-not-sent', '/404', ...draftAreas.map((a) => `/areas/${a}`)];

for (const file of htmlFiles) {
  const route = routeOf(file);
  const html = fs.readFileSync(file, 'utf8');
  const text = visibleText(html);
  const noindex = /<meta name="robots" content="noindex/.test(html);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const isExamplePage = /Example only — not a real opportunity/.test(text) && route.startsWith('/opportunities/');

  // Prices: nothing that looks like a dollar amount in visible copy.
  const price = text.match(/\$\s?\d[\d,]*(\.\d{2})?/);
  if (price) fail(`${route}: dollar amount in copy ("${price[0]}") — prices must come from approved pricing records`);

  for (const re of banned) if (re.test(text)) fail(`${route}: banned phrase matched ${re}`);

  // Structured data must not invent local businesses, reviews or addresses.
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    if (/LocalBusiness|AggregateRating|"Review"|streetAddress|openingHours/.test(m[1])) {
      fail(`${route}: structured data contains LocalBusiness/review/address fields`);
    }
  }

  // Digital screens must never look bookable or priced.
  if (/book (a |your )?(digital )?screen|screen (pricing|rates)|digital screens? from \$/i.test(text)) {
    fail(`${route}: digital screens presented as bookable or priced`);
  }

  // Indexing rules.
  if (alwaysNoindex.includes(route) || isExamplePage) {
    if (!noindex) fail(`${route}: must be noindex`);
    if (canonical) fail(`${route}: noindex page must not have a canonical`);
  } else if (production) {
    if (noindex) fail(`${route}: published page is noindex in a production build`);
    const expected = `${SITE_URL}${route}`;
    if (canonical !== expected) fail(`${route}: canonical ${canonical} ≠ ${expected}`);
  } else {
    if (!noindex) fail(`${route}: preview build must be noindex`);
    if (canonical) fail(`${route}: preview build must not emit canonicals`);
  }

  // Demo fixtures must never reach a production build.
  if (production && /Example only — not a real opportunity|Development preview — example records/.test(text)) {
    fail(`${route}: demo opportunity content in a production build`);
  }
}

// Sitemap & robots.
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const robots = fs.readFileSync(path.join(root, 'robots.txt'), 'utf8');
if (production) {
  if (locs.length === 0) fail('sitemap.xml is empty in a production build');
  for (const loc of locs) {
    if (!loc.startsWith(SITE_URL)) fail(`sitemap: ${loc} is not on ${SITE_URL}`);
    const route = loc.slice(SITE_URL.length) || '/';
    if (alwaysNoindex.includes(route) || /example-/.test(route)) fail(`sitemap: ${route} must not be listed`);
    const file = htmlFiles.find((f) => routeOf(f) === route);
    if (!file) fail(`sitemap: ${route} has no built page`);
  }
  if (!/Sitemap: /.test(robots) || /Disallow: \/\s*$/m.test(robots)) fail('robots.txt should allow crawling and link the sitemap');
} else {
  if (locs.length) fail('sitemap.xml must be empty without SITE_URL');
  if (!/Disallow: \/\s*$/m.test(robots)) fail('robots.txt must disallow crawling in a preview build');
}

// Client bundles must not contain server secrets' names wired to values.
for (const f of walk(root).filter((f) => f.endsWith('.js'))) {
  const js = fs.readFileSync(f, 'utf8');
  if (/RESEND_API_KEY|ENQUIRY_WEBHOOK_URL|api\.resend\.com/.test(js)) fail(`${f}: server delivery code or secret name in a client bundle`);
}

console.log(`Checked ${htmlFiles.length} pages in ${root} (${production ? `production: ${SITE_URL}` : 'preview: no SITE_URL'}).`);
if (failures.length) {
  console.error(`\n✗ ${failures.length} problem(s):\n- ` + failures.join('\n- '));
  process.exit(1);
}
console.log('✓ All content and indexing checks passed.');
