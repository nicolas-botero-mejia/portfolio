import { getPageBySlug } from '@/lib/mdx';
import MDXRenderer from '@/components/MDXRenderer';
import { notFound } from 'next/navigation';

export default function UsesPage() {
  const page = getPageBySlug('uses');

  if (!page) {
    notFound();
  }

  return <MDXRenderer content={page.content} />;
}
