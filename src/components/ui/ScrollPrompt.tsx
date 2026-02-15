'use client';

import { useEffect, useRef } from 'react';

interface ScrollPromptProps {
  /** Configurable label under the icon (e.g. "Scroll for more", "Load more") */
  label?: string;
  /** Called when the prompt enters the viewport (for load-more / infinite scroll) */
  onVisible?: () => void;
  /** If true, only fire onVisible once */
  once?: boolean;
  className?: string;
}

const WRAPPER = 'flex flex-col items-center justify-center gap-3 py-12 text-content-muted';
const LABEL_STYLES = 'text-sm';

/** Mouse-scroll style icon: oval with dot (scroll-down affordance) */
function ScrollIcon() {
  return (
    <svg
      width={24}
      height={40}
      viewBox="0 0 24 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className="text-content-muted"
    >
      <path
        d="M12 4v0a12 12 0 0 1 0 24v0a12 12 0 0 1 0-24Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="2.5" fill="currentColor" />
    </svg>
  );
}

export default function ScrollPrompt({
  label = 'Scroll for more',
  onVisible,
  once = true,
  className = '',
}: ScrollPromptProps) {
  const ref = useRef<HTMLDivElement>(null);
  const fired = useRef(false);

  useEffect(() => {
    if (!onVisible || !ref.current) return;

    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;
        if (once && fired.current) return;
        fired.current = true;
        onVisible();
      },
      { rootMargin: '100px', threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisible, once]);

  return (
    <div
      ref={ref}
      role="presentation"
      aria-hidden
      className={`${WRAPPER} ${className}`}
    >
      <ScrollIcon />
      <span className={LABEL_STYLES}>{label}</span>
    </div>
  );
}
