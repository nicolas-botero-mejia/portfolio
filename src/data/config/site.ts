/**
 * Site-wide config - SEO, defaults, metadata.
 * Extracted from hardcoded values in seo.ts and layout.
 */

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nicolas-botero-mejia.com',
  name: 'Nicolás Botero',
  title: 'Nicolás Botero - Product Designer',
  description:
    'Product Designer with 10+ years of experience in design systems, product leadership, and strategic transformation. Featured work: Sainapsis, Ocean, AquaDS.',
  titleTemplate: '%s | Nicolás Botero',
  defaultKeywords: [
    'Product Designer',
    'UX Designer',
    'Design Systems',
    'Design Leadership',
    'Nicolás Botero',
    'Nico Botero',
    'Colombia',
    'Remote Designer',
  ],
  twitterHandle: '@nicolasbotero',
  locale: 'en_US',
} as const;
