import { getPageBySlug } from '@/lib/mdx';
import MDXRenderer from '@/components/MDXRenderer';
import { notFound } from 'next/navigation';

export default function NowPage() {
  const page = getPageBySlug('now');

  if (!page) {
    notFound();
  }

  return <MDXRenderer content={page.content} />;
}
