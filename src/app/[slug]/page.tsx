import { notFound } from 'next/navigation';
import { getCaseStudies, getCaseStudyBySlug } from '@/lib/mdx';
import { generatePageMetadata } from '@/lib/seo';
import { Metadata } from 'next';

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const caseStudies = getCaseStudies();
  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug,
  }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {};
  }

  const { frontmatter } = caseStudy;

  return generatePageMetadata({
    title: frontmatter.seo.metaTitle,
    description: frontmatter.seo.metaDescription,
    keywords: frontmatter.seo.keywords,
    ogImage: frontmatter.heroImage,
  });
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const { frontmatter, content } = caseStudy;

  return (
    <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="mb-12">
        <div className="mb-4 flex flex-wrap gap-2">
          {frontmatter.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {frontmatter.title}
        </h1>

        <p className="mb-6 text-xl text-gray-600">
          {frontmatter.description}
        </p>

        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          <div>
            <span className="font-semibold text-gray-900">Role:</span> {frontmatter.role}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Duration:</span> {frontmatter.duration}
          </div>
          <div>
            <span className="font-semibold text-gray-900">Year:</span> {frontmatter.year}
          </div>
        </div>
      </header>

      {/* Hero Image Placeholder */}
      <div className="mb-12 aspect-video w-full rounded-lg bg-gray-200">
        <div className="flex h-full items-center justify-center text-gray-400">
          Hero Image: {frontmatter.heroImage}
        </div>
      </div>

      {/* Content */}
      <div
        className="prose prose-gray prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-200 pt-8">
        <div className="flex items-center justify-between">
          <a
            href="/#work"
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            ← Back to portfolio
          </a>
          <div className="text-sm text-gray-500">
            {frontmatter.company} · {frontmatter.year}
          </div>
        </div>
      </footer>
    </article>
  );
}
