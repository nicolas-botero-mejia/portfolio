import { getPageBySlug } from '@/lib/mdx';
import MDXRenderer from '@/components/MDXRenderer';
import { generatePageMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const page = getPageBySlug('colophon');
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
  const page = getPageBySlug('colophon');

  if (!page) {
    notFound();
  }

  return <MDXRenderer content={page.content} />;
}
