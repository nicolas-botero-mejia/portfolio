import { getPageOrNotFound, getAllWork } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import WorkClient from '@/components/work/WorkClient';
import PageLayout from '@/components/ui/PageLayout';

export const generateMetadata = generateMetadataForPage('work');

export default function WorkPage() {
  const page = getPageOrNotFound('work');
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
