import { notFound } from 'next/navigation';
import { getPageOrNotFound } from '@/lib/mdx';
import { generateMetadataForPage } from '@/lib/seo';
import { CONTENT_SLUGS } from '@/data';
import { features } from '@/config/features';
import MDXRenderer from '@/components/MDXRenderer';
import PageLayout from '@/components/ui/PageLayout';
import PageHeader from '@/components/ui/PageHeader';

export const generateMetadata = features.sections.uses.enabled
  ? generateMetadataForPage(CONTENT_SLUGS.USES)
  : () => Promise.resolve({});

export default function UsesPage() {
  if (!features.sections.uses.enabled) notFound();
  const page = getPageOrNotFound(CONTENT_SLUGS.USES);

  return (
    <PageLayout maxWidth="prose">
      <PageHeader
        title={page.frontmatter.title}
        description={page.frontmatter.description}
        variant="serif"
      />

      <MDXRenderer
        content={page.content}
        contentContext={{ contentType: CONTENT_SLUGS.PAGES, subType: null, slug: CONTENT_SLUGS.USES }}
      />
    </PageLayout>
  );
}
