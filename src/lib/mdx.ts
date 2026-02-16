/**
 * MDX content API - products, pages, now entries, etc.
 * Uses contentLoader for generic read/parse/sort logic.
 */

import { cache } from 'react';
import { notFound } from 'next/navigation';
import { CONTENT_SLUGS } from '@/data';
import {
  ContentItem,
  getItemsFromPath,
  getItemBySlugFromPath,
  getAdjacentFromItems,
  getFeaturedFromItems,
  getContentPath,
  sortByYearDesc,
  sortByDateDesc,
  sortByDateOrYear,
} from './contentLoader';
import { getWorkHeroImagePath, type WorkSubType } from '@/lib/contentPaths';

export type { ContentItem };

// ============================================================================
// WORK - Products
// ============================================================================

export interface ProductFrontmatter {
  title: string;
  description: string;
  company: string;   // Company slug - resolve with getCompany()
  role: string;
  year: string;
  duration: string;
  type: string;      // Work type: product, feature, side-project
  subtitle?: string; // Descriptive label e.g. "Design System & Process Transformation"
  featured: boolean;
  heroImage?: string; // Optional: derived from getWorkHeroImagePath(subType, slug) when missing
  tags: string[];
  date?: string;     // For sorting (YYYY-MM-DD format)
  order?: number;    // For manual ordering
  parent?: string;   // Features only: slug of parent product (work/products/). See content/README.md.
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  password?: string; // Optional: Dedicated password for this work item
  locked?: boolean;  // Optional: Whether this work item requires password
}

export type Product = ContentItem<ProductFrontmatter>;

const PRODUCTS_PATH = getContentPath(CONTENT_SLUGS.WORK, CONTENT_SLUGS.WORK_PRODUCTS);

function withWorkHeroImage<T extends { slug: string; frontmatter: { heroImage?: string } }>(
  item: T,
  subType: WorkSubType
): T {
  const hero = item.frontmatter.heroImage?.trim();
  return {
    ...item,
    frontmatter: {
      ...item.frontmatter,
      heroImage: hero || getWorkHeroImagePath(subType, item.slug),
    },
  } as T;
}

export const getProducts = cache((): Product[] =>
  getItemsFromPath<ProductFrontmatter>(PRODUCTS_PATH, sortByYearDesc).map((p) =>
    withWorkHeroImage(p, CONTENT_SLUGS.WORK_PRODUCTS as WorkSubType)
  )
);

export const getProductBySlug = cache((slug: string): Product | null => {
  const item = getItemBySlugFromPath<ProductFrontmatter>(PRODUCTS_PATH, slug);
  return item ? withWorkHeroImage(item, CONTENT_SLUGS.WORK_PRODUCTS as WorkSubType) : null;
});

export function getFeaturedProducts(): Product[] {
  return getFeaturedFromItems(getProducts());
}

export interface AdjacentContent {
  prev: Product | null;
  next: Product | null;
}

export function getAdjacentProducts(currentSlug: string): AdjacentContent {
  return getAdjacentFromItems(getProducts(), currentSlug) as AdjacentContent;
}

// ============================================================================
// WORK - Features
// ============================================================================

const FEATURES_PATH = getContentPath(CONTENT_SLUGS.WORK, CONTENT_SLUGS.WORK_FEATURES);

export const getFeatures = cache((): Product[] =>
  getItemsFromPath<ProductFrontmatter>(FEATURES_PATH, sortByDateOrYear).map((f) =>
    withWorkHeroImage(f, CONTENT_SLUGS.WORK_FEATURES as WorkSubType)
  )
);

export const getFeatureBySlug = cache((slug: string): Product | null => {
  const item = getItemBySlugFromPath<ProductFrontmatter>(FEATURES_PATH, slug);
  return item ? withWorkHeroImage(item, CONTENT_SLUGS.WORK_FEATURES as WorkSubType) : null;
});

export function getAdjacentFeatures(currentSlug: string): AdjacentContent {
  return getAdjacentFromItems(getFeatures(), currentSlug) as AdjacentContent;
}

export function getFeaturedFeatures(): Product[] {
  return getFeaturedFromItems(getFeatures());
}

// ============================================================================
// WORK - All (combined products + features)
// ============================================================================

