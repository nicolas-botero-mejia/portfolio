/**
 * Work item types - used in frontmatter and for filtering/tabs on work page.
 */

export interface WorkType {
  slug: string;
  label: string;
}

export const workTypes: WorkType[] = [
  { slug: 'case-study', label: 'Case Study' },
  { slug: 'feature', label: 'Feature' },
  { slug: 'side-project', label: 'Side Project' },
  { slug: 'platform-design', label: 'Platform Design' },
  { slug: 'design-system', label: 'Design System' },
];
