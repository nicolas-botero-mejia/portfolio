import { getPageBySlug } from '@/lib/mdx';
import MDXRenderer from '@/components/MDXRenderer';
import PageLayout from '@/components/ui/PageLayout';
import { generatePageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { CONTENT_SLUGS } from '@/data';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = getPageBySlug(CONTENT_SLUGS.COLOPHON);
    if (!page) return {};

    const { frontmatter } = page;
    return generatePageMetadata({
      title: frontmatter.seo.metaTitle,
      description: frontmatter.seo.metaDescription,
      keywords: frontmatter.seo.keywords,
    });
  } catch {
    return {};
  }
}

export default function ColophonPage() {
  const page = getPageBySlug(CONTENT_SLUGS.COLOPHON);

  if (!page) {
    notFound();
  }

  return (
    <PageLayout maxWidth="prose">
      <MDXRenderer content={page.content} />
    </PageLayout>
  );
}
