'use client';

import { useEffect } from 'react';
import { routes } from '@/data';
import { logError } from '@/lib/errors';
import Button from '@/components/ui/Button';

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
          <Button onClick={reset} variant="primary" className="px-6 py-3">
            Try again
          </Button>
          <Button as="link" href={routes.work} variant="secondary" className="px-6 py-3">
            Back to work
          </Button>
        </div>
      </div>
    </div>
  );
}
