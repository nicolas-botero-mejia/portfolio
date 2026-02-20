'use client';

export interface Option<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  'aria-label': string;
  className?: string;
}

// 1. Layout — primitive scale
const CONTAINER =
  'flex rounded-md border border-border-default overflow-hidden';
const SEGMENT_BASE =
  'flex-1 px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-background-primary';

// 2. Semantic colors — role-based
const SEGMENT_ACTIVE = 'bg-action-primary-bg text-content-inverted';
const SEGMENT_INACTIVE =
  'bg-background-surface text-content-secondary hover:bg-background-subtle';

export default function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  'aria-label': ariaLabel,
  className = '',
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={`${CONTAINER} ${className}`}
    >
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(option.value)}
            className={`${SEGMENT_BASE} ${isActive ? SEGMENT_ACTIVE : SEGMENT_INACTIVE}`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
