import { MDXRemote } from 'next-mdx-remote/rsc';

interface MDXRendererProps {
  content: string;
}

export default function MDXRenderer({ content }: MDXRendererProps) {
  return (
    <div className="prose prose-gray prose-lg max-w-none">
      <MDXRemote source={content} />
    </div>
  );
}
