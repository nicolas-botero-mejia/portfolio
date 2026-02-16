/**
 * Typography components for MDX and structured content.
 * Use these in MDX files for consistent headings and text styles.
 * Prose handles general MDX body; use these when you need explicit variants.
 */

type TypographyVariant = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'lead' | 'body' | 'caption';

interface TypographyBaseProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

interface TypographyProps extends TypographyBaseProps {
  variant: TypographyVariant;
}

// 1. Layout & typography — primitive scale
const LAYOUT: Record<TypographyVariant, string> = {
  h1: 'text-3xl md:text-4xl font-bold tracking-tight',
  h2: 'text-2xl md:text-3xl font-semibold tracking-tight mt-10 mb-4',
  h3: 'text-xl font-semibold mt-8 mb-3',
  h4: 'text-lg font-semibold mt-6 mb-2',
  h5: 'text-base font-semibold mt-4 mb-1',
  h6: 'text-sm font-semibold mt-4 mb-1',
  lead: 'text-lg md:text-xl',
  body: 'text-base',
  caption: 'text-sm',
};

// 2. Semantic colors — role-based
const COLOR = 'text-content-primary';
const MUTED = 'text-content-muted';

const variantColor: Record<TypographyVariant, string> = {
  h1: COLOR,
  h2: COLOR,
  h3: COLOR,
  h4: COLOR,
  h5: COLOR,
  h6: MUTED,
  lead: 'text-content-secondary',
  body: COLOR,
  caption: MUTED,
};

const defaultTag: Record<TypographyVariant, keyof React.JSX.IntrinsicElements> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  lead: 'p',
  body: 'p',
  caption: 'p',
};

export function Typography({
  variant,
  children,
  as,
  className = '',
}: TypographyProps) {
  const Tag = as ?? defaultTag[variant];
  const styles = `${LAYOUT[variant]} ${variantColor[variant]} ${className}`;
  return <Tag className={styles}>{children}</Tag>;
}

// Convenience components for MDX (import { H1, H2, Body, Caption } from '@/components/ui/Typography')
interface HeadingProps extends TypographyBaseProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function H1({ children, as = 'h1', className = '' }: HeadingProps) {
  return (
    <Typography variant="h1" as={as} className={className}>
      {children}
    </Typography>
  );
}

export function H2({ children, as = 'h2', className = '' }: HeadingProps) {
  return (
    <Typography variant="h2" as={as} className={className}>
      {children}
    </Typography>
  );
}

export function H3({ children, as = 'h3', className = '' }: HeadingProps) {
  return (
    <Typography variant="h3" as={as} className={className}>
      {children}
    </Typography>
  );
}

export function H4({ children, as = 'h4', className = '' }: HeadingProps) {
  return (
    <Typography variant="h4" as={as} className={className}>
      {children}
    </Typography>
  );
}

export function H5({ children, as = 'h5', className = '' }: HeadingProps) {
  return (
    <Typography variant="h5" as={as} className={className}>
      {children}
    </Typography>
  );
}

export function H6({ children, as = 'h6', className = '' }: HeadingProps) {
  return (
    <Typography variant="h6" as={as} className={className}>
      {children}
    </Typography>
  );
}

export function Lead({ children, as = 'p', className = '' }: TypographyBaseProps) {
  return (
    <Typography variant="lead" as={as} className={className}>
      {children}
    </Typography>
  );
}

export function Body({ children, as = 'p', className = '' }: TypographyBaseProps) {
  return (
    <Typography variant="body" as={as} className={className}>
      {children}
    </Typography>
  );
}

export function Caption({ children, as = 'p', className = '' }: TypographyBaseProps) {
  return (
    <Typography variant="caption" as={as} className={className}>
      {children}
    </Typography>
  );
}

// Inline text components for MDX element overrides
interface InlineProps {
  children: React.ReactNode;
  className?: string;
}

export function Strong({ children, className = '' }: InlineProps) {
  return <strong className={`font-semibold text-content-primary ${className}`}>{children}</strong>;
}

export function Em({ children, className = '' }: InlineProps) {
  return <em className={`italic ${className}`}>{children}</em>;
}
