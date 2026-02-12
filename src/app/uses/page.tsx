import { getPageBySlug } from '@/lib/mdx';
import MDXRenderer from '@/components/MDXRenderer';
import { notFound } from 'next/navigation';
import { SLUGS } from '@/data';

export default function UsesPage() {
  const page = getPageBySlug(SLUGS.USES);

  if (!page) {
    notFound();
  }

  return <MDXRenderer content={page.content} />;
}
