'use client';

import * as Popover from '@radix-ui/react-popover';
import { useFeatureFlagsContext } from '@/components/FeatureFlagsProvider';
import { features, featureGroups, APPEARANCE_OPTIONS, type AppearanceMode } from '@/config/features';
import Button from '@/components/ui/Button';
import { H2, H3 } from '@/components/ui/Typography';

const TRIGGER_STYLES =
  'fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-background-surface border border-border-default shadow-lg transition-colors hover:bg-background-subtle focus:outline-none focus-visible:ring-2 focus-visible:ring-background-primary';
const CONTENT_STYLES =
  'z-50 w-72 max-h-[70vh] overflow-y-auto rounded-lg border border-border-default bg-background-surface p-4 shadow-xl';
const SECTION_TITLE = 'text-xs font-semibold uppercase tracking-wider text-content-muted mb-2';
const TOGGLE_ROW = 'flex items-center justify-between py-1';
const TOGGLE_LABEL = 'text-sm text-content-secondary';
const TOGGLE_LABEL_OVERRIDDEN = 'text-sm text-content-primary font-medium';

function GearIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-content-secondary">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/** Raw button — custom role="switch" toggle, no existing UI component for this. */
function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-background-primary focus-visible:ring-offset-2 ${
        checked ? 'bg-action-primary-bg' : 'bg-background-muted'
      }`}
    >
      <span
        className={`pointer-events-none inline-block h-3.5 w-3.5 rounded-full bg-content-inverted shadow-sm transition-transform ${
          checked ? 'translate-x-4' : 'translate-x-0.5'
        }`}
      />
    </button>
  );
}

function FlagRow({
  label,
  path,
  isOverridden,
}: {
  label: string;
  path: string;
  isOverridden: boolean;
}) {
  const { flags, setFlag } = useFeatureFlagsContext();

  // Resolve the current value from the flags object
  const parts = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let value: any = flags;
  for (const part of parts) {
    value = value?.[part];
  }
  const checked = Boolean(value);

  return (
    <div className={TOGGLE_ROW}>
      <span className={isOverridden ? TOGGLE_LABEL_OVERRIDDEN : TOGGLE_LABEL}>{label}</span>
      <Toggle checked={checked} onChange={(v) => setFlag(path, v)} />
    </div>
  );
}

/** Segmented control for appearance mode (auto/light/dark). */
function AppearanceSelector() {
  const { flags, overrides, setFlag } = useFeatureFlagsContext();
  const isOverridden = 'appearance' in overrides;

  return (
    <div className="py-1">
      <div className="flex items-center justify-between mb-1.5">
        <span className={isOverridden ? TOGGLE_LABEL_OVERRIDDEN : TOGGLE_LABEL}>Mode</span>
      </div>
      {/* Raw buttons — segmented control has no existing UI component */}
      <div className="flex rounded-md border border-border-default overflow-hidden" role="radiogroup" aria-label="Appearance mode">
        {(Object.entries(APPEARANCE_OPTIONS) as [AppearanceMode, string][]).map(([value, label]) => {
          const isActive = flags.appearance === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setFlag('appearance', value)}
              className={`flex-1 px-2 py-1 text-xs font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-background-primary ${
                isActive
                  ? 'bg-action-primary-bg text-content-inverted'
                  : 'bg-background-surface text-content-secondary hover:bg-background-subtle'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FlagSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 last:mb-0">
      <H3 className={SECTION_TITLE}>{title}</H3>
      {children}
    </div>
  );
}

export default function DevToolsPanel() {
  const { overrides, resetAll, hasOverrides } = useFeatureFlagsContext();

  const sectionKeys = Object.keys(features.sections) as (keyof typeof features.sections)[];

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        {/* Raw button required — Radix asChild merges props onto the child element */}
        <button type="button" className={TRIGGER_STYLES} aria-label="Feature flags">
          <GearIcon />
          {hasOverrides && (
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-status-warning-bg border border-background-surface" />
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content side="top" align="end" sideOffset={8} className={CONTENT_STYLES}>
          <div className="flex items-baseline justify-between my-0">
            <H2 className="md:text-sm mt-0 mb-0 font-semibold text-content-primary">Feature Flags</H2>
            {hasOverrides && (
              <Button variant="ghost" onClick={resetAll} className="px-0! py-0! text-xs">
                Reset all
              </Button>
            )}
          </div>

          <FlagSection title={featureGroups.sections}>
            {sectionKeys.map((key) => {
              const section = features.sections[key];
              const enabledPath = `sections.${key}.enabled`;
              const hasSubTypes = 'subTypes' in section && section.subTypes;
              return (
                <div key={key}>
                  <FlagRow
                    label={section.label}
                    path={enabledPath}
                    isOverridden={enabledPath in overrides}
                  />
                  {hasSubTypes && (
                    <div className="ml-4 border-l border-border-subtle pl-3">
                      {Object.entries(section.subTypes!).map(([sub, flag]) => {
                        const subPath = `sections.${key}.subTypes.${sub}.enabled`;
                        return (
                          <FlagRow
                            key={sub}
                            label={flag.label}
                            path={subPath}
                            isOverridden={subPath in overrides}
                          />
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </FlagSection>

          <FlagSection title={featureGroups.analytics}>
            {Object.entries(features.analytics).map(([key, flag]) => {
              const path = `analytics.${key}.enabled`;
              return (
                <FlagRow key={key} label={flag.label} path={path} isOverridden={path in overrides} />
              );
            })}
          </FlagSection>

          <FlagSection title={featureGroups.appearance}>
            <AppearanceSelector />
          </FlagSection>

          <FlagSection title={featureGroups.other}>
            <FlagRow
              label={features.passwordProtection.label}
              path="passwordProtection.enabled"
              isOverridden={'passwordProtection.enabled' in overrides}
            />
          </FlagSection>

          <FlagSection title={featureGroups.contact}>
            {Object.entries(features.contact).map(([key, flag]) => {
              const path = `contact.${key}.enabled`;
              return (
                <FlagRow key={key} label={flag.label} path={path} isOverridden={path in overrides} />
              );
            })}
          </FlagSection>

          <FlagSection title={featureGroups.seo}>
            {Object.entries(features.seo).map(([key, flag]) => {
              const path = `seo.${key}.enabled`;
              return (
                <FlagRow key={key} label={flag.label} path={path} isOverridden={path in overrides} />
              );
            })}
          </FlagSection>

          <Popover.Arrow className="fill-background-surface" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
