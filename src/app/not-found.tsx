import { routes } from '@/data';
import Button from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 lg:ml-[400px]">
      <div className="max-w-md text-center">
        <h1 className="mb-2 text-6xl font-bold text-border-default">404</h1>
        <h2 className="mb-4 text-2xl font-bold text-content-primary">Page not found</h2>
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
