'use client';

import * as RadixScrollArea from '@radix-ui/react-scroll-area';

interface ScrollAreaProps {
  children: React.ReactNode;
  className?: string;
}

// Layout + semantic: scrollbar thumb uses border-default (subtle gray)
const ROOT_LAYOUT = 'overflow-hidden';
const THUMB_LAYOUT =
  "relative flex-1 rounded-full bg-border-default before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-[44px] before:w-full before:min-w-[44px] before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']";

export default function ScrollArea({ children, className = '' }: ScrollAreaProps) {
  return (
    <RadixScrollArea.Root className={`${ROOT_LAYOUT} ${className}`}>
      <RadixScrollArea.Viewport className="h-full w-full rounded">
        {children}
      </RadixScrollArea.Viewport>
      <RadixScrollArea.Scrollbar
        className="flex touch-none select-none transition-colors"
        orientation="vertical"
      >
        <RadixScrollArea.Thumb className={THUMB_LAYOUT} />
      </RadixScrollArea.Scrollbar>
      <RadixScrollArea.Corner />
    </RadixScrollArea.Root>
  );
}
