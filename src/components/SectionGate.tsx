'use client';

import { useFeatureFlags } from '@/components/FeatureFlagsProvider';
import { routes } from '@/data';
import Button from '@/components/ui/Button';
import { H1, H2 } from '@/components/ui/Typography';

interface SectionGateProps {
  /** Section key matching features.sections (e.g. 'work', 'experiments'). */
  section: string;
  children: React.ReactNode;
}

/**
 * Client-side gate that checks runtime feature flags (with DevToolsPanel overrides).
 * Renders children when the section is enabled; shows not-found UI otherwise.
 *
 * Uses conditional rendering (not notFound()) so toggling flags in DevToolsPanel
 * updates the page without requiring a full reload.
 *
 * Used alongside the server-side dev bypass so that:
 * - Production: server gates access via notFound() (this component never renders).
 * - Development: server skips the guard, this component checks client-side overrides.
 */
export default function SectionGate({ section, children }: SectionGateProps) {
  const flags = useFeatureFlags();
  const sectionFlags = flags.sections[section as keyof typeof flags.sections];

  if (!sectionFlags?.enabled) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <div className="max-w-md text-center">
          <H1 className="mb-2 text-6xl text-border-default">404</H1>
          <H2 className="mb-4">Page not found</H2>
          <p className="mb-8 text-content-muted">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Button as="link" href={routes.work} variant="primary" className="px-6 py-3">
            Back to work
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
