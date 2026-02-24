'use client';

import Button from './Button';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

// Active state overlay: subtle bg + primary text. Do not override focus (Button provides focus-visible ring).
const ACTIVE_CLASS = 'bg-background-subtle text-content-primary';

export default function NavLink({
  href,
  children,
  active = false,
  onClick,
  className = '',
}: NavLinkProps) {
  return (
    <Button
      as="link"
      href={href}
      variant="ghost"
      size="md"
      onClick={onClick}
      ariaCurrent={active ? 'page' : undefined}
      className={active ? `${ACTIVE_CLASS} ${className}`.trim() : className}
    >
      {children}
    </Button>
  );
}
