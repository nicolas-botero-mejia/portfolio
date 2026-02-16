import WorkClient from '@/components/work/WorkClient';
import PageLayout from '@/components/ui/PageLayout';
import { getPageBySlug, getAllWork } from '@/lib/mdx';
import { generatePageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = getPageBySlug('work');
    if (!page) return {};

    const { frontmatter } = page;
    return generatePageMetadata({
      title: frontmatter.seo.metaTitle,
      description: frontmatter.seo.metaDescription,
      keywords: frontmatter.seo.keywords,
    });
  } catch {
    return {};
  }
}

export default function WorkPage() {
  const page = getPageBySlug('work');

  if (!page) {
    notFound();
  }

  const allWork = getAllWork();

  return (
    <PageLayout maxWidth="lg">
      <WorkClient
        allWork={allWork}
        title={page.frontmatter.title}
        description={page.frontmatter.description}
      />
    </PageLayout>
  );
}
