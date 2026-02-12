import Link from 'next/link';

interface CardProps {
  children: React.ReactNode;
  as?: 'div' | 'link';
  href?: string;
  className?: string;
}

/** Base card container. Use as="link" + href for clickable cards. */
export default function Card({
  children,
  as = 'div',
  href,
  className = '',
}: CardProps) {
  // 1. Layout & typography — primitive scale; 2. Semantic colors — role-based
  const LAYOUT =
    'rounded-lg bg-background-surface shadow-sm border border-border-subtle transition-shadow' +
    ' hover:shadow-md focus-visible:ring-2 focus-visible:ring-background-primary focus-visible:ring-offset-2' +
    ' active:shadow-sm';

  const linkStyles = as === 'link' ? 'block cursor-pointer' : '';

  if (as === 'link' && href) {
    return (
      <Link
        href={href}
        className={`${LAYOUT} ${linkStyles} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return <div className={`${LAYOUT} ${className}`}>{children}</div>;
}
