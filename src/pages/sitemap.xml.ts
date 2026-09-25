import type { APIRoute } from 'astro';
import { absoluteUrl, indexableRoutes, siteOrigin } from '../lib/seo';

export const GET: APIRoute = () => {
  // Without an owned production domain there is nothing to advertise to crawlers.
  const urls = siteOrigin ? indexableRoutes().map((p) => absoluteUrl(p)) : [];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${u}</loc></url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
