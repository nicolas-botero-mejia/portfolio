import Link from 'next/link';
import { routes } from '@/data';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 lg:ml-[400px]">
      <div className="max-w-md text-center">
        <h1 className="mb-2 text-6xl font-bold text-border-default">404</h1>
        <h2 className="mb-4 text-2xl font-bold text-content-primary">Page not found</h2>
        <p className="mb-8 text-content-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href={routes.work}
          className="inline-block rounded-lg bg-action-primary-bg px-6 py-3 font-medium text-action-primary-text transition-colors hover:bg-action-primary-hover"
        >
          Back to work
        </Link>
      </div>
    </div>
  );
}
