import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Accessible label for the nav. Default: "Breadcrumb" */
  ariaLabel?: string;
  className?: string;
}

// 1. Layout & typography — primitive scale
const NAV_LAYOUT = 'flex flex-wrap items-center gap-x-2 text-sm';
const LINK_LAYOUT =
  'rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-background-primary focus-visible:ring-offset-2';
const SEPARATOR_LAYOUT = 'select-none';

// 2. Semantic colors — role-based
const linkStyles = 'text-content-muted hover:text-content-primary transition-colors';
const currentStyles = 'text-content-primary font-medium';
const separatorStyles = 'text-content-muted';

export default function Breadcrumb({
  items,
  ariaLabel = 'Breadcrumb',
  className = '',
}: BreadcrumbProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} className={`${NAV_LAYOUT} ${className}`}>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const isCurrent = isLast || !item.href;

        return (
          <span key={i} className="flex items-center gap-x-2">
            {i > 0 && (
              <span className={SEPARATOR_LAYOUT} aria-hidden="true">
                <span className={separatorStyles}>/</span>
              </span>
            )}
            {item.href && !isCurrent ? (
              <Link
                href={item.href}
                className={`${LINK_LAYOUT} ${linkStyles}`}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={isCurrent ? currentStyles : linkStyles}
                aria-current={isCurrent ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
