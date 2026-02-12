'use client';

import * as RadixTabs from '@radix-ui/react-tabs';

interface Tab {
  value: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultValue?: string;
}

/**
 * Reusable Tabs using Radix. You provide content; Radix provides keyboard nav and a11y.
 * Usage:
 *   <Tabs
 *     defaultValue="all"
 *     tabs={[
 *       { value: 'all', label: 'All', content: <div>...</div> },
 *       { value: 'case-studies', label: 'Case Studies', content: <div>...</div> },
 *     ]}
 *   />
 */
export default function Tabs({ tabs, defaultValue }: TabsProps) {
  const defaultTab = defaultValue ?? tabs[0]?.value;

  return (
    <RadixTabs.Root defaultValue={defaultTab}>
      <RadixTabs.List className="flex gap-1 border-b border-gray-200">
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            className="rounded-t-lg px-4 py-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 data-[state=active]:border-b-2 data-[state=active]:border-gray-900 data-[state=active]:text-gray-900"
          >
            {tab.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {tabs.map((tab) => (
        <RadixTabs.Content
          key={tab.value}
          value={tab.value}
          className="mt-6 focus:outline-none"
        >
          {tab.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
