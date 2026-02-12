/**
 * Companies - referenced in work items and profile.
 * Frontmatter uses company slug; resolve with getCompany() from resolvers.
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

export const COMPANY_SLUGS = {
  SAINAPSIS: 'sainapsis',
  ROUTEMOBILE: 'routemobile',
  MASIV: 'masiv',
  PAYU_LATAM: 'payu-latam',
} as const;
