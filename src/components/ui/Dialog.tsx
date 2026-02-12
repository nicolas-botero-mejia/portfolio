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
export default function Dialog({ trigger, title, description, children }: DialogProps) {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild>
        {trigger}
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 bg-black/50" />
        <RadixDialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-8 shadow-xl focus:outline-none">
          <RadixDialog.Title className="text-lg font-semibold text-gray-900">
            {title}
          </RadixDialog.Title>
          {description && (
            <RadixDialog.Description className="mt-2 text-sm text-gray-600">
              {description}
            </RadixDialog.Description>
          )}
          <div className="mt-6">
            {children}
          </div>
          <RadixDialog.Close asChild>
            <button className="mt-6 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Close
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
