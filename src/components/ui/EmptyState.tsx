interface EmptyStateProps {
  /** Short title (e.g. "No items yet") */
  title: string;
  /** Optional longer description */
  description?: string;
  /** Optional icon (e.g. SVG or icon component) */
  icon?: React.ReactNode;
  /** Optional CTA (e.g. Button or Link) */
  action?: React.ReactNode;
  className?: string;
}

// 1. Layout — primitive scale
const WRAPPER_LAYOUT =
  'flex flex-col items-center justify-center rounded-lg border border-border-subtle bg-background-subtle p-12 text-center';
const ICON_LAYOUT = 'mb-4';
const TITLE_LAYOUT = 'text-lg font-semibold mb-2';
const DESCRIPTION_LAYOUT = 'text-sm max-w-sm mb-6';

// 2. Semantic colors — role-based
const titleStyles = 'text-content-primary';
const descriptionStyles = 'text-content-muted';

export default function EmptyState({
  title,
  description,
  icon,
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`${WRAPPER_LAYOUT} ${className}`} role="status" aria-live="polite">
      {icon && <div className={ICON_LAYOUT}>{icon}</div>}
      <p className={`${TITLE_LAYOUT} ${titleStyles}`}>{title}</p>
      {description && (
        <p className={`${DESCRIPTION_LAYOUT} ${descriptionStyles}`}>{description}</p>
      )}
      {action && <div>{action}</div>}
    </div>
  );
}
