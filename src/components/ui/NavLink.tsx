'use client';

import NextLink from 'next/link';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

// 1. Layout & typography — primitive scale
const LAYOUT =
  'text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-background-primary focus-visible:ring-offset-2 rounded';

// 2. Semantic colors — role-based (active vs inactive)
const ACTIVE_STYLES = 'text-content-primary font-medium';
const INACTIVE_STYLES = 'text-content-muted hover:text-content-primary';

export default function NavLink({
  href,
  children,
  active = false,
  onClick,
  className = '',
}: NavLinkProps) {
  return (
    <NextLink
      href={href}
      onClick={onClick}
      className={`${LAYOUT} ${active ? ACTIVE_STYLES : INACTIVE_STYLES} ${className}`}
    >
      {children}
    </NextLink>
  );
}
