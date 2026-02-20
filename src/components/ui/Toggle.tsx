'use client';

interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  disabled?: boolean;
  'aria-label'?: string;
}

const TRACK =
  'relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-background-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50';
const THUMB =
  'pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-content-inverted shadow-sm transition-transform';

export default function Toggle({ checked, onChange, disabled = false, 'aria-label': ariaLabel }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`${TRACK} ${checked ? 'bg-action-primary-bg' : 'bg-background-muted'}`}
    >
      <span className={`${THUMB} ${checked ? 'translate-x-4' : 'translate-x-0.5'}`} />
    </button>
  );
}
