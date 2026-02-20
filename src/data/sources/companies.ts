/**
 * Companies - referenced in work items and profile.
 * Frontmatter uses company slug; resolve with getCompany() from resolvers.
 */

export const COMPANY_SLUGS = {
  SAINAPSIS: 'sainapsis',
  ROUTEMOBILE: 'routemobile',
  MASIV: 'masiv',
  PAYU_LATAM: 'payu-latam',
} as const;

export interface Company {
  slug: string;
  name: string;
  url: string;
}

export const companies: Company[] = [
  { slug: COMPANY_SLUGS.SAINAPSIS, name: 'Sainapsis', url: 'https://www.sainapsis.com/' },
  { slug: COMPANY_SLUGS.ROUTEMOBILE, name: 'RouteMobile', url: 'https://www.routemobile.com/' },
  { slug: COMPANY_SLUGS.MASIV, name: 'Masiv', url: 'https://www.masiv.com/' },
  { slug: COMPANY_SLUGS.PAYU_LATAM, name: 'PayU Latam', url: 'https://corporate.payu.com/colombia/' },
];
