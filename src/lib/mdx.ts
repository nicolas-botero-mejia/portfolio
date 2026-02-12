import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getContentSubType, getContentType } from '@/data';

const contentDirectory = path.join(process.cwd(), 'content');

// ============================================================================
// GENERIC HELPERS - single implementation for all content types
// ============================================================================

export interface ContentItem<F = unknown> {
  slug: string;
  frontmatter: F;
  content: string;
}

function getItemsFromPath<F>(
  contentPath: string,
  sortBy: (a: ContentItem<F>, b: ContentItem<F>) => number
): ContentItem<F>[] {
  const fullPath = path.join(contentDirectory, contentPath);
  if (!fs.existsSync(fullPath)) return [];

  const fileNames = fs.readdirSync(fullPath);
  return fileNames
    .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '');
      const filePath = path.join(fullPath, fileName);
      const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
      return { slug, frontmatter: data as F, content };
    })
    .sort(sortBy);
}

function getItemBySlugFromPath<F>(contentPath: string, slug: string): ContentItem<F> | null {
  try {
    const filePath = path.join(contentDirectory, contentPath, `${slug}.mdx`);
    const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
    return { slug, frontmatter: data as F, content };
  } catch {
    return null;
  }
}

function getAdjacentFromItems<T extends { slug: string }>(
  items: T[],
  currentSlug: string
): { prev: T | null; next: T | null } {
  const i = items.findIndex((item) => item.slug === currentSlug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: items[i - 1] ?? null,
    next: items[i + 1] ?? null,
  };
}

function getFeaturedFromItems<T extends { frontmatter: { featured?: boolean } }>(items: T[]): T[] {
  return items.filter((item) => item.frontmatter.featured);
}

function getContentPath(parentSlug: string, subSlug?: string): string {
  return subSlug
    ? getContentSubType(parentSlug, subSlug)!.path
    : getContentType(parentSlug)!.path;
}

// Sort comparators (F = frontmatter type, ContentItem<F>.frontmatter has shape F)
const sortByYearDesc = (a: ContentItem<{ year?: string }>, b: ContentItem<{ year?: string }>) =>
  parseInt(b.frontmatter.year ?? '0') - parseInt(a.frontmatter.year ?? '0');

const sortByDateDesc = (a: ContentItem<{ date?: string }>, b: ContentItem<{ date?: string }>) =>
  new Date(b.frontmatter.date ?? 0).getTime() - new Date(a.frontmatter.date ?? 0).getTime();

const sortByDateOrYear = (
  a: ContentItem<{ date?: string; year?: string }>,
  b: ContentItem<{ date?: string; year?: string }>
) => {
  if (a.frontmatter.date && b.frontmatter.date) {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  }
  return parseInt(b.frontmatter.year ?? '0') - parseInt(a.frontmatter.year ?? '0');
};

// ============================================================================
// WORK - Case Studies & Features
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

export interface CaseStudy {
  slug: string;
  frontmatter: CaseStudyFrontmatter;
  content: string;
}

const CASE_STUDIES_PATH = getContentPath('work', 'case-studies');

export function getCaseStudies(): CaseStudy[] {
  return getItemsFromPath<CaseStudyFrontmatter>(CASE_STUDIES_PATH, sortByYearDesc);
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  return getItemBySlugFromPath<CaseStudyFrontmatter>(CASE_STUDIES_PATH, slug);
}

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
// PAGES (about, now, uses, etc.)
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

export interface Page {
  slug: string;
  frontmatter: PageFrontmatter;
  content: string;
}

const PAGES_PATH = getContentPath('pages');

export function getPageBySlug(slug: string): Page | null {
  return getItemBySlugFromPath<PageFrontmatter>(PAGES_PATH, slug);
}

// ============================================================================
// NOW (dated snapshots - like posts)
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

export interface NowEntry {
  slug: string;
  frontmatter: NowEntryFrontmatter;
  content: string;
}

const NOW_PATH = getContentPath('now');

export function getNowEntries(): NowEntry[] {
  return getItemsFromPath<NowEntryFrontmatter>(NOW_PATH, sortByDateDesc);
}

export function getLatestNow(): NowEntry | null {
  return getNowEntries()[0] ?? null;
}

export function getNowBySlug(slug: string): NowEntry | null {
  return getItemBySlugFromPath<NowEntryFrontmatter>(NOW_PATH, slug);
}

// ============================================================================
// ALL WORK (Combined case studies + features)
// ============================================================================

export function getAllWork(): CaseStudy[] {
  const caseStudies = getCaseStudies();
  const features = getFeatures();
  const combined = [...caseStudies, ...features];

  // Sort by date (newest first)
  return combined.sort((a, b) => {
    if (a.frontmatter.date && b.frontmatter.date) {
      return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    }
    return parseInt(b.frontmatter.year) - parseInt(a.frontmatter.year);
  });
}

// ============================================================================
// FEATURES
// ============================================================================

const FEATURES_PATH = getContentPath('work', 'features');

export function getFeatures(): CaseStudy[] {
  return getItemsFromPath<CaseStudyFrontmatter>(FEATURES_PATH, sortByDateOrYear);
}

export function getFeatureBySlug(slug: string): CaseStudy | null {
  return getItemBySlugFromPath<CaseStudyFrontmatter>(FEATURES_PATH, slug);
}

export function getAdjacentFeatures(currentSlug: string): AdjacentContent {
  return getAdjacentFromItems(getFeatures(), currentSlug) as AdjacentContent;
}

export function getFeaturedFeatures(): CaseStudy[] {
  return getFeaturedFromItems(getFeatures());
}

// ============================================================================
// Adding new content types
// ============================================================================
//
// Use the generic helpers above. Example for work/side-projects:
//
//   const SIDE_PROJECTS_PATH = getContentPath('work', 'side-projects');
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
