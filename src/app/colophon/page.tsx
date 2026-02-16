import { getPageOrNotFound } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import MDXRenderer from '@/components/MDXRenderer';
import PageLayout from '@/components/ui/PageLayout';

export const generateMetadata = generateMetadataForPage('colophon');

export default function ColophonPage() {
  const page = getPageOrNotFound('colophon');

  return (
    <PageLayout maxWidth="prose">
      <MDXRenderer content={page.content} />
    </PageLayout>
  );
}
