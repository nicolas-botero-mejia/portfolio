/**
 * Site routes - derived from contentTypes. Single source of truth.
 * Use these for linking, redirects, and programmatic navigation.
 */

import { contentTypes, getContentType, getContentSubType } from './contentTypes';

/** Get route value from contentTypes (avoids hardcoding) */
function routeFor(slug: string): string {
  const ct = contentTypes.find((c) => c.slug === slug);
  return ct?.route ?? '/';
}

function pageRoute(slug: string): string {
  const pages = contentTypes.find((c) => c.slug === 'pages');
  const sub = pages?.subTypes.find((s) => s.slug === slug);
  return sub?.route ?? '/';
}

/** Flat routes - values derived from contentTypes */
export const routes = {
  home: '/',
  work: routeFor('work'),
  writing: routeFor('writing'),
  reading: routeFor('reading'),
  experiments: routeFor('experiments'),
  about: pageRoute('about'),
  now: pageRoute('now'),
  uses: pageRoute('uses'),
} as const;

export type RouteKey = keyof typeof routes;

/** Get route for a content type (category or page) */
export function getRoute(contentSlug: string, subSlug?: string, itemSlug?: string): string {
  if (subSlug) {
    const sub = getContentSubType(contentSlug, subSlug);
    if (sub) {
      return itemSlug ? `${sub.route}/${itemSlug}` : sub.route;
    }
  }
  const ct = getContentType(contentSlug);
  if (ct) {
    return itemSlug ? `${ct.route}/${itemSlug}` : ct.route;
  }
  return '/';
}
