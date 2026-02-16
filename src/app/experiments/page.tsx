import { getPageBySlug } from '@/lib/mdx';
import { generatePageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = getPageBySlug('experiments');
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

export default function ExperimentsPage() {
  const page = getPageBySlug('experiments');

  if (!page) {
    notFound();
  }

  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title={page.frontmatter.title}
        description={page.frontmatter.description}
      />

      <EmptyState
        title="No experiments yet"
        description="Coming soon: Design explorations, code experiments, and prototypes"
      />
    </PageLayout>
  );
}
