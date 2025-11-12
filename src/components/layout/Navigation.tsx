'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

const navigation = [
  { name: 'Work', href: '#work', isDropdown: true },
  { name: 'Workflow', href: '#workflow' },
  { name: 'About', href: '#about' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

interface NavigationProps {
  caseStudies: Array<{
    slug: string;
    frontmatter: {
      company: string;
      type: string;
    };
  }>;
}

export default function Navigation({ caseStudies }: NavigationProps) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setDropdownOpen(false);
      }
    }
  };

  return (
    <nav className="flex items-center space-x-8">
      {navigation.map((item) => {
        if (item.isDropdown) {
          return (
            <div key={item.name} className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                {item.name}
                <svg
                  className={`ml-1 h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    {caseStudies.map((study) => (
                      <Link
                        key={study.slug}
                        href={`/${study.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        role="menuitem"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <div className="font-medium">{study.frontmatter.company}</div>
                        <div className="text-xs text-gray-500">{study.frontmatter.type}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        }

        const isActive = pathname === '/' && false; // No active state for hash links

        return (
          <a
            key={item.name}
            href={item.href}
            onClick={(e) => handleSmoothScroll(e, item.href)}
            className={`text-sm font-medium transition-colors hover:text-gray-900 ${
              isActive ? 'text-gray-900' : 'text-gray-600'
            }`}
          >
            {item.name}
          </a>
        );
      })}
    </nav>
  );
}
