import { notFound } from 'next/navigation';
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
import PageLayout from '@/components/ui/PageLayout';
import WorkItemHeader from '@/components/work/WorkItemHeader';
import RelatedWorkSection from '@/components/work/RelatedWorkSection';

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

      <PageLayout as="article" maxWidth="prose" background="bg-background-muted">
        <WorkItemHeader frontmatter={frontmatter} />

        {/* Content */}
        <MDXRenderer
          content={content}
          contentContext={{ contentType: CONTENT_SLUGS.WORK, subType, slug }}
        />

        <RelatedWorkSection items={relatedItems} />

        {/* Next/Previous Navigation */}
        <ContentNavigation
          prev={prev ? { href: getRoute(CONTENT_SLUGS.WORK, prev.subType, prev.slug), title: prev.frontmatter.title } : null}
          next={next ? { href: getRoute(CONTENT_SLUGS.WORK, next.subType, next.slug), title: next.frontmatter.title } : null}
        />
      </PageLayout>
    </>
  );
}
