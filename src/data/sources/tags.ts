/**
 * Tag taxonomy - suggested tags for content consistency and filtering.
 * Content can use any tag; these are the canonical set for autocomplete/filtering.
 */

export interface TagGroup {
  label: string;
  tags: string[];
}

export const tagGroups: TagGroup[] = [
  {
    label: 'Design',
    tags: ['design systems', 'component library', 'design ops', 'UI/UX'],
  },
  {
    label: 'Process',
    tags: ['process transformation', 'productivity', 'mentorship', 'scalability'],
  },
  {
    label: 'Product',
    tags: ['SaaS', 'enterprise platform', 'enterprise design', 'platform design'],
  },
  {
    label: 'Domain',
    tags: ['multi-channel', 'messaging', 'communications'],
  },
];
