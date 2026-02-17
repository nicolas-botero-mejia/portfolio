'use client';

import { useEffect } from 'react';
import { logError } from '@/lib/errors';
import Button from '@/components/ui/Button';
import { H1 } from '@/components/ui/Typography';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    logError('Global error boundary', error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background-surface font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="max-w-md text-center">
            <H1 className="mb-4">Something went wrong</H1>
            <p className="mb-8 text-content-muted">
              A critical error occurred. Please refresh the page or try again later.
            </p>
            <Button as="button" onClick={reset} variant="primary" className="px-6 py-3">
              Try again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
