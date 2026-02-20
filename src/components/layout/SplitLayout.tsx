'use client';

import { Mail } from 'lucide-react';
import Link from '@/components/ui/Link';
import { LinkedInIcon } from '@/components/ui';
import { Body, Caption } from '@/components/ui/Typography';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';
import { profile, getCompany } from '@/data';
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
      <aside className="border-b border-border-default bg-background-muted lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:w-[400px] lg:overflow-y-auto">
        <div className="flex flex-col justify-between p-8 lg:h-full">
          {/* Bio */}
          <div className="flex flex-col flex-1 justify-between space-y-3">
            <div className="flex flex-col flex-1 gap-2">
              {profile.bio.map((paragraph, index) => (
                <Body key={index} className="text-lg">
                  {paragraph}
                </Body>
              ))}
              <Body className="text-content-secondary mt-2">
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
              </Body>
            </div>
            <div>
              <Body>{profile.outro}</Body>
              <div className="flex gap-4 mt-2">
                {flags.contact.email.enabled && (
                  <Link
                    href={`mailto:${profile.contact.email}`}
                    variant="muted"
                    className="inline-flex items-center gap-1.5 hover:text-content-primary transition-colors"
                    onClick={() => handleContactClick('email')}
                  >
                    <Mail size={16} aria-hidden />
                    Email me
                  </Link>
                )}
                {flags.contact.linkedin.enabled && (
                  <Link
                    href={profile.contact.linkedin}
                    external
                    variant="muted"
                    className="inline-flex items-center gap-1.5 hover:text-content-primary transition-colors"
                    onClick={() => handleContactClick('linkedin')}
                  >
                    <LinkedInIcon size={16} />
                    LinkedIn
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section - Location & Availability */}
          <div className="border-t border-border-default pt-8 mt-8 space-y-3">
            {flags.contact.location.enabled && (
              <div>
                <Body className="text-content-muted font-medium">{profile.contact.location}</Body>
                <Caption>{profile.contact.locationSubtext}</Caption>
              </div>
            )}
            {flags.contact.availability.enabled && (
              <div>
                <Body className="text-content-muted font-medium">{profile.contact.availability}</Body>
                <Caption>{profile.contact.availabilityTypes}</Caption>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Right Panel - Scrollable Content Area */}
      <main id={MAIN_CONTENT_ID} className="flex-1 lg:ml-[400px] lg:h-screen lg:overflow-y-auto">
        <TopNav scrollContainerId={MAIN_CONTENT_ID} />
        <div className="min-h-screen">{children}</div>
      </main>
    </div>
  );
}
