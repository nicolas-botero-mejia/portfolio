import { notFound } from 'next/navigation';
import { getPageOrNotFound } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS } from '@/data';
import { features } from '@/config/features';
import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import SectionGate from '@/components/SectionGate';

export const generateMetadata = features.sections.experiments.enabled
  ? generateMetadataForPage(CONTENT_SLUGS.EXPERIMENTS)
  : () => Promise.resolve({});

export default function ExperimentsPage() {
  if (process.env.NODE_ENV !== 'development' && !features.sections.experiments.enabled) notFound();
  const page = getPageOrNotFound(CONTENT_SLUGS.EXPERIMENTS);

  return (
    <SectionGate section={CONTENT_SLUGS.EXPERIMENTS}>
      <PageLayout maxWidth="lg">
        <PageHeader
          title={page.frontmatter.title}
          description={page.frontmatter.description}
        />

        <EmptyState
          title="No experiments yet"
          description="Coming soon: Design explorations, code experiments, and prototypes"
        />
      </PageLayout>
    </SectionGate>
  );
}
