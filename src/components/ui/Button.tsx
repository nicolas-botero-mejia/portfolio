import Link from 'next/link';
import { forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  as?: 'button';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

interface ButtonAsLink extends ButtonBaseProps {
  as: 'link';
  href: string;
  external?: boolean;
}

export type ButtonProps = ButtonAsButton | ButtonAsLink;

// 1. Base layout — structural/focus/transition only (no size tokens)
const BASE =
  'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-background-primary focus-visible:ring-offset-2 disabled:pointer-events-none';

// 2. Size — primitive scale
const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'rounded-md px-3 py-1.5 text-xs',
  md: 'rounded-lg px-4 py-2 text-sm',
  lg: 'rounded-lg px-6 py-3 text-base',
};

// 3. Semantic colors — role-based (variants); exported for IconButton
export const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-action-primary-bg text-action-primary-text hover:bg-action-primary-hover active:bg-action-primary-active disabled:bg-action-primary-disabled-bg disabled:text-action-primary-disabled-text disabled:cursor-not-allowed',
  secondary:
    'border border-action-secondary-border bg-action-secondary-bg text-action-secondary-text hover:bg-action-secondary-hover active:bg-action-secondary-active disabled:border-action-secondary-disabled-border disabled:text-action-secondary-disabled-text disabled:cursor-not-allowed',
  ghost:
    'text-action-ghost-text hover:bg-action-ghost-hover active:bg-action-ghost-active disabled:text-action-ghost-disabled disabled:cursor-not-allowed',
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(function Button(props, ref) {
  const {
    variant = 'primary',
    size = 'md',
    disabled = false,
    children,
    className = '',
  } = props;

  const styles = `${BASE} ${SIZE_STYLES[size]} ${VARIANT_STYLES[variant]} ${className}`;

  if (props.as === 'link') {
    const { href, external } = props;
    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={disabled ? `${styles} pointer-events-none opacity-50` : styles}
        aria-disabled={disabled ? true : undefined}
        tabIndex={disabled ? -1 : undefined}
        onClick={disabled ? (e) => e.preventDefault() : undefined}
      >
        {children}
      </Link>
    );
  }

  const { onClick, type = 'button' } = props;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
});

export default Button;
