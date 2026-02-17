/**
 * Main navigation - derives from contentTypes.
 * Visibility and order configured here; name and href come from contentTypes.
 */

import { contentTypes } from '../sources/contentTypes';
import { CONTENT_SLUGS } from '../resolvers/contentTypes';
import { isSectionEnabled } from '@/config/features';

export interface NavItem {
  name: string;
  href: string;
  visible: boolean;
}

/** Resolve a nav slug (e.g. 'pages.about') to its features.sections key ('about'). */
function sectionKey(slug: string): string {
  const [parentSlug, subSlug] = slug.split('.');
  return subSlug || parentSlug;
}

const navSlugs: string[] = [
  CONTENT_SLUGS.WORK,
  CONTENT_SLUGS.EXPERIMENTS,
  CONTENT_SLUGS.READING,
  CONTENT_SLUGS.WRITING,
  CONTENT_SLUGS.PAGES_ABOUT,
  CONTENT_SLUGS.NOW,
  CONTENT_SLUGS.PAGES_USES,
  CONTENT_SLUGS.PAGES_COLOPHON,
];

export const navigation: NavItem[] = navSlugs.map((slug) => {
  const [parentSlug, subSlug] = slug.split('.');
  const visible = isSectionEnabled(sectionKey(slug));
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
