'use client';

import * as RadixTooltip from '@radix-ui/react-tooltip';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

// 1. Layout — primitive scale; 2. Semantic colors — dark tooltip (primary bg, inverted text)
const LAYOUT = 'rounded-md px-3 py-2 text-sm shadow-lg';
const COLORS = 'bg-background-primary text-content-inverted';

export default function Tooltip({ content, children, side = 'top' }: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={300}>
      <RadixTooltip.Root>
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={8}
            className={`${LAYOUT} ${COLORS}`}
          >
            {content}
            <RadixTooltip.Arrow className="fill-background-primary" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}
