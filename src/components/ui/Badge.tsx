type BadgeVariant = 'default' | 'success' | 'warning' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-badge-default-bg text-badge-default-text border-badge-default-border',
  success:
    'bg-badge-success-bg text-badge-success-text border-badge-success-border',
  warning:
    'bg-badge-warning-bg text-badge-warning-text border-badge-warning-border',
  neutral:
    'bg-badge-neutral-bg text-badge-neutral-text border-badge-neutral-border',
};

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
