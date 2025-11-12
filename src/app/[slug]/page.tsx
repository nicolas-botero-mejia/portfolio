import { notFound } from 'next/navigation';
import { getCaseStudies, getCaseStudyBySlug } from '@/lib/mdx';
import { generatePageMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import CaseStudyContent from '@/components/CaseStudyContent';

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

  return <CaseStudyContent caseStudy={caseStudy} />;
}
