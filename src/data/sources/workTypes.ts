/**
 * Work item types - used in frontmatter and for filtering/tabs on work page.
 */

export interface WorkType {
  slug: string;
  label: string;
}

export const workTypes: WorkType[] = [
  { slug: 'product', label: 'Product' },
  { slug: 'feature', label: 'Feature' },
  { slug: 'side-project', label: 'Side Project' },
  { slug: 'platform-design', label: 'Platform Design' },
  { slug: 'design-system', label: 'Design System' },
  { slug: 'transformation', label: 'Transformation' },
];

export const WORK_TYPE_SLUGS = {
  PRODUCT: 'product',
  FEATURE: 'feature',
  SIDE_PROJECT: 'side-project',
  PLATFORM_DESIGN: 'platform-design',
  DESIGN_SYSTEM: 'design-system',
  TRANSFORMATION: 'transformation',
} as const;
