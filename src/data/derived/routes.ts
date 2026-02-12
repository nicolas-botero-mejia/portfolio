/**
 * Site routes - derived from contentTypes.
 * Use for linking, redirects, and programmatic navigation.
 */

import { contentTypes } from '../sources/contentTypes';
import { getContentType, getContentSubType } from '../resolvers/contentTypes';

function buildRoutes(): Record<string, string> {
  const result: Record<string, string> = { home: '/' };

  for (const ct of contentTypes) {
    if (ct.route === '') {
      for (const sub of ct.subTypes) {
        result[sub.slug] = sub.route;
      }
    } else {
      result[ct.slug] = ct.route;
    }
  }

  return result;
}

export const routes = buildRoutes() as {
  home: '/';
  work: string;
  writing: string;
  reading: string;
  experiments: string;
  now: string;
  about: string;
  uses: string;
  colophon: string;
};

export type RouteKey = keyof typeof routes;

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
