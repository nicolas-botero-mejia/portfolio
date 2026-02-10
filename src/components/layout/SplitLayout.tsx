'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SplitLayoutProps {
  children: React.ReactNode;
}

export default function SplitLayout({ children }: SplitLayoutProps) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Selected Work', href: '/#work' },
    { name: 'My Workflow', href: '/#workflow' },
    { name: 'Experience', href: '/#experience' },
    { name: "Let's Work Together", href: '/#contact' },
  ];

  const isActive = (href: string) => {
    // For hash links, we can't really track active state easily
    // so we'll just return false and rely on scroll position
    return false;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.includes('#') && pathname === '/') {
      e.preventDefault();
      const hash = href.split('#')[1];
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    // If we're not on home page and clicking a hash link, let it navigate normally
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Panel - Fixed on Desktop */}
      <aside className="lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[400px] lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-gray-200 bg-white">
        <div className="flex flex-col justify-between p-8 lg:p-12 lg:h-full">
          {/* Top Section */}
          <div>
            {/* Name/Logo */}
            <Link href="/" className="block mb-8">
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
                <a href="https://www.sainapsis.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                  Sainapsis
                </a>
                ,{' '}
                <a href="https://www.masiv.com/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                  Masiv
                </a>
                ,{' '}
                <a href="https://corporate.payu.com/colombia/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">
                  PayU Latam
                </a>
                .
              </p>
              <p>
                If you'd like to learn more about me or my work, feel free to reach out!
              </p>
            </div>

            {/* Navigation */}
            <nav className="mb-8">
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
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
                >
                  LinkedIn ↗
                </a>
              </div>
              <div className="text-gray-500 pt-2">
                Bogotá, Colombia
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