/** Work item with subType derived from its content folder (e.g., 'products', 'features'). */
export type WorkItem = Product & { subType: string };

export interface AdjacentWorkItem {
  prev: WorkItem | null;
  next: WorkItem | null;
}

export const getAllWork = cache((): WorkItem[] => {
  const products: WorkItem[] = getProducts().map((p) => ({ ...p, subType: CONTENT_SLUGS.WORK_PRODUCTS }));
  const features: WorkItem[] = getFeatures().map((f) => ({ ...f, subType: CONTENT_SLUGS.WORK_FEATURES }));
  const all = [...products, ...features];

  // Featured items first, then non-featured. Each group sorted by date/year.
  const featured = all.filter((i) => i.frontmatter.featured).sort(sortByDateOrYear);
  const rest = all.filter((i) => !i.frontmatter.featured).sort(sortByDateOrYear);
  return [...featured, ...rest];
});

/**
 * Lookup a work item by its content subType and slug.
 * SubType is the content folder slug: 'products', 'features', 'side-projects'.
 */
export const getWorkItemBySlug = cache((subType: string, slug: string): Product | null => {
  if (subType === CONTENT_SLUGS.WORK_PRODUCTS) return getProductBySlug(slug);
  if (subType === CONTENT_SLUGS.WORK_FEATURES) return getFeatureBySlug(slug);
  return null;
});

/**
 * Adjacent navigation spanning all work items (respects featured-first order).
 * Returns WorkItem with subType so callers can build correct URLs.
 */
export function getAdjacentWork(currentSlug: string): AdjacentWorkItem {
  return getAdjacentFromItems(getAllWork(), currentSlug) as AdjacentWorkItem;
}

// ============================================================================
// PAGES (about, uses, colophon)
// ============================================================================

export interface PageFrontmatter {
  title: string;
  description: string;
  lastUpdated?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export type Page = ContentItem<PageFrontmatter>;

const PAGES_PATH = getContentPath(CONTENT_SLUGS.PAGES);

export const getPageBySlug = cache((slug: string): Page | null =>
  getItemBySlugFromPath<PageFrontmatter>(PAGES_PATH, slug)
);

/**
 * Returns page content or triggers a 404.
 * Usage: `const page = getPageOrNotFound('work');`
 */
export function getPageOrNotFound(slug: string): Page {
  const page = getPageBySlug(slug);
  if (!page) notFound();
  return page;
}

// ============================================================================
// NOW (dated snapshots)
// ============================================================================

export interface NowEntryFrontmatter {
  title: string;
  description: string;
  date: string; // YYYY-MM-DD - when this snapshot was written
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

export type NowEntry = ContentItem<NowEntryFrontmatter>;

const NOW_PATH = getContentPath(CONTENT_SLUGS.NOW);

export const getNowEntries = cache((): NowEntry[] =>
  getItemsFromPath<NowEntryFrontmatter>(NOW_PATH, sortByDateDesc)
);

export function getLatestNow(): NowEntry | null {
  return getNowEntries()[0] ?? null;
}

export const getNowBySlug = cache((slug: string): NowEntry | null =>
  getItemBySlugFromPath<NowEntryFrontmatter>(NOW_PATH, slug)
);

// ============================================================================
// Adding new content types
// ============================================================================
//
// Use contentLoader helpers. Example for work/side-projects:
//
//   const SIDE_PROJECTS_PATH = getContentPath(CONTENT_SLUGS.WORK, CONTENT_SLUGS.WORK_SIDE_PROJECTS);
//   export function getSideProjects() {
//     return getItemsFromPath<ProductFrontmatter>(SIDE_PROJECTS_PATH, sortByDateOrYear);
//   }
//   export function getSideProjectBySlug(slug: string) {
//     return getItemBySlugFromPath<ProductFrontmatter>(SIDE_PROJECTS_PATH, slug);
//   }
//   export function getFeaturedSideProjects() {
//     return getFeaturedFromItems(getSideProjects());
//   }
//   export function getAdjacentSideProjects(currentSlug: string) {
//     return getAdjacentFromItems(getSideProjects(), currentSlug) as AdjacentContent;
//   }
//
// Content types to add: writing (posts, thoughts, quotes), experiments, reading.
// ============================================================================
