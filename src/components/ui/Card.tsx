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
  const baseStyles =
    'rounded-lg bg-white shadow-sm border border-gray-100 transition-shadow' +
    ' hover:shadow-md focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2' +
    ' active:shadow-sm';

  const linkStyles = as === 'link' ? 'block cursor-pointer' : '';

  if (as === 'link' && href) {
    return (
      <Link
        href={href}
        className={`${baseStyles} ${linkStyles} ${className}`}
      >
        {children}
      </Link>
    );
  }

  return <div className={`${baseStyles} ${className}`}>{children}</div>;
}
