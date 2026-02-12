import Link from 'next/link';
import { getNowEntries } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { generatePageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { routes } from '@/data';

const LIMIT = 10;

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export async function generateMetadata(): Promise<Metadata> {
  try {
    const entries = getNowEntries();
    const latest = entries[0];
    if (!latest) return {};

    const { frontmatter } = latest;
    return generatePageMetadata({
      title: frontmatter.seo.metaTitle,
      description: frontmatter.seo.metaDescription,
      keywords: frontmatter.seo.keywords,
    });
  } catch {
    return {};
  }
}

interface NowPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function NowPage({ searchParams }: NowPageProps) {
  const { page } = await searchParams;
  const pageNum = Math.max(1, parseInt(page ?? '1', 10) || 1);

  const allEntries = getNowEntries();

  if (allEntries.length === 0) {
    notFound();
  }

  const entriesToShow = allEntries.slice(0, pageNum * LIMIT);
  const hasMore = entriesToShow.length < allEntries.length;

  return (
    <div className="bg-white">
      <div className="px-8 py-16 lg:px-16 lg:py-24">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Now</h1>
          <p className="text-gray-600 mb-12">
            What I&apos;m doing, thinking about, and focusing on right now.
            <br />
            <a
              href="https://nownownow.com/about"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 underline text-sm"
            >
              What is a /now page?
            </a>
          </p>

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
        </div>
      </div>
    </div>
  );
}
