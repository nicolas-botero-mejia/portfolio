import Link from 'next/link';
import { routes } from '@/data';

interface NavigationItem {
  slug: string;
  title: string;
}

interface ContentNavigationProps {
  prev: NavigationItem | null;
  next: NavigationItem | null;
  basePath?: string; // e.g., routes.work or getRoute(CONTENT_SLUGS.WORK, CONTENT_SLUGS.WORK_CASE_STUDIES)
}

// 1. Layout — primitive scale
const NAV_LAYOUT = 'mt-16 border-t border-border-default pt-8';
const GRID_LAYOUT = 'grid grid-cols-1 gap-8 sm:grid-cols-2';
const LINK_LAYOUT =
  'group flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-background-primary focus-visible:ring-offset-2 rounded';
const LABEL_LAYOUT = 'mb-2 text-sm font-medium';
const TITLE_LAYOUT = 'text-lg font-semibold';

// 2. Semantic colors — role-based
const labelStyles = 'text-content-muted group-hover:text-content-secondary transition-colors';
const titleStyles = 'text-content-primary group-hover:text-content-muted transition-colors';

export default function ContentNavigation({ prev, next, basePath = routes.work }: ContentNavigationProps) {
  if (!prev && !next) {
    return null;
  }

  return (
    <nav className={NAV_LAYOUT}>
      <div className={GRID_LAYOUT}>
        {prev ? (
          <Link href={`${basePath}/${prev.slug}`} className={LINK_LAYOUT}>
            <span className={`${LABEL_LAYOUT} ${labelStyles}`}>← Previous</span>
            <span className={titleStyles}>{prev.title}</span>
          </Link>
        ) : (
          <div />
        )}

        {next && (
          <Link
            href={`${basePath}/${next.slug}`}
            className={`${LINK_LAYOUT} text-right sm:col-start-2`}
          >
            <span className={`${LABEL_LAYOUT} ${labelStyles}`}>Next →</span>
            <span className={titleStyles}>{next.title}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
