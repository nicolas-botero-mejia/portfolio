import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPageOrNotFound, getNowEntries } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS, routes } from '@/data';
import { features } from '@/config/features';
import MDXRenderer from '@/components/MDXRenderer';
import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';

const LIMIT = 10;

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export const generateMetadata = features.sections.now.enabled
  ? generateMetadataForPage(CONTENT_SLUGS.NOW)
  : () => Promise.resolve({});

interface NowPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NowPage({ searchParams }: NowPageProps) {
  if (!features.sections.now.enabled) notFound();
  const pageMeta = getPageOrNotFound(CONTENT_SLUGS.NOW);
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page ?? '1', 10) || 1);

  const allEntries = getNowEntries();

  const entriesToShow = allEntries.slice(0, pageNum * LIMIT);
  const hasMore = entriesToShow.length < allEntries.length;

  return (
    <PageLayout maxWidth="prose">
      <PageHeader
        title={pageMeta.frontmatter.title}
        description={
          <>
            {pageMeta.frontmatter.description}
            <br />
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-content-muted hover:text-content-secondary underline text-sm"
            >
              What is a /now page?
            </a>
          </>
        }
        variant="serif"
      />

      {allEntries.length === 0 ? (
        <EmptyState
          title="No updates yet"
          description="Check back soon for updates on what I'm working on"
        />
      ) : (
        <>
          <div className="space-y-12">
            {entriesToShow.map((entry) => (
              <article
                key={entry.slug}
                className="border-b border-border-default pb-12 last:border-0"
              >
                <time
                  dateTime={entry.frontmatter.date}
                  className="block text-sm font-medium text-content-muted mb-4"
                >
                  {formatDate(entry.frontmatter.date)}
                </time>
                <MDXRenderer
                  content={entry.content}
                  contentContext={{ contentType: CONTENT_SLUGS.NOW, subType: null, slug: entry.slug }}
                />
              </article>
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 text-center">
              <Link
                href={`${routes.now}?page=${pageNum + 1}`}
                className="rounded-lg border border-action-secondary-border px-6 py-3 text-sm font-medium text-content-secondary hover:bg-action-secondary-hover inline-block"
              >
                Load more
              </Link>
            </div>
          )}
        </>
      )}
    </PageLayout>
  );
}
