import { notFound } from 'next/navigation';
import { getPageOrNotFound } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS } from '@/data';
import { features } from '@/config/features';
import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';
import EmptyState from '@/components/ui/EmptyState';
import SectionGate from '@/components/SectionGate';

export const generateMetadata = features.sections.writing.enabled
  ? generateMetadataForPage(CONTENT_SLUGS.WRITING)
  : () => Promise.resolve({});

export default function WritingPage() {
  if (process.env.NODE_ENV !== 'development' && !features.sections.writing.enabled) notFound();
  const page = getPageOrNotFound(CONTENT_SLUGS.WRITING);

  return (
    <SectionGate section={CONTENT_SLUGS.WRITING}>
      <PageLayout maxWidth="md">
        <PageHeader
          title={page.frontmatter.title}
          description={page.frontmatter.description}
          variant="serif"
        />

        <EmptyState
          title="No writing content yet"
          description="Coming soon: Blog posts, thoughts, and curated quotes"
        />
      </PageLayout>
    </SectionGate>
  );
}
