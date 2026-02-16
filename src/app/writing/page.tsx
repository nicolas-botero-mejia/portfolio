import { getPageOrNotFound } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS } from '@/data';
import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';

export const generateMetadata = generateMetadataForPage(CONTENT_SLUGS.WRITING);

export default function WritingPage() {
  const page = getPageOrNotFound(CONTENT_SLUGS.WRITING);

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
