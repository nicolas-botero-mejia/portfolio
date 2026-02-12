type BadgeVariant = 'default' | 'success' | 'warning' | 'neutral';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default:
    'bg-gray-100 text-gray-700 border-gray-200',
  success:
    'bg-green-50 text-green-800 border-green-200',
  warning:
    'bg-amber-50 text-amber-800 border-amber-200',
  neutral:
    'bg-gray-50 text-gray-600 border-gray-100',
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
