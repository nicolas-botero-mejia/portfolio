import Link from 'next/link';

interface CardListItemProps {
  href?: string;
  primary: string;
  secondary?: string;
  trailing?: React.ReactNode;
  selected?: boolean;
  className?: string;
}

/**
 * List item for use inside Card + ScrollArea.
 * States: default, hover, focus, selected (data-selected or aria-selected)
 */
// 1. Layout — primitive scale
const LAYOUT =
  'flex items-center justify-between gap-4 px-4 py-3 rounded-md transition-colors' +
  ' hover:bg-background-muted focus-visible:bg-background-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background-primary focus-visible:ring-inset';

// 2. Semantic colors — role-based
const primaryStyles = 'block truncate font-medium text-content-primary';
const secondaryStyles = 'block truncate text-sm text-content-muted';

export default function CardListItem({
  href,
  primary,
  secondary,
  trailing,
  selected = false,
  className = '',
}: CardListItemProps) {
  const baseStyles = `${LAYOUT}${selected ? ' bg-background-subtle' : ''}`;

  const content = (
    <>
      <div className="min-w-0 flex-1">
        <span className={primaryStyles}>{primary}</span>
        {secondary && (
          <span className={secondaryStyles}>{secondary}</span>
        )}
      </div>
      {trailing && <div className="shrink-0">{trailing}</div>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={`${baseStyles} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <div
      className={`${baseStyles} ${className}`}
      data-selected={selected}
    >
      {content}
    </div>
  );
}
