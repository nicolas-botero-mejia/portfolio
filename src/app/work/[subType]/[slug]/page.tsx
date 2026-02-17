import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllWork, getWorkItemBySlug, getAdjacentWork } from '@/lib/mdx';
import MDXRenderer from '@/components/MDXRenderer';
import { routes, getRoute, getWorkTypeLabel, CONTENT_SLUGS, site } from '@/data';
import { generatePageMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { requiresPassword, isAuthenticated } from '@/lib/serverPasswordAuth';
import { getWorkThumbnailPath, type WorkSubType } from '@/lib/contentPaths';
import ServerPasswordPrompt from '@/components/ServerPasswordPrompt';
import WorkItemTracker from '@/components/WorkItemTracker';
import ContentNavigation from '@/components/ui/ContentNavigation';

interface WorkItemPageProps {
  params: Promise<{
    subType: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllWork().map((item) => ({
    subType: item.subType,
    slug: item.slug,
  }));
}

export async function generateMetadata({ params }: WorkItemPageProps): Promise<Metadata> {
  try {
    const { subType, slug } = await params;
    const workItem = getWorkItemBySlug(subType, slug);

    if (!workItem) return {};

    const { frontmatter } = workItem;
    const isLocked = requiresPassword(workItem);
    const canonical = `${site.url}${getRoute(CONTENT_SLUGS.WORK, subType, slug)}`;

    return generatePageMetadata({
      title: frontmatter.seo.metaTitle,
      description: frontmatter.seo.metaDescription,
      keywords: frontmatter.seo.keywords,
      ogImage: isLocked ? undefined : `${site.url}${getWorkThumbnailPath(subType as WorkSubType, slug)}`,
      canonical,
      noIndex: isLocked,
    });
  } catch {
    return {};
  }
}

export default async function WorkItemPage({ params }: WorkItemPageProps) {
  const { subType, slug } = await params;
  const workItem = getWorkItemBySlug(subType, slug);

  if (!workItem) {
    notFound();
  }

  // Server-side authentication check
  const needsPassword = requiresPassword(workItem);
  const authenticated = needsPassword ? await isAuthenticated(slug) : true;

  // Show password prompt if locked and not authenticated
  if (needsPassword && !authenticated) {
    return (
      <ServerPasswordPrompt
        subType={subType}
        slug={slug}
        title={workItem.frontmatter.title}
        workItemTypeLabel={getWorkTypeLabel(workItem.frontmatter.type)}
      />
    );
  }

  // Render work item content
  const { frontmatter, content } = workItem;

  // Get adjacent work items for next/prev navigation
  const { prev, next } = getAdjacentWork(slug);

  return (
    <>
      <WorkItemTracker
        slug={slug}
        title={frontmatter.title}
        company={frontmatter.company}
      />
      <article className="px-8 py-16 lg:px-16 lg:py-24">
        <div className="max-w-3xl">
        {/* Back Link */}
        <Link
          href={routes.work}
          className="inline-flex items-center text-sm text-content-muted hover:text-content-primary mb-8 transition-colors"
        >
          ← Back to work
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-content-primary">
            {frontmatter.title}
          </h1>

          <p className="mb-6 text-lg text-content-muted leading-relaxed">
            {frontmatter.description}
          </p>

          {(frontmatter.role || frontmatter.duration || frontmatter.year) && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-content-muted border-t border-b border-border-default py-4">
            {frontmatter.role && (
            <div>
              <span className="font-medium text-content-primary">Role:</span> {frontmatter.role}
            </div>
            )}
            {frontmatter.duration && (
            <div>
              <span className="font-medium text-content-primary">Duration:</span> {frontmatter.duration}
            </div>
            )}
            {frontmatter.year && (
            <div>
              <span className="font-medium text-content-primary">Year:</span> {frontmatter.year}
            </div>
            )}
          </div>
          )}
        </header>

        {/* Content */}
        <MDXRenderer
          content={content}
          contentContext={{ contentType: CONTENT_SLUGS.WORK, subType, slug }}
        />

        {/* Next/Previous Navigation */}
        <ContentNavigation
          prev={prev ? { href: getRoute(CONTENT_SLUGS.WORK, prev.subType, prev.slug), title: prev.frontmatter.title } : null}
          next={next ? { href: getRoute(CONTENT_SLUGS.WORK, next.subType, next.slug), title: next.frontmatter.title } : null}
        />
        </div>
      </article>
    </>
  );
}
