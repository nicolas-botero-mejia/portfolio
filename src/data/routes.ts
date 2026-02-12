/**
 * Site routes - base paths for navigation and linking.
 */

export const routes = {
  home: '/',
  work: '/work',
  experiments: '/experiments',
  reading: '/reading',
  writing: '/writing',
  about: '/about',
  now: '/now',
  uses: '/uses',
} as const;

export type RouteKey = keyof typeof routes;
