import { notFound } from 'next/navigation';
import { getCaseStudies, getCaseStudyBySlug } from '@/lib/mdx';
import { generatePageMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import { requiresPassword, isAuthenticated } from '@/lib/serverPasswordAuth';
import ServerPasswordPrompt from '@/components/ServerPasswordPrompt';

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

  // Server-side authentication check
  const needsPassword = requiresPassword(caseStudy);
  const authenticated = needsPassword ? await isAuthenticated(slug) : true;

  // Show password prompt if locked and not authenticated
  if (needsPassword && !authenticated) {
    return (
      <ServerPasswordPrompt
        slug={slug}
        caseStudyTitle={caseStudy.frontmatter.title}
      />
    );
  }

  // Render case study content
  const { frontmatter, content } = caseStudy;

  return (
    <article className="px-8 py-16 lg:px-16 lg:py-24">
      <div className="max-w-3xl">
        {/* Back Link */}
        <a
          href="/"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
        >
          ← Back to work
        </a>

        {/* Header */}
        <header className="mb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
            {frontmatter.title}
          </h1>

          <p className="mb-6 text-lg text-gray-600 leading-relaxed">
            {frontmatter.description}
          </p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 border-t border-b border-gray-200 py-4">
            <div>
              <span className="font-medium text-gray-900">Role:</span> {frontmatter.role}
            </div>
            <div>
              <span className="font-medium text-gray-900">Duration:</span> {frontmatter.duration}
            </div>
            <div>
              <span className="font-medium text-gray-900">Year:</span> {frontmatter.year}
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
      </div>
    </article>
  );
}
