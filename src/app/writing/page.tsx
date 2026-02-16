import { getPageOrNotFound } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';

export const generateMetadata = generateMetadataForPage('writing');

export default function WritingPage() {
  const page = getPageOrNotFound('writing');

  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title={page.frontmatter.title}
        description={page.frontmatter.description}
      />

      <EmptyState
        title="No writing content yet"
        description="Coming soon: Blog posts, thoughts, and curated quotes"
      />
    </PageLayout>
  );
}
