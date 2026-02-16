import { Metadata } from 'next';
import { site } from '@/data';
import { getPageBySlug } from './mdx';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: site.titleTemplate,
  },
  description: site.description,
  keywords: [...site.defaultKeywords],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.title,
    title: site.title,
    description: site.description,
    images: [
      {
        url: `${site.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: site.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
    images: [`${site.url}/og-image.png`],
    creator: site.twitterHandle,
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

/**
 * Returns a generateMetadata function for a page content file.
 * Usage: `export const generateMetadata = generateMetadataForPage('work');`
 */
export function generateMetadataForPage(slug: string): () => Promise<Metadata> {
  return async () => {
    try {
      const page = getPageBySlug(slug);
      if (!page) return {};

      const { frontmatter } = page;
      return generatePageMetadata({
        title: frontmatter.seo.metaTitle,
        description: frontmatter.seo.metaDescription,
        keywords: frontmatter.seo.keywords,
      });
    } catch {
      return {};
    }
  };
}

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
    keywords: keywords || [...site.defaultKeywords],
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
