/**
 * Content path helpers - conventional paths for images by contentType and subType.
 * All content types (work, experiments, writing, reading, now, pages) use the same pattern.
 */

import { contentTypes, CONTENT_SLUGS } from '@/data';

/** Work sub-type slugs for type-safe work image paths */
type WorkContentType = Extract<(typeof contentTypes)[number], { slug: 'work' }>;
export type WorkSubType = WorkContentType['subTypes'][number]['slug'];

/** Default image file extension */
export const DEFAULT_IMAGE_EXT = 'png';

/** Standard image level constants */
export const IMAGE_LEVELS = {
  HERO: 'hero',
  THUMBNAIL: 'thumbnail',
  OG: 'og',
} as const;

/**
 * Conventional image path with contentType level.
 * Pattern: /images/{contentType}/{subType?}/{slug}-{level}.{ext}
 * - With subType (work, experiments, writing, reading): /images/work/products/ocean-hero.png
 * - Without subType (now, pages): /images/now/2025-02-09-hero.png
 */
export function getImagePath(
  contentType: string,
  subType: string | null,
  slug: string,
  level: string,
  ext = DEFAULT_IMAGE_EXT
): string {
  const base = `/images/${contentType}`;
  const segment = subType ? `${subType}/${slug}-${level}` : `${slug}-${level}`;
  return `${base}/${segment}.${ext}`;
}

/**
 * Hero image path. Convenience for getImagePath(..., 'hero', ext).
 */
export function getHeroImagePath(
  contentType: string,
  subType: string | null,
  slug: string,
  ext = DEFAULT_IMAGE_EXT
): string {
  return getImagePath(contentType, subType, slug, IMAGE_LEVELS.HERO, ext);
}

/**
 * Work-specific hero path (convenience for getHeroImagePath('work', subType, slug)).
 */
export function getWorkHeroImagePath(subType: WorkSubType, slug: string, ext = DEFAULT_IMAGE_EXT): string {
  return getHeroImagePath(CONTENT_SLUGS.WORK, subType, slug, ext);
}

/**
 * Thumbnail image path. Convenience for getImagePath(..., 'thumbnail', ext).
 */
export function getThumbnailPath(
  contentType: string,
  subType: string | null,
  slug: string,
  ext = DEFAULT_IMAGE_EXT
): string {
  return getImagePath(contentType, subType, slug, IMAGE_LEVELS.THUMBNAIL, ext);
}

/**
 * Work-specific thumbnail path for listing cards.
 */
export function getWorkThumbnailPath(subType: WorkSubType, slug: string, ext = DEFAULT_IMAGE_EXT): string {
  return getThumbnailPath(CONTENT_SLUGS.WORK, subType, slug, ext);
}

/**
 * OG image path. Convenience for getImagePath(..., 'og', ext).
 */
export function getOgImagePath(
  contentType: string,
  subType: string | null,
  slug: string,
  ext = DEFAULT_IMAGE_EXT
): string {
  return getImagePath(contentType, subType, slug, IMAGE_LEVELS.OG, ext);
}

/**
 * Work-specific OG image path for social sharing previews.
 */
export function getWorkOgImagePath(subType: WorkSubType, slug: string, ext = DEFAULT_IMAGE_EXT): string {
  return getOgImagePath(CONTENT_SLUGS.WORK, subType, slug, ext);
}

/**
 * Work-specific image path (convenience for getImagePath('work', subType, slug, level)).
 */
export function getWorkImagePath(
  subType: WorkSubType,
  slug: string,
  level: string,
  ext = DEFAULT_IMAGE_EXT
): string {
  return getImagePath(CONTENT_SLUGS.WORK, subType, slug, level, ext);
}
