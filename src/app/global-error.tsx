'use client';

import { useEffect } from 'react';
import { logError } from '@/lib/errors';

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
      <body className="bg-white font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4">
          <div className="max-w-md text-center">
            <h1 className="mb-4 text-2xl font-bold text-gray-900">Something went wrong</h1>
            <p className="mb-8 text-gray-600">
              A critical error occurred. Please refresh the page or try again later.
            </p>
            <button
              onClick={reset}
              className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
