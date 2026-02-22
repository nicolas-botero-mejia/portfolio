import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkBreaks from 'remark-breaks';
import { remarkAnnotations } from '@/lib/remarkAnnotations';
import { createMDXComponents, type ContentContext } from '@/lib/mdxComponents';

interface MDXRendererProps {
  content: string;
  contentContext?: ContentContext;
}

export default function MDXRenderer({ content, contentContext }: MDXRendererProps) {
  const components = createMDXComponents(contentContext);

  return (
    <div>
      <MDXRemote
        source={content}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkBreaks, remarkAnnotations()] } }}
      />
    </div>
  );
}
