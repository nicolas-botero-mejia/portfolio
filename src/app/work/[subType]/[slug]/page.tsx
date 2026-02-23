import { notFound } from 'next/navigation';
import Link from '@/components/ui/Link';
import { getAllWork, getWorkItemBySlug, getAdjacentWork, type WorkItem } from '@/lib/mdx';
import MDXRenderer from '@/components/MDXRenderer';
import { getRoute, getWorkTypeLabel, CONTENT_SLUGS, site } from '@/data';
import { generatePageMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { requiresPassword, isAuthenticated } from '@/lib/serverPasswordAuth';
import { getWorkThumbnailPath, type WorkSubType } from '@/lib/contentPaths';
import { isSubTypeEnabled } from '@/config/features';
import ServerPasswordPrompt from '@/components/auth/ServerPasswordPrompt';
import WorkItemTracker from '@/components/WorkItemTracker';
import ContentNavigation from '@/components/ui/ContentNavigation';
import { H1 } from '@/components/ui/Typography';

interface WorkItemPageProps {
  params: Promise<{
    subType: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllWork()
    .filter((item) => isSubTypeEnabled(CONTENT_SLUGS.WORK, item.subType))
    .map((item) => ({
      subType: item.subType,
      slug: item.slug,
    }));
}

export async function generateMetadata({ params }: WorkItemPageProps): Promise<Metadata> {
  try {
    const { subType, slug } = await params;
    if (!isSubTypeEnabled(CONTENT_SLUGS.WORK, subType)) return {};
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
  if (!isSubTypeEnabled(CONTENT_SLUGS.WORK, subType)) notFound();
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

  // Resolve related work slugs to full items (first match per slug across all work)
  const allWork = getAllWork();
  const slugToItem = new Map(allWork.map((item) => [item.slug, item]));
  const relatedItems: WorkItem[] =
    frontmatter.relatedWork?.map((s) => slugToItem.get(s)).filter((item): item is WorkItem => item != null) ?? [];

  return (
    <>
      <WorkItemTracker
        slug={slug}
        title={frontmatter.title}
        company={frontmatter.company}
      />
      <article className="px-8 py-16 lg:px-8 lg:py-4">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <header className="mb-12">
            <H1 className="mb-4">{frontmatter.title}</H1>

            <p className="mb-6 text-lg text-content-muted leading-relaxed">
              {frontmatter.description}
            </p>

            {(frontmatter.role ||
              frontmatter.duration ||
              frontmatter.year ||
              frontmatter.location ||
              frontmatter.teamLocation ||
              frontmatter.teamSize ||
              frontmatter.devices?.length ||
              frontmatter.websiteUrl) && (
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
                {frontmatter.location && (
                  <div>
                    <span className="font-medium text-content-primary">Location:</span> {frontmatter.location}
                  </div>
                )}
                {frontmatter.teamLocation && (
                  <div>
                    <span className="font-medium text-content-primary">Team location:</span> {frontmatter.teamLocation}
                  </div>
                )}
                {frontmatter.teamSize && (
                  <div>
                    <span className="font-medium text-content-primary">Team size:</span> {frontmatter.teamSize}
                  </div>
                )}
                {frontmatter.devices && frontmatter.devices.length > 0 && (
                  <div>
                    <span className="font-medium text-content-primary">Devices:</span> {frontmatter.devices.join(', ')}
                  </div>
                )}
                {frontmatter.websiteUrl && (
                  <div>
                    <span className="font-medium text-content-primary">Website:</span>{' '}
                    <Link
                      href={frontmatter.websiteUrl}
                      external
                      className="text-content-muted hover:text-content-primary transition-colors underline underline-offset-2"
                    >
                      {frontmatter.websiteDomain ?? frontmatter.websiteUrl}
                    </Link>
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

          {/* Related Work */}
          {relatedItems.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border-default">
              <h2 className="text-sm font-medium text-content-primary mb-3">Related work</h2>
              <ul className="list-none p-0 m-0 flex flex-col gap-2">
                {relatedItems.map((item) => (
                  <li key={`${item.subType}-${item.slug}`}>
                    <Link
                      href={getRoute(CONTENT_SLUGS.WORK, item.subType, item.slug)}
                      className="text-content-muted hover:text-content-primary transition-colors"
                    >
                      {item.frontmatter.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

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
