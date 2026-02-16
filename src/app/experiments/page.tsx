import { getPageOrNotFound } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS } from '@/data';
import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';

export const generateMetadata = generateMetadataForPage(CONTENT_SLUGS.EXPERIMENTS);

export default function ExperimentsPage() {
  const page = getPageOrNotFound(CONTENT_SLUGS.EXPERIMENTS);

  return (
    <PageLayout maxWidth="md">
      <PageHeader
        title={page.frontmatter.title}
        description={page.frontmatter.description}
        variant="serif"
      />

      <EmptyState
        title="No experiments yet"
        description="Coming soon: Design explorations, code experiments, and prototypes"
      />
    </PageLayout>
  );
}
