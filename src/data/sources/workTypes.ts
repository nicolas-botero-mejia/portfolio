/**
 * Work item types - used in frontmatter and for filtering/tabs on work page.
 */

export interface WorkType {
  slug: string;
  label: string;
}

export const WORK_TYPE_SLUGS = {
  PRODUCT: 'product',
  FEATURE: 'feature',
  SIDE_PROJECT: 'side-project',
  TRANSFORMATION: 'transformation',
} as const;

export const workTypes: WorkType[] = [
  { slug: WORK_TYPE_SLUGS.PRODUCT, label: 'Product' },
  { slug: WORK_TYPE_SLUGS.FEATURE, label: 'Feature' },
  { slug: WORK_TYPE_SLUGS.SIDE_PROJECT, label: 'Side Project' },
  { slug: WORK_TYPE_SLUGS.TRANSFORMATION, label: 'Transformation' },
];
