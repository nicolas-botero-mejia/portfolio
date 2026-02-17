'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { features, type AppearanceMode, type FlagItem } from '@/config/features';

const STORAGE_KEY = 'dev-feature-overrides';

/** Mutable version of the features type for runtime overrides. */
type Features = {
  sections: {
    [K in keyof typeof features.sections]: {
      label: string;
      enabled: boolean;
      subTypes?: Record<string, FlagItem>;
    };
  };
  analytics: Record<string, FlagItem>;
  appearance: AppearanceMode;
  passwordProtection: FlagItem;
  contact: Record<string, FlagItem>;
  seo: Record<string, FlagItem>;
};

/** Flat path for setting a flag, e.g. "sections.work.enabled" or "contact.email.enabled" */
type FlagPath = string;

/** Override value — boolean for toggles, string for appearance mode. */
type OverrideValue = boolean | string;

/** Deep-clone features into a mutable object. */
function cloneFeatures(): Features {
  return JSON.parse(JSON.stringify(features)) as Features;
}

/** Read overrides from localStorage. Returns partial paths -> value map. */
function readOverrides(): Record<FlagPath, OverrideValue> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<FlagPath, OverrideValue>) : {};
  } catch {
    return {};
  }
}

/** Write overrides to localStorage. */
function writeOverrides(overrides: Record<FlagPath, OverrideValue>): void {
  if (typeof window === 'undefined') return;
  if (Object.keys(overrides).length === 0) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  }
}

/** Apply overrides to a cloned features object. */
function applyOverrides(base: Features, overrides: Record<FlagPath, OverrideValue>): Features {
  for (const [path, value] of Object.entries(overrides)) {
    const parts = path.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let target: any = base;
    for (let i = 0; i < parts.length - 1; i++) {
      target = target?.[parts[i]];
      if (target === undefined) break;
    }
    if (target !== undefined) {
      target[parts[parts.length - 1]] = value;
    }
  }
  return base;
}

interface FeatureFlagsContextValue {
  flags: Features;
  overrides: Record<FlagPath, OverrideValue>;
  setFlag: (path: FlagPath, value: OverrideValue) => void;
  resetAll: () => void;
  hasOverrides: boolean;
}

const FeatureFlagsContext = createContext<FeatureFlagsContextValue | null>(null);

export function FeatureFlagsProvider({ children }: { children: React.ReactNode }) {
  const [overrides, setOverrides] = useState<Record<FlagPath, OverrideValue>>({});

  useEffect(() => {
    setOverrides(readOverrides());
  }, []);

  const flags = applyOverrides(cloneFeatures(), overrides);

  const setFlag = useCallback((path: FlagPath, value: OverrideValue) => {
    setOverrides(prev => {
      // If the value matches the static default, remove the override
      const parts = path.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let staticValue: any = features;
      for (const part of parts) {
        staticValue = staticValue?.[part];
      }

      const next = { ...prev };
      if (value === staticValue) {
        delete next[path];
      } else {
        next[path] = value;
      }
      writeOverrides(next);
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setOverrides({});
    writeOverrides({});
  }, []);

  return (
    <FeatureFlagsContext.Provider
      value={{ flags, overrides, setFlag, resetAll, hasOverrides: Object.keys(overrides).length > 0 }}
    >
      {children}
    </FeatureFlagsContext.Provider>
  );
}

/** Access runtime feature flags (with any dev overrides applied). */
export function useFeatureFlags(): Features {
  const ctx = useContext(FeatureFlagsContext);
  if (!ctx) throw new Error('useFeatureFlags must be used within FeatureFlagsProvider');
  return ctx.flags;
}

/** Access the full feature flags context (flags + override controls). */
export function useFeatureFlagsContext(): FeatureFlagsContextValue {
  const ctx = useContext(FeatureFlagsContext);
  if (!ctx) throw new Error('useFeatureFlagsContext must be used within FeatureFlagsProvider');
  return ctx;
}
