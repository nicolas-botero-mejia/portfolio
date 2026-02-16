/**
 * Content type lookup - O(1) resolution, breadcrumbs, slug constants.
 */

import type { ContentSubType, ContentType } from '../sources/contentTypes';
import { contentTypes } from '../sources/contentTypes';

const contentTypeMap = new Map(contentTypes.map((ct) => [ct.slug, ct]));

export function getContentType(slug: string): ContentType | undefined {
  return contentTypeMap.get(slug);
}

export function getContentSubType(parentSlug: string, subSlug: string): ContentSubType | undefined {
  const parent = getContentType(parentSlug);
  return parent?.subTypes.find((st) => st.slug === subSlug);
}

/** Breadcrumb label: "Reading · Books" or "Work · Products" */
export function getBreadcrumbLabel(parentSlug: string, subSlug?: string): string {
  const parent = getContentType(parentSlug);
  if (!parent) return parentSlug;
  if (!subSlug) return parent.label;
  const sub = getContentSubType(parentSlug, subSlug);
  return sub ? `${parent.label} · ${sub.label}` : parent.label;
}

const toKey = (slug: string) => slug.toUpperCase().replace(/-/g, '_');

function buildSlugs(): Record<string, string> {
  const result: Record<string, string> = {};
  for (const ct of contentTypes) {
    result[toKey(ct.slug)] = ct.slug;
    for (const sub of ct.subTypes) {
      const subKey = `${toKey(ct.slug)}_${toKey(sub.slug)}`;
      result[subKey] = sub.slug;
      if (ct.route === '') {
        result[`PAGES_${toKey(sub.slug)}`] = `${ct.slug}.${sub.slug}`;
        result[toKey(sub.slug)] = sub.slug;
      }
    }
  }
  return result;
}

/** Slug constants derived from contentTypes - use instead of string literals */
export const CONTENT_SLUGS = buildSlugs() as Readonly<Record<string, string>>;
