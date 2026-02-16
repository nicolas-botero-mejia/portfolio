import { MDXRemote } from 'next-mdx-remote/rsc';
import { createMDXComponents, type ContentContext } from '@/lib/mdxComponents';

interface MDXRendererProps {
  content: string;
  contentContext?: ContentContext;
}

export default function MDXRenderer({ content, contentContext }: MDXRendererProps) {
  const components = createMDXComponents(contentContext);

  return (
    <div className="prose prose-gray prose-lg max-w-none">
      <MDXRemote source={content} components={components} />
    </div>
  );
}
