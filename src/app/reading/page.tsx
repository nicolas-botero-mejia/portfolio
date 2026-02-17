import { notFound } from 'next/navigation';
import { getPageOrNotFound } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS } from '@/data';
import { features } from '@/config/features';
import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';

export const generateMetadata = features.sections.reading.enabled
  ? generateMetadataForPage(CONTENT_SLUGS.READING)
  : () => Promise.resolve({});

export default function ReadingPage() {
  if (!features.sections.reading.enabled) notFound();
  const page = getPageOrNotFound(CONTENT_SLUGS.READING);

  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title={page.frontmatter.title}
        description={page.frontmatter.description}
        variant="serif"
      />

      <EmptyState
        title="No reading content yet"
        description="Coming soon: Book notes and article summaries"
      />
    </PageLayout>
  );
}
