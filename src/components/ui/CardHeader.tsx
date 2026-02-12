import Button from './Button';

interface CardHeaderProps {
  category: string;
  cta?: string;
  ctaHref?: string;
  externalIconHref?: string;
  className?: string;
}

// 1. Layout — primitive scale; 2. Semantic colors — role-based
const LAYOUT = 'flex items-center justify-between gap-4 border-b border-border-subtle px-6 py-4';
const CATEGORY_STYLES = 'text-sm text-content-muted';

export default function CardHeader({
  category,
  cta,
  ctaHref,
  externalIconHref,
  className = '',
}: CardHeaderProps) {
  return (
    <div className={`${LAYOUT} ${className}`}>
      <span className={CATEGORY_STYLES}>{category}</span>
      <div className="flex items-center gap-2">
        {cta && ctaHref && (
          <Button as="link" href={ctaHref} variant="primary" className="text-sm">
            {cta}
          </Button>
        )}
        {externalIconHref && (
          <Button
            as="link"
            href={externalIconHref}
            external
            variant="ghost"
            className="!p-2"
          >
            <span className="sr-only">Open in new tab</span>
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
}
