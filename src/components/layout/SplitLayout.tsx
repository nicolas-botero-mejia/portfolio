'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { trackEvent } from '@/lib/analytics';

interface SplitLayoutProps {
  children: React.ReactNode;
}

export default function SplitLayout({ children }: SplitLayoutProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Work', href: '/work' },
    { name: 'Experiments', href: '/experiments' },
    { name: 'Reading', href: '/reading' },
    { name: 'Writing', href: '/writing' },
    { name: 'About', href: '/about' },
  ];


  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, section: string) => {
    // Track navigation click
    trackEvent({
      name: 'navigation_click',
      properties: { section, from: pathname },
    });

    // No need for hash scrolling anymore - all are full pages
    // Just let Next.js handle navigation
  };

  const handleExternalLinkClick = (url: string, label: string) => {
    trackEvent({
      name: 'external_link_click',
      properties: { url, label, section: 'sidebar' },
    });
  };

  const handleContactClick = (method: 'email' | 'linkedin') => {
    trackEvent({
      name: 'contact_click',
      properties: { method, section: 'sidebar' },
    });
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Panel - Fixed on Desktop */}
      <aside className="lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[400px] lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
        <div className="flex flex-col justify-between p-8 lg:p-12 lg:h-full">
          {/* Top Section */}
          <div>
            {/* Name/Logo */}
            <Link href="/work" className="block mb-8">
              <h1 className="text-2xl font-bold text-gray-900">
                Nicolás Botero
              </h1>
              <p className="text-sm text-gray-600 mt-1">Product Designer</p>
            </Link>

            {/* Short Bio */}
            <div className="mb-8 text-sm text-gray-600 leading-relaxed space-y-3">
              <p>
                Product Design Leader with 11+ years of experience designing 
                product systems that stay coherent as complexity increases.
              </p>
              <p>
                I work on system-level product design problems: unifying fragmented 
                SaaS platforms, scaling design and delivery infrastructure, and 
                integrating AI in ways that enhance human judgment.
              </p>
              <p>
                My focus is on building durable foundations that allow teams and 
                products to evolve without losing clarity.
              </p>
              <p className="text-gray-700">
                Previously at{' '}
                <a 
                  href="https://www.sainapsis.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-900 transition-colors"
                  onClick={() => handleExternalLinkClick('https://www.sainapsis.com/', 'Sainapsis')}
                >
                  Sainapsis
                </a>
                ,{' '}
                <a 
                  href="https://www.masiv.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-900 transition-colors"
                  onClick={() => handleExternalLinkClick('https://www.masiv.com/', 'Masiv')}
                >
                  Masiv
                </a>
                ,{' '}
                <a 
                  href="https://corporate.payu.com/colombia/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-gray-900 transition-colors"
                  onClick={() => handleExternalLinkClick('https://corporate.payu.com/colombia/', 'PayU Latam')}
                >
                  PayU Latam
                </a>
                .
              </p>
              <p>
                If you&apos;d like to learn more about me or my work, feel free to reach out!
              </p>
            </div>

            {/* Navigation */}
            <nav className="mb-8">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href, item.name)}
                      className="block py-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Bottom Section - Contact */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="space-y-3 text-sm">
              <div>
                <a
                  href="mailto:n.boterom@gmail.com"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => handleContactClick('email')}
                >
                  n.boterom@gmail.com
                </a>
              </div>
              <div>
                <a
                  href="https://linkedin.com/in/nicolas-botero"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                  onClick={() => handleContactClick('linkedin')}
                >
                  LinkedIn ↗
                </a>
              </div>
              <div className="text-gray-500 pt-2">
                <div>Bogotá, Colombia</div>
                <div className="text-xs mt-1">Remote-ready worldwide</div>
              </div>
              <div className="text-gray-500 border-t border-gray-100 mt-3 pt-3">
                <div className="text-gray-700 font-medium">Open to opportunities</div>
                <div className="text-xs mt-1">Freelance • Consulting • Full-time</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Right Panel - Scrollable Content Area */}
      <main className="flex-1 lg:ml-[400px]">
        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
