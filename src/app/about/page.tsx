import { getPageBySlug } from '@/lib/mdx';
import MDXRenderer from '@/components/MDXRenderer';
import { notFound } from 'next/navigation';
import { SLUGS } from '@/data';

export default function AboutPage() {
  const page = getPageBySlug(SLUGS.ABOUT);

  if (!page) {
    notFound();
  }

  return <MDXRenderer content={page.content} />;
}
