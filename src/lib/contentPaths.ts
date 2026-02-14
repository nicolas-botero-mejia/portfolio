/**
 * Content path helpers - conventional paths for images, etc.
 */

import { contentTypes } from '@/data';

/** Work sub-type slugs derived from contentTypes */
type WorkContentType = Extract<(typeof contentTypes)[number], { slug: 'work' }>;
type WorkSubType = WorkContentType['subTypes'][number]['slug'];

/** Conventional hero image path: flat per subType, slug-level in filename (e.g. ocean-hero.png) */
export function getHeroImagePath(subType: WorkSubType, slug: string, ext = 'png'): string {
  return `/images/${subType}/${slug}-hero.${ext}`;
}

/** Conventional image path for a given level (hero, thumbnail, 1, 2, n, or descriptive) */
export function getImagePath(
  subType: WorkSubType,
  slug: string,
  level: string,
  ext = 'png'
): string {
  return `/images/${subType}/${slug}-${level}.${ext}`;
}
