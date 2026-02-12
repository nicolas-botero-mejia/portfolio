type BadgeVariant = 'default' | 'success' | 'warning' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-background-subtle text-content-secondary border-border-default',
  success:
    'bg-status-success-bg text-status-success-text border-status-success-border',
  warning:
    'bg-status-warning-bg text-status-warning-text border-status-warning-border',
  neutral:
    'bg-status-neutral-bg text-status-neutral-text border-status-neutral-border',
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
