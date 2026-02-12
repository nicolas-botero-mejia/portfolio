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

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gray-900 text-white hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 active:bg-gray-950 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed',
  secondary:
    'border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 active:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed',
  ghost:
    'text-gray-700 hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 active:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed',
};

const baseStyles =
  'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none';

export default function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    disabled = false,
    children,
    className = '',
  } = props;

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (props.as === 'link') {
    const { href, external } = props;
    return (
      <Link
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={disabled ? `${styles} pointer-events-none opacity-50` : styles}
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
