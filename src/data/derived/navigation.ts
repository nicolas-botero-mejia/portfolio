/**
 * Main navigation - derives from contentTypes.
 * Visibility and order configured here; name and href come from contentTypes.
 */

import { contentTypes } from '../sources/contentTypes';
import { CONTENT_SLUGS } from '../resolvers/contentTypes';

export interface NavItem {
  name: string;
  href: string;
  visible: boolean;
}

const navConfig: { slug: string; visible: boolean }[] = [
  { slug: CONTENT_SLUGS.WORK, visible: true },
  { slug: CONTENT_SLUGS.EXPERIMENTS, visible: true },
  { slug: CONTENT_SLUGS.READING, visible: true },
  { slug: CONTENT_SLUGS.WRITING, visible: true },
  { slug: CONTENT_SLUGS.PAGES_ABOUT, visible: true },
  { slug: CONTENT_SLUGS.NOW, visible: true },
  { slug: CONTENT_SLUGS.PAGES_USES, visible: true },
  { slug: CONTENT_SLUGS.PAGES_COLOPHON, visible: true },
];

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
