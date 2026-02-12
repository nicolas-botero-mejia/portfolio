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
export default function CardListItem({
  href,
  primary,
  secondary,
  trailing,
  selected = false,
  className = '',
}: CardListItemProps) {
  const baseStyles =
    'flex items-center justify-between gap-4 px-4 py-3 rounded-md transition-colors' +
    ' hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-inset' +
    (selected ? ' bg-gray-100' : '');

  const content = (
    <>
      <div className="min-w-0 flex-1">
        <span className="block truncate font-medium text-gray-900">{primary}</span>
        {secondary && (
          <span className="block truncate text-sm text-gray-500">{secondary}</span>
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
