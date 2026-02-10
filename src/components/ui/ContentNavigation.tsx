import Link from 'next/link';

interface NavigationItem {
  slug: string;
  title: string;
}

interface ContentNavigationProps {
  prev: NavigationItem | null;
  next: NavigationItem | null;
  basePath?: string; // e.g., '/work/case-studies'
}

export default function ContentNavigation({ prev, next, basePath = '/work' }: ContentNavigationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav className="mt-16 border-t border-gray-200 pt-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        {/* Previous */}
        {prev ? (
          <Link
            href={`${basePath}/${prev.slug}`}
            className="group flex flex-col"
          >
            <span className="mb-2 text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
              ← Previous
            </span>
            <span className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div /> // Empty div to maintain grid layout
        )}

        {/* Next */}
        {next && (
          <Link
            href={`${basePath}/${next.slug}`}
            className="group flex flex-col text-right sm:col-start-2"
          >
            <span className="mb-2 text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
              Next →
            </span>
            <span className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors">
              {next.title}
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}
