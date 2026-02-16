import { getPageOrNotFound } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS } from '@/data';
import MDXRenderer from '@/components/MDXRenderer';
import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';

export const generateMetadata = generateMetadataForPage(CONTENT_SLUGS.COLOPHON);

export default function ColophonPage() {
  const page = getPageOrNotFound(CONTENT_SLUGS.COLOPHON);

  return (
    <PageLayout maxWidth="prose">
      <PageHeader
        title={page.frontmatter.title}
        description={page.frontmatter.description}
        variant="serif"
      />
      <MDXRenderer content={page.content} />
    </PageLayout>
  );
}
