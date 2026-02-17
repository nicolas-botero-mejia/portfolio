import { notFound } from 'next/navigation';
import { getPageOrNotFound, getAllWork } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS } from '@/data';
import { features } from '@/config/features';
import WorkClient from '@/components/work/WorkClient';
import PageLayout from '@/components/ui/PageLayout';
import SectionGate from '@/components/SectionGate';

export const generateMetadata = features.sections.work.enabled
  ? generateMetadataForPage(CONTENT_SLUGS.WORK)
  : () => Promise.resolve({});

export default function WorkPage() {
  if (process.env.NODE_ENV !== 'development' && !features.sections.work.enabled) notFound();
  const page = getPageOrNotFound(CONTENT_SLUGS.WORK);
  const allWork = getAllWork();

  return (
    <SectionGate section={CONTENT_SLUGS.WORK}>
      <PageLayout maxWidth="lg">
        <WorkClient
          allWork={allWork}
          title={page.frontmatter.title}
          description={page.frontmatter.description}
        />
      </PageLayout>
    </SectionGate>
  );
}
