/**
 * Company lookup - resolves slug to entity or display name.
 */

import { companies } from '../sources/companies';

export function getCompany(slug: string) {
  const normalized = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return companies.find((c) => c.slug === normalized || c.slug === slug);
}

/** Resolve company to name (fallback to raw value if not found) */
export function getCompanyName(slug: string): string {
  const company = getCompany(slug);
  return company?.name ?? slug;
}
