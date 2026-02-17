/**
 * Content type definitions - single source of truth for content taxonomy.
 * Used for navigation, filtering, breadcrumbs, and content routing.
 *
 * Route strings are defined here only. routes and navigation derive from this.
 */

export interface ContentSubType {
  slug: string;
  label: string;
  path: string; // Folder path relative to content/
  route: string; // URL base (e.g., /work/products)
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
      { slug: 'products', label: 'Products', path: 'work/products', route: '/work/products' },
      { slug: 'features', label: 'Features', path: 'work/features', route: '/work/features' },
      { slug: 'side-projects', label: 'Side Projects', path: 'work/side-projects', route: '/work/side-projects' },
      { slug: 'transformations', label: 'Transformations', path: 'work/transformations', route: '/work/transformations' },
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
    slug: 'now',
    label: 'Now',
    path: 'now',
    route: '/now',
    subTypes: [], // Flat folder - each file is a dated snapshot
  },
  {
    slug: 'pages',
    label: 'Pages',
    path: 'pages',
    route: '',
    subTypes: [
      { slug: 'about', label: 'About', path: 'pages/about', route: '/about' },
      { slug: 'uses', label: 'Uses', path: 'pages/uses', route: '/uses' },
      { slug: 'colophon', label: 'Colophon', path: 'pages/colophon', route: '/colophon' },
    ],
  },
];
