import type { APIRoute } from 'astro';
import { absoluteUrl, isPreview } from '../lib/seo';

export const GET: APIRoute = () => {
  const body = isPreview
    ? `# Preview build: no production SITE_URL configured.\nUser-agent: *\nDisallow: /\n`
    : `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${absoluteUrl('/sitemap.xml')}\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
