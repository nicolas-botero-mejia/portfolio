/**
 * Main navigation - derives from contentTypes.
 * Only visibility and order are configured here; name and href come from contentTypes.
 */

import { contentTypes } from './contentTypes';

export interface NavItem {
  name: string;
  href: string;
  visible: boolean;
}

/** Nav config: content slug (or "pages.about" for page subTypes) + visibility */
const navConfig: { slug: string; visible: boolean }[] = [
  { slug: 'work', visible: true },
  { slug: 'experiments', visible: true },
  { slug: 'reading', visible: true },
  { slug: 'writing', visible: true },
  { slug: 'pages.about', visible: true },
  { slug: 'now', visible: true },
  { slug: 'pages.uses', visible: true },
];

/** Build navigation from contentTypes - single source of truth */
export const navigation: NavItem[] = navConfig.map(({ slug, visible }) => {
  const [parentSlug, subSlug] = slug.split('.');
  const ct = contentTypes.find((c) => c.slug === parentSlug);
  if (!ct) return { name: slug, href: '/', visible };

  if (subSlug) {
    const sub = ct.subTypes.find((s) => s.slug === subSlug);
    return {
      name: sub?.label ?? subSlug,
      href: sub?.route ?? '/',
      visible,
    };
  }
  return {
    name: ct.label,
    href: ct.route,
    visible,
  };
});
