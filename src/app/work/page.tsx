import { notFound } from 'next/navigation';
import { getPageOrNotFound, getAllWork } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS } from '@/data';
import { features, isSubTypeEnabled } from '@/config/features';
import WorkClient from '@/components/work/WorkClient';
import PageLayout from '@/components/ui/PageLayout';

export const generateMetadata = features.sections.work.enabled
  ? generateMetadataForPage(CONTENT_SLUGS.WORK)
  : () => Promise.resolve({});

export default function WorkPage() {
  if (!features.sections.work.enabled) notFound();
  const page = getPageOrNotFound(CONTENT_SLUGS.WORK);
  const allWork = getAllWork().filter(item => isSubTypeEnabled(CONTENT_SLUGS.WORK, item.subType));

  return (
    <PageLayout maxWidth="lg">
      <WorkClient
        allWork={allWork}
        title={page.frontmatter.title}
        description={page.frontmatter.description}
      />
    </PageLayout>
  );
}
