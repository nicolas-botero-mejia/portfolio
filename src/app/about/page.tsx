import { getPageBySlug } from '@/lib/mdx';
import MDXRenderer from '@/components/MDXRenderer';
import { notFound } from 'next/navigation';
import { CONTENT_SLUGS } from '@/data';

export default function AboutPage() {
  const page = getPageBySlug(CONTENT_SLUGS.ABOUT);

  if (!page) {
    notFound();
  }

  return <MDXRenderer content={page.content} />;
}
