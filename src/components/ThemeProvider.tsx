'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

export type Theme = 'light' | 'dark' | 'system';

const STORAGE_KEY = 'theme';

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme {
  if (typeof window === 'undefined') return 'system';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
  return 'system';
}

function getResolvedTheme(theme: Theme): 'light' | 'dark' {
  if (theme === 'dark') return 'dark';
  if (theme === 'light') return 'light';
  return getSystemTheme();
}

function applyTheme(resolved: 'light' | 'dark'): void {
  const root = document.documentElement;
  if (resolved === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

const ThemeContext = createContext<{
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setThemeState(getStoredTheme());
    setResolvedTheme(getResolvedTheme(getStoredTheme()));
  }, []);

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const stored = getStoredTheme();
      const resolved = getResolvedTheme(stored);
      setResolvedTheme(resolved);
      applyTheme(resolved);
    };
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
    const resolved = getResolvedTheme(next);
    setResolvedTheme(resolved);
    applyTheme(resolved);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
