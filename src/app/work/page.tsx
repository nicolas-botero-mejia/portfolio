import { getPageOrNotFound, getAllWork } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS } from '@/data';
import WorkClient from '@/components/work/WorkClient';
import PageLayout from '@/components/ui/PageLayout';

export const generateMetadata = generateMetadataForPage(CONTENT_SLUGS.WORK);

export default function WorkPage() {
  const page = getPageOrNotFound(CONTENT_SLUGS.WORK);
  const allWork = getAllWork();

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
