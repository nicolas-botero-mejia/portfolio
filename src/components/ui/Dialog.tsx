'use client';

import * as RadixDialog from '@radix-ui/react-dialog';

interface DialogProps {
  trigger: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * Reusable Dialog using Radix. You provide styling; Radix provides behavior.
 * Usage:
 *   <Dialog trigger={<button>Open</button>} title="Title" description="Optional a11y description">
 *     <p>Your content here</p>
 *   </Dialog>
 */
// 1. Layout — primitive scale; 2. Semantic colors — role-based
const OVERLAY_LAYOUT = 'fixed inset-0 bg-black/50';
const CONTENT_LAYOUT = 'fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg p-8 shadow-xl focus:outline-none';
const CONTENT_COLORS = 'bg-background-surface';
const TITLE_LAYOUT = 'text-lg font-semibold text-content-primary';
const DESCRIPTION_LAYOUT = 'mt-2 text-sm text-content-muted';
const CLOSE_LAYOUT = 'mt-6 rounded-lg border border-border-strong px-4 py-2 text-sm font-medium';
const CLOSE_COLORS = 'text-content-secondary hover:bg-background-muted';

export default function Dialog({ trigger, title, description, children }: DialogProps) {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild>
        {trigger}
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={OVERLAY_LAYOUT} />
        <RadixDialog.Content className={`${CONTENT_LAYOUT} ${CONTENT_COLORS}`}>
          <RadixDialog.Title className={TITLE_LAYOUT}>
            {title}
          </RadixDialog.Title>
          {description && (
            <RadixDialog.Description className={DESCRIPTION_LAYOUT}>
              {description}
            </RadixDialog.Description>
          )}
          <div className="mt-6">
            {children}
          </div>
          <RadixDialog.Close asChild>
            <button className={`${CLOSE_LAYOUT} ${CLOSE_COLORS}`}>
              Close
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
