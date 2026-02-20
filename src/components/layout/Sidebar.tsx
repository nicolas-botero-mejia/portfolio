'use client';

import { Mail } from 'lucide-react';
import Link from '@/components/ui/Link';
import { LinkedInIcon } from '@/components/ui';
import { Body, Caption } from '@/components/ui/Typography';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';
import { parseBioTokens } from '@/lib/richText';
import { profile } from '@/data';
import { useFeatureFlags } from '@/components/FeatureFlagsProvider';

export default function Sidebar(): React.ReactElement {
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
    <div className="flex flex-col justify-between p-8 lg:h-full">
      {/* Bio */}
      <div className="flex flex-col flex-1 justify-between space-y-3">
        <div className="flex flex-col flex-1 gap-4">
          {profile.bio.map((paragraph, index) => {
            const hasTokens = paragraph.includes('{{');
            const className = '';
              // index === 0 ? 'text-lg' : 'text-content-secondary';
            return (
              <Body key={index} className={className}>
                {hasTokens
                  ? parseBioTokens(paragraph, handleExternalLinkClick)
                  : paragraph}
              </Body>
            );
          })}
          <div className="flex gap-4 -mt-3">
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
        <div>
        </div>
      </div>

      {/* Bottom Section - Location & Availability */}
      <div className="border-t border-border-default pt-8 mt-8 space-y-3">
        {flags.contact.availability.enabled && (
          <div>
            <Body className="text-content-muted font-medium">{profile.contact.availability}</Body>
            <Caption>{profile.contact.availabilityTypes}</Caption>
          </div>
        )}
        {flags.contact.location.enabled && (
          <div>
            <Body className="text-content-muted font-medium">{profile.contact.location}</Body>
            <Caption>{profile.contact.locationSubtext}</Caption>
          </div>
        )}
      </div>
    </div>
  );
}
