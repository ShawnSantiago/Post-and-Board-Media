import { SITE_URL } from 'astro:env/server';
import { publishedAreas } from '../content/areas';
import { opportunities } from './opportunities';

/** The owned production origin, without trailing slash — or null in previews. */
export const siteOrigin: string | null = SITE_URL ? SITE_URL.replace(/\/+$/, '') : null;

/** Previews (no SITE_URL) are noindex everywhere so they can't compete with production. */
export const isPreview = siteOrigin === null;

export function absoluteUrl(path: string): string | null {
  if (!siteOrigin) return null;
  return `${siteOrigin}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Every indexable route. The sitemap is generated from this list only, so
 * drafts, thank-you pages, examples and filters are never included.
 */
export function indexableRoutes(): string[] {
  const staticRoutes = [
    '/',
    '/advertising-boards',
    '/shared-mailers',
    '/opportunities',
    '/host-a-board',
    '/areas',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ];
  const areaRoutes = publishedAreas.map((a) => `/areas/${a.slug}`);
  const oppRoutes = opportunities.filter((o) => !o.isExample).map((o) => `/opportunities/${o.slug}`);
  return [...staticRoutes, ...areaRoutes, ...oppRoutes];
}
