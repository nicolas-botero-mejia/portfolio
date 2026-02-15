import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonBaseProps {
  variant?: ButtonVariant;
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

type ButtonProps = ButtonAsButton | ButtonAsLink;

// 1. Layout & typography — primitive scale (tokens.ts → Tailwind theme)
const LAYOUT =
  'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-background-primary focus-visible:ring-offset-2 disabled:pointer-events-none';

// 2. Semantic colors — role-based (variants)
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-action-primary-bg text-action-primary-text hover:bg-action-primary-hover active:bg-action-primary-active disabled:bg-action-primary-disabled-bg disabled:text-action-primary-disabled-text disabled:cursor-not-allowed',
  secondary:
    'border border-action-secondary-border bg-action-secondary-bg text-action-secondary-text hover:bg-action-secondary-hover active:bg-action-secondary-active disabled:border-action-secondary-disabled-border disabled:text-action-secondary-disabled-text disabled:cursor-not-allowed',
  ghost:
    'text-action-ghost-text hover:bg-action-ghost-hover active:bg-action-ghost-active disabled:text-action-ghost-disabled disabled:cursor-not-allowed',
};

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    disabled = false,
    children,
    className = '',
  } = props;

  const styles = `${LAYOUT} ${variantStyles[variant]} ${className}`;

  if (props.as === 'link') {
    const { href, external } = props;
    return (
      <Link
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
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  );
}
