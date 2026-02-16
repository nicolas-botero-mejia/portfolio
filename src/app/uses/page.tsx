import { getPageOrNotFound } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS } from '@/data';
import MDXRenderer from '@/components/MDXRenderer';
import PageLayout from '@/components/ui/PageLayout';

export const generateMetadata = generateMetadataForPage(CONTENT_SLUGS.USES);

export default function UsesPage() {
  const page = getPageOrNotFound(CONTENT_SLUGS.USES);

  return (
    <PageLayout maxWidth="prose">
      <MDXRenderer content={page.content} />
    </PageLayout>
  );
}
