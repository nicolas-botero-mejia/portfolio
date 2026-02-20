import Link from 'next/link';
import { forwardRef } from 'react';
import type { ButtonVariant } from './Button';
import { VARIANT_STYLES } from './Button';

type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonBaseProps {
  'aria-label': string;
  variant?: ButtonVariant;
  size?: IconButtonSize;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

interface IconButtonAsButton extends IconButtonBaseProps {
  as?: 'button';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

interface IconButtonAsLink extends IconButtonBaseProps {
  as: 'link';
  href: string;
  external?: boolean;
}

type IconButtonProps = IconButtonAsButton | IconButtonAsLink;

const BASE =
  'inline-flex items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-background-primary focus-visible:ring-offset-2 disabled:pointer-events-none';

const SIZE_STYLES: Record<IconButtonSize, string> = {
  sm: 'h-8 w-8 p-1.5',
  md: 'h-10 w-10 p-2.5',
  lg: 'h-12 w-12 p-3',
};

const IconButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, IconButtonProps>(function IconButton(
  props,
  ref
) {
  const {
    variant = 'primary',
    size = 'md',
    disabled = false,
    children,
    className = '',
    'aria-label': ariaLabel,
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
        aria-label={ariaLabel}
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
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
});

export default IconButton;
