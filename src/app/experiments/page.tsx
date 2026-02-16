import { getPageOrNotFound } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';

export const generateMetadata = generateMetadataForPage('experiments');

export default function ExperimentsPage() {
  const page = getPageOrNotFound('experiments');

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
