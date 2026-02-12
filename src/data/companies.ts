/**
 * Companies - referenced in work items and profile.
 * Frontmatter uses company slug; resolve with getCompany().
 */

export interface Company {
  slug: string;
  name: string;
  url: string;
}

export const companies: Company[] = [
  { slug: 'sainapsis', name: 'Sainapsis', url: 'https://www.sainapsis.com/' },
  { slug: 'routemobile', name: 'RouteMobile', url: 'https://www.routemobile.com/' },
  { slug: 'masiv', name: 'Masiv', url: 'https://www.masiv.com/' },
  { slug: 'payu-latam', name: 'PayU Latam', url: 'https://corporate.payu.com/colombia/' },
];

export function getCompany(slug: string): Company | undefined {
  const normalized = slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  return companies.find(
    (c) => c.slug === normalized || c.slug === slug
  );
}

/** Resolve company to name (fallback to raw value if not found) */
export function getCompanyName(slug: string): string {
  const company = getCompany(slug);
  return company?.name ?? slug;
}
