import { Metadata } from 'next';
import { site, routes } from '@/data';
import { getPageBySlug } from './mdx';
import { features } from '@/config/features';

const defaultOgImage = {
  url: `${site.url}/og-image.png`,
  width: 1200,
  height: 630,
  alt: site.title,
};

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
  ...(features.seo.openGraph && {
    openGraph: {
      type: 'website' as const,
      locale: site.locale,
      url: site.url,
      siteName: site.title,
      title: site.title,
      description: site.description,
      images: [defaultOgImage],
    },
  }),
  ...(features.seo.twitterCards && {
    twitter: {
      card: 'summary_large_image' as const,
      title: site.title,
      description: site.description,
      images: [defaultOgImage.url],
      creator: site.twitterHandle,
    },
  }),
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
      const route = routes[slug as keyof typeof routes];
      return generatePageMetadata({
        title: frontmatter.seo.metaTitle,
        description: frontmatter.seo.metaDescription,
        keywords: frontmatter.seo.keywords,
        canonical: route ? `${site.url}${route}` : undefined,
      });
    } catch {
      return {};
    }
  };
}

export type GeneratePageMetadataOptions = {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noIndex?: boolean;
};

export function generatePageMetadata({
  title,
  description,
  keywords,
  ogImage,
  canonical,
  noIndex = false,
}: GeneratePageMetadataOptions): Metadata {
  return {
    title,
    description,
    keywords: keywords || [...site.defaultKeywords],
    ...(features.seo.openGraph && {
      openGraph: {
        title,
        description,
        images: ogImage ? [{ url: ogImage }] : [defaultOgImage],
      },
    }),
    ...(features.seo.twitterCards && {
      twitter: {
        card: 'summary_large_image' as const,
        title,
        description,
        images: ogImage ? [ogImage] : [defaultOgImage.url],
      },
    }),
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
            'max-image-preview': 'none' as const,
            'max-snippet': 0,
          },
        }
      : defaultMetadata.robots,
    ...(canonical && {
      alternates: { canonical },
    }),
  };
}
