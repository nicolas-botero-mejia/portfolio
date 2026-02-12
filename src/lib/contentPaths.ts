/**
 * Content path helpers - conventional paths for images, etc.
 */

/** Conventional hero image path for work items */
export function getHeroImagePath(
  subType: 'case-studies' | 'features' | 'side-projects',
  slug: string,
  filename = 'hero.png'
): string {
  return `/images/${subType}/${slug}/${filename}`;
}
