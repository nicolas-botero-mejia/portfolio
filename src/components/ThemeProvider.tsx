'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from 'react';
import { useFeatureFlags } from '@/components/FeatureFlagsProvider';
import { type AppearanceMode } from '@/config/features';

/** Resolved theme — any explicit appearance mode (excludes 'auto', which delegates to the system). */
type ResolvedTheme = Exclude<AppearanceMode, 'auto'>;

function getSystemTheme(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/** Subscribe to OS color-scheme changes. */
function subscribeSystemTheme(callback: () => void): () => void {
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', callback);
  return () => mq.removeEventListener('change', callback);
}

function applyTheme(resolved: ResolvedTheme): void {
  const root = document.documentElement;
  if (resolved === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

const ThemeContext = createContext<{
  resolvedTheme: ResolvedTheme;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const flags = useFeatureFlags();

  // Reactive system theme via useSyncExternalStore (no setState-in-effect)
  const systemTheme = useSyncExternalStore(
    subscribeSystemTheme,
    getSystemTheme,
    () => 'light' as ResolvedTheme,
  );

  const resolvedTheme = useMemo<ResolvedTheme>(() => {
    if (flags.appearance !== 'auto') return flags.appearance;
    return systemTheme;
  }, [flags.appearance, systemTheme]);

  // Apply the class to <html> whenever the resolved theme changes
  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  return (
    <ThemeContext.Provider value={{ resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
