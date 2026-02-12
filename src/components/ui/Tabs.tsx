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
// 1. Layout — primitive scale; 2. Semantic colors — role-based
const LIST_LAYOUT = 'flex gap-1 border-b border-border-default';
const TRIGGER_LAYOUT = 'rounded-t-lg px-4 py-2 text-sm font-medium transition-colors';
const TRIGGER_COLORS = 'text-content-muted hover:text-content-primary data-[state=active]:border-b-2 data-[state=active]:border-background-primary data-[state=active]:text-content-primary';

export default function Tabs({ tabs, defaultValue }: TabsProps) {
  const defaultTab = defaultValue ?? tabs[0]?.value;

  return (
    <RadixTabs.Root defaultValue={defaultTab}>
      <RadixTabs.List className={LIST_LAYOUT}>
        {tabs.map((tab) => (
          <RadixTabs.Trigger
            key={tab.value}
            value={tab.value}
            className={`${TRIGGER_LAYOUT} ${TRIGGER_COLORS}`}
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
