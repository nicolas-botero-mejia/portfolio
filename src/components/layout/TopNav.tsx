'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';
import { navigation, routes } from '@/data';
import { useFeatureFlags } from '@/components/FeatureFlagsProvider';
import NavLink from '@/components/ui/NavLink';
import Link from '@/components/ui/Link';

const SCROLL_THRESHOLD = 10;

export default function TopNav({ scrollContainerId }: { scrollContainerId: string }) {
  const pathname = usePathname();
  const flags = useFeatureFlags();
  const visibleNav = navigation.filter(item => {
    const section = flags.sections[item.sectionKey as keyof typeof flags.sections];
    return section?.enabled ?? item.visible;
  });

  const backTarget = visibleNav.find((item) => pathname.startsWith(item.href + '/'));

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const container = document.getElementById(scrollContainerId);
    if (!container) return;

    const handleScroll = () => {
      const currentY = container.scrollTop;
      if (Math.abs(currentY - lastScrollY.current) < SCROLL_THRESHOLD) return;

      setVisible(currentY < lastScrollY.current || currentY < 50);
      lastScrollY.current = currentY;
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [scrollContainerId]);

  const handleNavClick = (section: string) => {
    trackEvent({
      name: ANALYTICS_EVENTS.NAVIGATION_CLICK,
      properties: { section, from: pathname },
    });
  };

  return (
    <nav
      className={`sticky top-0 z-10 flex items-center justify-between px-8 py-2 bg-background-surface/20 backdrop-blur-sm transition-transform duration-200 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="min-w-0 flex-1">
        {backTarget ? (
          <Link
            href={backTarget.href}
            className="inline-flex items-center text-sm text-content-muted hover:text-content-primary transition-colors"
            onClick={() => handleNavClick(backTarget.name)}
          >
            ← Back to {backTarget.name}
          </Link>
        ) : null}
      </div>
      <div className="flex items-center gap-0.5 shrink-0">
        {visibleNav.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <NavLink
              key={item.name}
              href={item.href}
              active={isActive}
              onClick={() => handleNavClick(item.name)}
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
