'use client';

import Link from '@/components/ui/Link';
import { H1 } from '@/components/ui/Typography';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';
import { profile, routes, getCompany } from '@/data';
import { useFeatureFlags } from '@/components/FeatureFlagsProvider';
import TopNav from '@/components/layout/TopNav';

interface SplitLayoutProps {
  children: React.ReactNode;
}

const MAIN_CONTENT_ID = 'main-content';

export default function SplitLayout({ children }: SplitLayoutProps) {
  const flags = useFeatureFlags();

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
              <H1 className="text-2xl">{profile.name}</H1>
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
                      <Link
                        href={company.url}
                        external
                        className="hover:text-content-primary transition-colors"
                        onClick={() => handleExternalLinkClick(company.url, company.name)}
                      >
                        {company.name}
                      </Link>
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
              {flags.contact.email.enabled && (
              <div>
                <Link
                  href={`mailto:${profile.contact.email}`}
                  variant="muted"
                  className="hover:text-content-primary transition-colors"
                  onClick={() => handleContactClick('email')}
                >
                  {profile.contact.email}
                </Link>
              </div>
              )}
              {flags.contact.linkedin.enabled && (
              <div>
                <Link
                  href={`https://linkedin.com/in/${profile.contact.linkedin}`}
                  external
                  variant="muted"
                  className="hover:text-content-primary transition-colors"
                  onClick={() => handleContactClick('linkedin')}
                >
                  LinkedIn ↗
                </Link>
              </div>
              )}
              {flags.contact.location.enabled && (
              <div className="text-content-muted pt-2">
                <div>{profile.contact.location}</div>
                <div className="text-xs mt-1">{profile.contact.locationSubtext}</div>
              </div>
              )}
              {flags.contact.availability.enabled && (
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
