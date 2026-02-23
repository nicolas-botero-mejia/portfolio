import { routes } from '@/data';
import Button from '@/components/ui/Button';
import { H1, H2 } from '@/components/ui/Typography';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 lg:ml-[var(--sidebar-w)]">
      <div className="max-w-md text-center">
        <H1 className="mb-2 text-6xl text-border-default">404</H1>
        <H2 className="mb-4">Page not found</H2>
        <p className="mb-8 text-content-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button as="link" href={routes.work} variant="primary" className="px-6 py-3">
          Back to work
        </Button>
      </div>
    </div>
  );
}
