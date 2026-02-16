/**
 * MDX component overrides — maps markdown elements to DS components.
 *
 * Philosophy: markdown-first, JSX when needed.
 * Standard markdown syntax renders through DS components automatically.
 * JSX components (Video, Image with dimensions) for things markdown can't express.
 */

import type { ComponentPropsWithoutRef } from 'react';
import { H1, H2, H3, H4, H5, H6, Strong, Em } from '@/components/ui/Typography';
import Link from '@/components/ui/Link';
import Divider from '@/components/ui/Divider';
import { getImagePath } from '@/lib/contentPaths';

export interface ContentContext {
  contentType: string;
  subType: string | null;
  slug: string;
}

/**
 * Resolve an image src shorthand to a full path.
 * - Starts with "/" or "http" → passthrough (already a full path)
 * - Otherwise → treat as a "level" shorthand: "dashboard" → /images/{type}/{sub}/{slug}-dashboard.png
 * - Supports custom extension: "photo.jpg" → /images/{type}/{sub}/{slug}-photo.jpg
 */
function resolveImageSrc(src: string, ctx: ContentContext): string {
  if (src.startsWith('/') || src.startsWith('http')) {
    return src;
  }
  const dotIdx = src.lastIndexOf('.');
  const level = dotIdx > 0 ? src.slice(0, dotIdx) : src;
  const ext = dotIdx > 0 ? src.slice(dotIdx + 1) : 'png';
  return getImagePath(ctx.contentType, ctx.subType, ctx.slug, level, ext);
}

/** Detect external URLs (starts with http/https or //) */
function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href) || href.startsWith('//');
}

// ============================================================================
// Base components (always available, no content context needed)
// ============================================================================

const baseComponents = {
  // Headings → Typography
  h1: (props: ComponentPropsWithoutRef<'h1'>) => <H1>{props.children}</H1>,
  h2: (props: ComponentPropsWithoutRef<'h2'>) => <H2>{props.children}</H2>,
  h3: (props: ComponentPropsWithoutRef<'h3'>) => <H3>{props.children}</H3>,
  h4: (props: ComponentPropsWithoutRef<'h4'>) => <H4>{props.children}</H4>,
  h5: (props: ComponentPropsWithoutRef<'h5'>) => <H5>{props.children}</H5>,
  h6: (props: ComponentPropsWithoutRef<'h6'>) => <H6>{props.children}</H6>,

  // Inline text → Typography
  strong: (props: ComponentPropsWithoutRef<'strong'>) => <Strong>{props.children}</Strong>,
  em: (props: ComponentPropsWithoutRef<'em'>) => <Em>{props.children}</Em>,

  // Links → DS Link (auto-detects external)
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <Link
      href={props.href ?? '#'}
      external={props.href ? isExternal(props.href) : false}
    >
      {props.children}
    </Link>
  ),

  // Horizontal rule → Divider
  hr: () => <Divider className="my-8" />,

  // Lists → DS styled
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="my-4 ml-6 list-disc space-y-2 text-content-primary">{props.children}</ul>
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="my-4 ml-6 list-decimal space-y-2 text-content-primary">{props.children}</ol>
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="text-base leading-relaxed">{props.children}</li>
  ),
};

// ============================================================================
// Image component (needs content context for path resolution)
// ============================================================================

function createImageComponent(ctx: ContentContext) {
  return function MdxImage(props: ComponentPropsWithoutRef<'img'>) {
    const rawSrc = typeof props.src === 'string' ? props.src : '';
    const resolvedSrc = rawSrc ? resolveImageSrc(rawSrc, ctx) : '';
    return (
      <figure className="my-8">
        <img
          src={resolvedSrc}
          alt={props.alt ?? ''}
          className="w-full rounded-lg"
          loading="lazy"
        />
        {props.alt && (
          <figcaption className="mt-2 text-center text-sm text-content-muted">
            {props.alt}
          </figcaption>
        )}
      </figure>
    );
  };
}

// ============================================================================
// Factory
// ============================================================================

/**
 * Create MDX component overrides.
 * - Without context: base element overrides (headings, links, lists, hr, bold, italic)
 * - With context: adds image path resolution
 */
export function createMDXComponents(ctx?: ContentContext) {
  if (!ctx) {
    return baseComponents;
  }

  return {
    ...baseComponents,
    img: createImageComponent(ctx),
  };
}
