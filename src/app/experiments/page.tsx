import { notFound } from 'next/navigation';
import { getPageOrNotFound } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS } from '@/data';
import { features } from '@/config/features';
import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';

export const generateMetadata = features.sections.experiments.enabled
  ? generateMetadataForPage(CONTENT_SLUGS.EXPERIMENTS)
  : () => Promise.resolve({});

export default function ExperimentsPage() {
  if (!features.sections.experiments.enabled) notFound();
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
