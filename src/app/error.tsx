'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { routes } from '@/data';
import { logError } from '@/lib/errors';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    logError('Route error boundary', error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 lg:ml-[400px]">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-2xl font-bold text-content-primary">Something went wrong</h1>
        <p className="mb-8 text-content-muted">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-action-primary-bg px-6 py-3 font-medium text-action-primary-text transition-colors hover:bg-action-primary-hover"
          >
            Try again
          </button>
          <Link
            href={routes.work}
            className="rounded-lg border border-action-secondary-border px-6 py-3 font-medium text-content-secondary transition-colors hover:bg-action-secondary-hover"
          >
            Back to work
          </Link>
        </div>
      </div>
    </div>
  );
}
