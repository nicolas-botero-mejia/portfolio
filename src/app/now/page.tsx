import Link from 'next/link';
import { getPageOrNotFound, getNowEntries } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS, routes } from '@/data';
import { MDXRemote } from 'next-mdx-remote/rsc';
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

export const generateMetadata = generateMetadataForPage(CONTENT_SLUGS.NOW);

interface NowPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NowPage({ searchParams }: NowPageProps) {
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
              className="text-gray-500 hover:text-gray-700 underline text-sm"
            >
              What is a /now page?
            </a>
          </>
        }
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
                className="border-b border-gray-200 pb-12 last:border-0"
              >
                <time
                  dateTime={entry.frontmatter.date}
                  className="block text-sm font-medium text-gray-500 mb-4"
                >
                  {formatDate(entry.frontmatter.date)}
                </time>
                <div className="prose prose-gray prose-lg max-w-none">
                  <MDXRemote source={entry.content} />
                </div>
              </article>
            ))}
          </div>

          {hasMore && (
            <div className="mt-12 text-center">
              <Link
                href={`${routes.now}?page=${pageNum + 1}`}
                className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 inline-block"
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
