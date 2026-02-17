'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';
import { navigation } from '@/data';
import NavLink from '@/components/ui/NavLink';

const SCROLL_THRESHOLD = 10;

export default function TopNav({ scrollContainerId }: { scrollContainerId: string }) {
  const pathname = usePathname();
  const visibleNav = navigation.filter(item => item.visible);

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
      className={`sticky top-0 z-10 flex items-center justify-end gap-6 px-8 py-4 bg-background-surface/80 backdrop-blur-sm transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
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
    </nav>
  );
}
