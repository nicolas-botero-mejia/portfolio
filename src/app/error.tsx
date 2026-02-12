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
        <h1 className="mb-4 text-2xl font-bold text-gray-900">Something went wrong</h1>
        <p className="mb-8 text-gray-600">
          An unexpected error occurred. Please try again.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
          >
            Try again
          </button>
          <Link
            href={routes.work}
            className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Back to work
          </Link>
        </div>
      </div>
    </div>
  );
}
