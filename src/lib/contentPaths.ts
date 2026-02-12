/**
 * Content path helpers - conventional paths for images, etc.
 */

import { contentTypes } from '@/data';

/** Work sub-type slugs derived from contentTypes */
type WorkContentType = Extract<(typeof contentTypes)[number], { slug: 'work' }>;
type WorkSubType = WorkContentType['subTypes'][number]['slug'];

/** Conventional hero image path for work items */
export function getHeroImagePath(
  subType: WorkSubType,
  slug: string,
  filename = 'hero.png'
): string {
  return `/images/${subType}/${slug}/${filename}`;
}
