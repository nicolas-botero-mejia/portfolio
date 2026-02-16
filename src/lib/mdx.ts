/**
 * MDX content API - case studies, pages, now entries, etc.
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

export type { ContentItem };

// ============================================================================
// WORK - Case Studies
// ============================================================================

export interface CaseStudyFrontmatter {
  title: string;
  description: string;
  company: string;   // Company slug - resolve with getCompany()
  role: string;
  year: string;
  duration: string;
  type: string;      // Work type: case-study, feature, side-project
  subtitle?: string; // Descriptive label e.g. "Design System & Process Transformation"
  featured: boolean;
  heroImage: string;
  tags: string[];
  date?: string;     // For sorting (YYYY-MM-DD format)
  order?: number;    // For manual ordering
  parent?: string;   // For features: links to parent case study
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  password?: string; // Optional: Dedicated password for this case study
  locked?: boolean;  // Optional: Whether this case study requires password
}

export type CaseStudy = ContentItem<CaseStudyFrontmatter>;

const CASE_STUDIES_PATH = getContentPath(CONTENT_SLUGS.WORK, CONTENT_SLUGS.WORK_CASE_STUDIES);

export const getCaseStudies = cache((): CaseStudy[] =>
  getItemsFromPath<CaseStudyFrontmatter>(CASE_STUDIES_PATH, sortByYearDesc)
);

export const getCaseStudyBySlug = cache((slug: string): CaseStudy | null =>
  getItemBySlugFromPath<CaseStudyFrontmatter>(CASE_STUDIES_PATH, slug)
);

export function getFeaturedCaseStudies(): CaseStudy[] {
  return getFeaturedFromItems(getCaseStudies());
}

export interface AdjacentContent {
  prev: CaseStudy | null;
  next: CaseStudy | null;
}

export function getAdjacentCaseStudies(currentSlug: string): AdjacentContent {
  return getAdjacentFromItems(getCaseStudies(), currentSlug) as AdjacentContent;
}

// ============================================================================
// WORK - Features
// ============================================================================

const FEATURES_PATH = getContentPath(CONTENT_SLUGS.WORK, CONTENT_SLUGS.WORK_FEATURES);

export const getFeatures = cache((): CaseStudy[] =>
  getItemsFromPath<CaseStudyFrontmatter>(FEATURES_PATH, sortByDateOrYear)
);

export const getFeatureBySlug = cache((slug: string): CaseStudy | null =>
  getItemBySlugFromPath<CaseStudyFrontmatter>(FEATURES_PATH, slug)
);

export function getAdjacentFeatures(currentSlug: string): AdjacentContent {
  return getAdjacentFromItems(getFeatures(), currentSlug) as AdjacentContent;
}

export function getFeaturedFeatures(): CaseStudy[] {
  return getFeaturedFromItems(getFeatures());
}

// ============================================================================
// WORK - All (combined case studies + features)
// ============================================================================

export const getAllWork = cache((): CaseStudy[] => {
  const caseStudies = getCaseStudies();
  const features = getFeatures();
  return [...caseStudies, ...features].sort(sortByDateOrYear);
});

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
//     return getItemsFromPath<CaseStudyFrontmatter>(SIDE_PROJECTS_PATH, sortByDateOrYear);
//   }
//   export function getSideProjectBySlug(slug: string) {
//     return getItemBySlugFromPath<CaseStudyFrontmatter>(SIDE_PROJECTS_PATH, slug);
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
