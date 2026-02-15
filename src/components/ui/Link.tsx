import NextLink from 'next/link';

type LinkVariant = 'default' | 'muted' | 'ghost';

interface LinkBaseProps {
  href: string;
  children: React.ReactNode;
  /** Open in new tab and set rel="noopener noreferrer". Use for external URLs. */
  external?: boolean;
  variant?: LinkVariant;
  className?: string;
}

// 1. Layout & typography — primitive scale
const LAYOUT =
  'inline-flex items-center rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-background-primary focus-visible:ring-offset-2 transition-colors';

// 2. Semantic colors — role-based (variants)
const variantStyles: Record<LinkVariant, string> = {
  default:
    'text-content-primary underline decoration-border-default underline-offset-4 hover:decoration-content-secondary hover:text-content-secondary',
  muted:
    'text-content-muted underline decoration-border-subtle underline-offset-4 hover:text-content-secondary hover:decoration-border-default',
  ghost:
    'text-content-secondary hover:text-content-primary hover:bg-background-subtle',
};

export default function Link({
  href,
  children,
  external = false,
  variant = 'default',
  className = '',
}: LinkBaseProps) {
  const styles = `${LAYOUT} ${variantStyles[variant]} ${className}`;

  return (
    <NextLink
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={styles}
    >
      {children}
    </NextLink>
  );
}
