'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { authenticateWorkItem } from '@/actions/authActions';
import { routes } from '@/data';
import { useRouter } from 'next/navigation';
import { trackEvent, ANALYTICS_EVENTS } from '@/lib/analytics';

interface ServerPasswordPromptProps {
  subType: string;
  slug: string;
  /** Work item title (e.g. "Ocean — Scaling to 300M Messages") */
  title: string;
  /** Human-readable type for copy: "Product", "Feature", "Side Project" — from getWorkTypeLabel(frontmatter.type) */
  workItemTypeLabel: string;
}

export default function ServerPasswordPrompt({
  subType,
  slug,
  title,
  workItemTypeLabel,
}: ServerPasswordPromptProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    startTransition(async () => {
      const result = await authenticateWorkItem(subType, slug, password);

      // Track password attempt
      trackEvent({
        name: ANALYTICS_EVENTS.WORK_ITEM_PASSWORD_ATTEMPT,
        properties: { slug, success: result.success },
      });

      if (result.success) {
        // Authentication successful, refresh the page to show content
        router.refresh();
      } else {
        setError(result.error || 'Authentication failed');
        setPassword(''); // Clear password on error
      }
    });
  };

  return (
    <div className="min-h-screen bg-background-muted px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-lg border border-border-default bg-background-surface p-8 shadow-sm">
          {/* Lock Icon */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-background-subtle p-3">
              <svg
                className="h-8 w-8 text-content-muted"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h2 className="mb-2 text-center text-2xl font-bold text-content-primary">
            Password Protected
          </h2>
          <p className="mb-6 text-center text-content-muted">
            This work sample requires a password to view
          </p>

          {/* Work item title */}
          <div className="mb-6 rounded-md bg-background-muted px-4 py-3">
            <p className="text-sm font-medium text-content-primary">{title}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-content-secondary">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-border-strong px-4 py-2 bg-background-surface text-content-primary focus:border-action-primary-bg focus:outline-none focus:ring-1 focus:ring-action-primary-bg"
                placeholder="Enter password"
                autoFocus
                required
                disabled={isPending}
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 rounded-md bg-status-warning-bg px-4 py-3">
                <p className="text-sm text-status-warning-text">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-action-primary-bg px-6 py-3 font-medium text-action-primary-text transition-colors hover:bg-action-primary-hover disabled:opacity-50"
            >
              {isPending ? 'Verifying...' : `Unlock ${workItemTypeLabel}`}
            </button>
          </form>

          {/* Back Link */}
          <div className="mt-6 text-center">
            <Link
              href={routes.work}
              className="text-sm text-content-muted transition-colors hover:text-content-primary"
            >
              ← Back to Work
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
