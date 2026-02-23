/**
 * MDX component overrides — maps markdown elements to DS components.
 *
 * Philosophy: markdown-first, JSX when needed.
 * Standard markdown syntax renders through DS components automatically.
 * JSX components (Video, Image with dimensions) for things markdown can't express.
 */

import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import React from 'react';
import Image from 'next/image';
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

  // Paragraphs → spacing and semantic color
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="mb-4 text-base leading-relaxed text-content-primary">{props.children}</p>
  ),

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

  // Blockquote — optional callout styling via [callout]: #
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => {
    const dataProps = props as Record<string, string | undefined>;
    const isCallout = dataProps['data-callout'] === 'true';
    if (isCallout) {
      return (
        <blockquote
          {...props}
          className="border-l-4 border-action-primary-bg bg-background-subtle rounded-lg px-6 py-4 my-8 not-italic text-content-primary"
        />
      );
    }
    return (
      <blockquote
        {...props}
        className="my-6 border-l-4 border-border-default pl-6 italic text-content-secondary"
      />
    );
  },

  // Code block — optional filename bar via [filename: x]: #
  pre: (props: ComponentPropsWithoutRef<'pre'>) => {
    const dataProps = props as Record<string, string | undefined>;
    const filename = dataProps['data-filename'];
    const hasFilename = typeof filename === 'string' && filename.length > 0;
    return (
      <div className="my-8">
        {hasFilename && (
          <div className="rounded-t-lg bg-background-muted px-4 py-1.5 font-mono text-xs text-content-muted">
            {filename}
          </div>
        )}
        <pre
          {...props}
          className={
            hasFilename
              ? 'rounded-b-lg bg-background-muted p-4 overflow-x-auto text-sm'
              : 'rounded-lg bg-background-muted p-4 overflow-x-auto text-sm'
          }
        />
      </div>
    );
  },
};

// ============================================================================
// Image component (needs content context for path resolution)
// ============================================================================

function createImageComponent(ctx: ContentContext) {
  return function MdxImage(props: ComponentPropsWithoutRef<'img'>) {
    const rawSrc = typeof props.src === 'string' ? props.src : '';
    const resolvedSrc = rawSrc ? resolveImageSrc(rawSrc, ctx) : '';
    const w = typeof props.width === 'number' ? props.width : Number(props.width) || 800;
    const h = typeof props.height === 'number' ? props.height : Number(props.height) || 600;
    const dataProps = props as Record<string, string | undefined>;
    const caption = dataProps['data-caption'];
    const showCaption = typeof caption === 'string' && caption.length > 0;
    return (
      <figure className="my-8">
        <Image
          src={resolvedSrc}
          alt={props.alt ?? ''}
          width={w}
          height={h}
          className="w-full rounded-lg"
          style={{ height: 'auto' }}
          sizes="(max-width: 768px) 100vw, 800px"
        />
        {showCaption && (
          <figcaption className="mt-2 text-center text-sm text-content-muted">{caption}</figcaption>
        )}
      </figure>
    );
  };
}

// ============================================================================
// Table context (grid vs semantic table) — passed via props for Server Component compatibility
// ============================================================================

interface TableContextValue {
  isGrid: boolean;
  cols: number;
  hasLabels: boolean;
}

interface TableChildProps {
  children?: ReactNode;
  __tableContext?: TableContextValue;
}

function hasContent(children: ReactNode): boolean {
  if (children == null) return false;
  if (typeof children === 'string') return children.trim().length > 0;
  if (Array.isArray(children)) return children.some(hasContent);
  return true;
}

function getTableMeta(children: ReactNode): { cols: number; hasLabels: boolean } {
  const arr = React.Children.toArray(children);
  const thead = arr[0];
  if (!React.isValidElement(thead)) return { cols: 0, hasLabels: false };
  const trArr = React.Children.toArray((thead.props as { children?: ReactNode }).children);
  const firstTr = trArr[0];
  if (!React.isValidElement(firstTr)) return { cols: 0, hasLabels: false };
  const thArr = React.Children.toArray((firstTr.props as { children?: ReactNode }).children);
  const cols = Math.min(Math.max(thArr.length, 2), 4);
  const hasLabels = thArr.some((el) =>
    React.isValidElement(el) ? hasContent((el.props as { children?: ReactNode }).children) : false
  );
  return { cols, hasLabels };
}

const GRID_COLS_CLASSES: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-4',
};

// ============================================================================
// Factory
// ============================================================================

/**
 * Create MDX component overrides.
 * - Without context: base element overrides (headings, links, lists, hr, bold, italic)
 * - With context: adds image path resolution and p unwrap for block images
 */
