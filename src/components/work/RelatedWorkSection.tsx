import Link from '@/components/ui/Link';
import { getRoute, CONTENT_SLUGS } from '@/data';
import type { WorkItem } from '@/lib/mdx';

interface RelatedWorkSectionProps {
  items: WorkItem[];
}

export default function RelatedWorkSection({ items }: RelatedWorkSectionProps) {
  if (items.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border-default">
      <h2 className="text-sm font-medium text-content-primary mb-3">Related work</h2>
      <ul className="list-none p-0 m-0 flex flex-col gap-2">
        {items.map((item) => (
          <li key={`${item.subType}-${item.slug}`}>
            <Link
              href={getRoute(CONTENT_SLUGS.WORK, item.subType, item.slug)}
              className="text-content-muted hover:text-content-primary transition-colors"
            >
              {item.frontmatter.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
