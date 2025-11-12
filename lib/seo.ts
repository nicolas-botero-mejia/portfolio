import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nicolasbotero.com';
const siteName = 'Nicolás Botero - Product Designer';
const siteDescription = 'Product Designer with 10+ years of experience in design systems, product leadership, and strategic transformation. Featured work: Sainapsis, Ocean, AquaDS.';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
    template: '%s | Nicolás Botero',
  },
  description: siteDescription,
  keywords: [
    'Product Designer',
    'UX Designer',
    'Design Systems',
    'Design Leadership',
    'Nicolás Botero',
    'Nico Botero',
    'Colombia',
    'Remote Designer',
  ],
  authors: [{ name: 'Nicolás Botero' }],
  creator: 'Nicolás Botero',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: siteName,
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description: siteDescription,
    images: [`${siteUrl}/og-image.png`],
    creator: '@nicolasbotero',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export function generatePageMetadata({
  title,
  description,
  keywords,
  ogImage,
  noIndex = false,
}: {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title,
    description,
    keywords: keywords || defaultMetadata.keywords,
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : defaultMetadata.openGraph?.images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : (defaultMetadata.twitter?.images as string[]),
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : defaultMetadata.robots,
  };
}