export function createMDXComponents(ctx?: ContentContext) {
  if (!ctx) {
    return baseComponents;
  }

  const MdxImage = createImageComponent(ctx);

  // MDX wraps ![alt](src) in a <p>; our img renders <figure>. <p> cannot contain <figure>.
  // Unwrap when the only child is MdxImage, or when all non-<br> children are MdxImage (consecutive images).
  const p: (typeof baseComponents)['p'] = (props) => {
    const arr = React.Children.toArray(props.children);
    const nonBr = arr.filter(
      (child) =>
        !(React.isValidElement(child) && typeof child.type === 'string' && child.type === 'br')
    );
    const allImages =
      nonBr.length > 0 &&
      nonBr.every(
        (child) => React.isValidElement(child) && (child as ReactElement).type === MdxImage
      );
    const dataProps = props as Record<string, string | undefined>;
    const fullWidth = dataProps['data-full-width'] === 'true';
    if (allImages) {
      if (fullWidth) {
        // Full-bleed: width uses --sidebar-w from globals.css so sidebar and content stay in sync.
          return (
          <div className="-ml-8 w-screen lg:-ml-16 lg:w-[calc(100vw_-_var(--sidebar-w))]">
            {props.children}
          </div>
        );
      }
      return <>{props.children}</>;
    }
    return baseComponents.p(props);
  };

  const table = (props: ComponentPropsWithoutRef<'table'>) => {
    const dataProps = props as Record<string, string>;
    const isTableMode = dataProps['data-table'] === 'true';
    const value: TableContextValue = {
      isGrid: !isTableMode,
      ...getTableMeta(props.children),
    };
    const childrenWithContext = React.Children.map(props.children, (child) => {
      if (!React.isValidElement(child) || typeof child.props !== 'object' || child.props === null)
        return child;
      return React.cloneElement(child as ReactElement<TableChildProps>, {
        ...(child.props as Record<string, unknown>),
        __tableContext: value,
      });
    });
    if (value.isGrid) {
      return (
        <div
          role="grid"
          className={`grid gap-4 my-8 ${GRID_COLS_CLASSES[value.cols] ?? GRID_COLS_CLASSES[2]}`}
        >
          {childrenWithContext}
        </div>
      );
    }
    return (
      <div className="overflow-x-auto my-8">
        <table className="w-full border-collapse border border-border-default">
          {childrenWithContext}
        </table>
      </div>
    );
  };

  const thead = (props: ComponentPropsWithoutRef<'thead'> & TableChildProps) => {
    const ctx = props.__tableContext;
    if (!ctx) {
      return <thead className="bg-background-subtle text-content-secondary">{props.children}</thead>;
    }
    if (ctx.isGrid) {
      if (!ctx.hasLabels) return null;
      const tr = React.Children.toArray(props.children)[0];
      if (!React.isValidElement(tr)) return null;
      const ths = React.Children.toArray((tr.props as { children?: ReactNode }).children);
      return (
        <>
          {ths.map((th, i) =>
            React.isValidElement(th) ? (
              <div key={i} role="columnheader" className="text-sm font-medium text-content-secondary mb-2">
                {(th.props as { children?: ReactNode }).children}
              </div>
            ) : null
          )}
        </>
      );
    }
    return <thead className="bg-background-subtle text-content-secondary">{props.children}</thead>;
  };

  const tbody = (props: ComponentPropsWithoutRef<'tbody'> & TableChildProps) => {
    const ctx = props.__tableContext;
    if (ctx?.isGrid) {
      const withContext = React.Children.map(props.children, (child) => {
        if (!React.isValidElement(child) || typeof child.props !== 'object' || child.props === null)
          return child;
        return React.cloneElement(child as ReactElement<TableChildProps>, {
          ...(child.props as Record<string, unknown>),
          __tableContext: ctx,
        });
      });
      return <>{withContext}</>;
    }
    return <tbody>{props.children}</tbody>;
  };

  const tr = (props: ComponentPropsWithoutRef<'tr'> & TableChildProps) => {
    const ctx = props.__tableContext;
    if (ctx?.isGrid) {
      const withContext = React.Children.map(props.children, (child) => {
        if (!React.isValidElement(child) || typeof child.props !== 'object' || child.props === null)
          return child;
        return React.cloneElement(child as ReactElement<TableChildProps>, {
          ...(child.props as Record<string, unknown>),
          __tableContext: ctx,
        });
      });
      return <>{withContext}</>;
    }
    return <tr>{props.children}</tr>;
  };

  const th = (props: ComponentPropsWithoutRef<'th'> & TableChildProps) => {
    const ctx = props.__tableContext;
    if (ctx?.isGrid) return null;
    return (
      <th className="border border-border-default p-3 text-left text-base text-content-primary">
        {props.children}
      </th>
    );
  };

  const td = (props: ComponentPropsWithoutRef<'td'> & TableChildProps) => {
    const ctx = props.__tableContext;
    if (ctx?.isGrid) {
      return (
        <div role="gridcell" className="overflow-hidden [&_figure]:h-full [&_img]:object-cover [&_img]:w-full [&_img]:h-full">
          {props.children}
        </div>
      );
    }
    return (
      <td className="border border-border-default p-3 text-base text-content-primary">
        {props.children}
      </td>
    );
  };

  return {
    ...baseComponents,
    p,
    img: MdxImage,
    table,
    thead,
    tbody,
    tr,
    th,
    td,
  };
}
