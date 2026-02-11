import { MDXRemote } from 'next-mdx-remote/rsc';

interface MDXRendererProps {
  content: string;
}

export default function MDXRenderer({ content }: MDXRendererProps) {
  return (
    <div className="bg-white">
      <div className="px-8 py-16 lg:px-16 lg:py-24">
        <div className="max-w-3xl prose prose-gray prose-lg">
          <MDXRemote source={content} />
        </div>
      </div>
    </div>
  );
}
