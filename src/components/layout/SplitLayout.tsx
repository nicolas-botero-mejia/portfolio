'use client';

import Link from 'next/link';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';
import { profile, routes, getCompany } from '@/data';
import { features } from '@/config/features';
import TopNav from '@/components/layout/TopNav';

interface SplitLayoutProps {
  children: React.ReactNode;
}

const MAIN_CONTENT_ID = 'main-content';

export default function SplitLayout({ children }: SplitLayoutProps) {
  const handleExternalLinkClick = (url: string, label: string) => {
    trackEvent({
      name: ANALYTICS_EVENTS.EXTERNAL_LINK_CLICK,
      properties: { url, label, section: 'sidebar' },
    });
  };

  const handleContactClick = (method: 'email' | 'linkedin') => {
    trackEvent({
      name: ANALYTICS_EVENTS.CONTACT_CLICK,
      properties: { method, section: 'sidebar' },
    });
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left Panel - Fixed on Desktop */}
      <aside className="lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[400px] lg:overflow-y-auto border-b lg:border-b-0 lg:border-r border-border-default bg-background-surface">
        <div className="flex flex-col justify-between p-8 lg:p-12 lg:h-full">
          {/* Top Section */}
          <div>
            {/* Name/Logo */}
            <Link href={routes.work} className="block mb-8">
              <h1 className="text-2xl font-bold text-content-primary">
                {profile.name}
              </h1>
              <p className="text-sm text-content-muted mt-1">{profile.title}</p>
            </Link>

            {/* Short Bio */}
            <div className="mb-8 text-sm text-content-muted leading-relaxed space-y-3">
              {profile.bio.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
              <p className="text-content-secondary">
                Previously at{' '}
                {profile.companySlugs.map((slug, index) => {
                  const company = getCompany(slug);
                  if (!company) return null;
                  return (
                    <span key={company.slug}>
                      <a
                        href={company.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-content-primary transition-colors"
                        onClick={() => handleExternalLinkClick(company.url, company.name)}
                      >
                        {company.name}
                      </a>
                      {index < profile.companySlugs.length - 1 && ', '}
                    </span>
                  );
                })}
                .
              </p>
              <p>
                If you&apos;d like to learn more about me or my work, feel free to reach out!
              </p>
            </div>
          </div>

          {/* Bottom Section - Contact */}
          <div className="border-t border-border-default pt-8 mt-8">
            <div className="space-y-3 text-sm">
              {features.contact.email && (
              <div>
                <a
                  href={`mailto:${profile.contact.email}`}
                  className="text-content-muted hover:text-content-primary transition-colors"
                  onClick={() => handleContactClick('email')}
                >
                  {profile.contact.email}
                </a>
              </div>
              )}
              {features.contact.linkedin && (
              <div>
                <a
                  href={`https://linkedin.com/in/${profile.contact.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-content-muted hover:text-content-primary transition-colors"
                  onClick={() => handleContactClick('linkedin')}
                >
                  LinkedIn ↗
                </a>
              </div>
              )}
              {features.contact.location && (
              <div className="text-content-muted pt-2">
                <div>{profile.contact.location}</div>
                <div className="text-xs mt-1">{profile.contact.locationSubtext}</div>
              </div>
              )}
              {features.contact.availability && (
              <div className="text-content-muted border-t border-border-subtle mt-3 pt-3">
                <div className="text-content-secondary font-medium">{profile.contact.availability}</div>
                <div className="text-xs mt-1">{profile.contact.availabilityTypes}</div>
              </div>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Right Panel - Scrollable Content Area */}
      <main id={MAIN_CONTENT_ID} className="flex-1 lg:ml-[400px] lg:h-screen lg:overflow-y-auto">
        <TopNav scrollContainerId={MAIN_CONTENT_ID} />

        <div className="min-h-screen">
          {children}
        </div>
      </main>
    </div>
  );
}
