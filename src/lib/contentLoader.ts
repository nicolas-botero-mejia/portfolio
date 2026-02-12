/**
 * Content loading utilities - read, parse, and sort MDX content from the filesystem.
 * Generic helpers used by mdx.ts for all content types.
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getContentSubType, getContentType } from '@/data';
import { logError } from './errors';

const contentDirectory = path.join(process.cwd(), 'content');

// ============================================================================
// Types & Helpers
// ============================================================================

export interface ContentItem<F = unknown> {
  slug: string;
  frontmatter: F;
  content: string;
}

export function getContentPath(parentSlug: string, subSlug?: string): string {
  return subSlug
    ? getContentSubType(parentSlug, subSlug)!.path
    : getContentType(parentSlug)!.path;
}

export function getItemsFromPath<F>(
  contentPath: string,
  sortBy: (a: ContentItem<F>, b: ContentItem<F>) => number
): ContentItem<F>[] {
  try {
    const fullPath = path.join(contentDirectory, contentPath);
    if (!fs.existsSync(fullPath)) return [];

    const fileNames = fs.readdirSync(fullPath);
    const items = fileNames
      .filter((f) => f.endsWith('.mdx') && !f.startsWith('_'))
      .map((fileName): ContentItem<F> | null => {
        try {
          const slug = fileName.replace(/\.mdx$/, '');
          const filePath = path.join(fullPath, fileName);
          const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
          return { slug, frontmatter: data as F, content };
        } catch (error) {
          logError(`getItemsFromPath file: ${fileName}`, error);
          return null;
        }
      })
      .filter((item): item is ContentItem<F> => item !== null);
    return items.sort(sortBy);
  } catch (error) {
    logError(`getItemsFromPath(${contentPath})`, error);
    return [];
  }
}

export function getItemBySlugFromPath<F>(contentPath: string, slug: string): ContentItem<F> | null {
  try {
    const filePath = path.join(contentDirectory, contentPath, `${slug}.mdx`);
    const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));
    return { slug, frontmatter: data as F, content };
  } catch (err) {
    const code = (err as NodeJS.ErrnoException)?.code;
    if (code === 'ENOENT' || code === 'ENOTDIR') return null;
    throw err;
  }
}

export function getAdjacentFromItems<T extends { slug: string }>(
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

export function getFeaturedFromItems<T extends { frontmatter: { featured?: boolean } }>(
  items: T[]
): T[] {
  return items.filter((item) => item.frontmatter.featured);
}

// ============================================================================
// Sort comparators
// ============================================================================

export const sortByYearDesc = (
  a: ContentItem<{ year?: string }>,
  b: ContentItem<{ year?: string }>
) => parseInt(b.frontmatter.year ?? '0', 10) - parseInt(a.frontmatter.year ?? '0', 10);

export const sortByDateDesc = (
  a: ContentItem<{ date?: string }>,
  b: ContentItem<{ date?: string }>
) =>
  new Date(b.frontmatter.date ?? 0).getTime() - new Date(a.frontmatter.date ?? 0).getTime();

export const sortByDateOrYear = (
  a: ContentItem<{ date?: string; year?: string }>,
  b: ContentItem<{ date?: string; year?: string }>
) => {
  if (a.frontmatter.date && b.frontmatter.date) {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  }
  return parseInt(b.frontmatter.year ?? '0', 10) - parseInt(a.frontmatter.year ?? '0', 10);
};
