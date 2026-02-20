import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

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
    'rounded-lg bg-background-surface shadow-sm border border-border-subtle' +
    ' focus-visible:ring-2 focus-visible:ring-background-primary focus-visible:ring-offset-2';

  const linkStyles = as === 'link' ? 'block cursor-pointer' : '';

  if (as === 'link' && href) {
    return (
      <Link
        href={href}
        className={twMerge(LAYOUT, linkStyles, className)}
      >
        {children}
      </Link>
    );
  }

  return <div className={twMerge(LAYOUT, className)}>{children}</div>;
}
