/**
 * Main navigation - derives from contentTypes.
 * Only visibility and order are configured here; name and href come from contentTypes.
 */

import { contentTypes, SLUGS } from './contentTypes';

export interface NavItem {
  name: string;
  href: string;
  visible: boolean;
}

/** Nav config: content slug (from SLUGS) + visibility */
const navConfig: { slug: string; visible: boolean }[] = [
  { slug: SLUGS.WORK, visible: true },
  { slug: SLUGS.EXPERIMENTS, visible: true },
  { slug: SLUGS.READING, visible: true },
  { slug: SLUGS.WRITING, visible: true },
  { slug: SLUGS.PAGES_ABOUT, visible: true },
  { slug: SLUGS.NOW, visible: true },
  { slug: SLUGS.PAGES_USES, visible: true },
  { slug: SLUGS.PAGES_COLOPHON, visible: true },
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
