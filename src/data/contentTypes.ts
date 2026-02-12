/**
 * Content type definitions - single source of truth for content taxonomy.
 * Used for navigation, filtering, breadcrumbs, and content routing.
 *
 * Route strings are defined here only. routes.ts and navigation.ts derive from this.
 */

export interface ContentSubType {
  slug: string;
  label: string;
  path: string; // Folder path relative to content/
  route: string; // URL base (e.g., /work/case-studies)
}

export interface ContentType {
  slug: string;
  label: string;
  path: string;
  route: string;
  subTypes: ContentSubType[];
}

export const contentTypes: ContentType[] = [
  {
    slug: 'work',
    label: 'Work',
    path: 'work',
    route: '/work',
    subTypes: [
      { slug: 'case-studies', label: 'Case Studies', path: 'work/case-studies', route: '/work/case-studies' },
      { slug: 'features', label: 'Features', path: 'work/features', route: '/work/features' },
      { slug: 'side-projects', label: 'Side Projects', path: 'work/side-projects', route: '/work/side-projects' },
    ],
  },
  {
    slug: 'writing',
    label: 'Writing',
    path: 'writing',
    route: '/writing',
    subTypes: [
      { slug: 'posts', label: 'Posts', path: 'writing/posts', route: '/writing/posts' },
      { slug: 'thoughts', label: 'Thoughts', path: 'writing/thoughts', route: '/writing/thoughts' },
      { slug: 'quotes', label: 'Quotes', path: 'writing/quotes', route: '/writing/quotes' },
    ],
  },
  {
    slug: 'reading',
    label: 'Reading',
    path: 'reading',
    route: '/reading',
    subTypes: [
      { slug: 'books', label: 'Books', path: 'reading/books', route: '/reading/books' },
      { slug: 'articles', label: 'Articles', path: 'reading/articles', route: '/reading/articles' },
    ],
  },
  {
    slug: 'experiments',
    label: 'Experiments',
    path: 'experiments',
    route: '/experiments',
    subTypes: [
      { slug: 'design', label: 'Design', path: 'experiments/design', route: '/experiments/design' },
      { slug: 'code', label: 'Code', path: 'experiments/code', route: '/experiments/code' },
      { slug: 'prototypes', label: 'Prototypes', path: 'experiments/prototypes', route: '/experiments/prototypes' },
    ],
  },
  {
    slug: 'pages',
    label: 'Pages',
    path: 'pages',
    route: '',
    subTypes: [
      { slug: 'about', label: 'About', path: 'pages/about', route: '/about' },
      { slug: 'now', label: 'Now', path: 'pages/now', route: '/now' },
      { slug: 'uses', label: 'Uses', path: 'pages/uses', route: '/uses' },
    ],
  },
];

/** Get content type by slug */
export function getContentType(slug: string): ContentType | undefined {
  return contentTypes.find((ct) => ct.slug === slug);
}

/** Get sub-type by parent slug and sub-slug */
export function getContentSubType(parentSlug: string, subSlug: string): ContentSubType | undefined {
  const parent = getContentType(parentSlug);
  return parent?.subTypes.find((st) => st.slug === subSlug);
}

/** Breadcrumb label: "Reading · Books" or "Work · Case Studies" */
export function getBreadcrumbLabel(parentSlug: string, subSlug?: string): string {
  const parent = getContentType(parentSlug);
  if (!parent) return parentSlug;
  if (!subSlug) return parent.label;
  const sub = getContentSubType(parentSlug, subSlug);
  return sub ? `${parent.label} · ${sub.label}` : parent.label;
}
