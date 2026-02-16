import { getPageOrNotFound } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS } from '@/data';
import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';

export const generateMetadata = generateMetadataForPage(CONTENT_SLUGS.READING);

export default function ReadingPage() {
  const page = getPageOrNotFound(CONTENT_SLUGS.READING);

  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title={page.frontmatter.title}
        description={page.frontmatter.description}
      />

      <EmptyState
        title="No reading content yet"
        description="Coming soon: Book notes and article summaries"
      />
    </PageLayout>
  );
}
