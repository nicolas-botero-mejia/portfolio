interface DividerProps {
  /** Vertical divider for flex/grid layouts. Default is horizontal. */
  orientation?: 'horizontal' | 'vertical';
  /** Optional label centered on the line (horizontal only). */
  label?: string;
  className?: string;
}

// 1. Layout — primitive scale
const HORIZONTAL_LAYOUT = 'flex items-center gap-4 w-full';
const HR_HORIZONTAL = 'w-full border-0 border-t border-border-subtle';
const LINE_SEGMENT = 'flex-1 border-t border-border-subtle';
const LINE_VERTICAL_LAYOUT = 'self-stretch border-l border-border-subtle';
const LABEL_LAYOUT = 'text-sm font-medium shrink-0';

// 2. Semantic colors — role-based
const labelStyles = 'text-content-muted';

export default function Divider({
  orientation = 'horizontal',
  label,
  className = '',
}: DividerProps) {
  if (orientation === 'vertical') {
    return <hr className={`${LINE_VERTICAL_LAYOUT} ${className}`} role="separator" aria-orientation="vertical" />;
  }

  if (label) {
    return (
      <div className={`${HORIZONTAL_LAYOUT} ${className}`} role="separator" aria-label={label}>
        <span className={LINE_SEGMENT} aria-hidden="true" />
        <span className={`${LABEL_LAYOUT} ${labelStyles}`}>{label}</span>
        <span className={LINE_SEGMENT} aria-hidden="true" />
      </div>
    );
  }

  return <hr className={`${HR_HORIZONTAL} ${className}`} role="separator" />;
}
