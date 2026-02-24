import { H1 } from './Typography';

interface PageHeaderProps {
  title: string;
  description?: React.ReactNode;
  className?: string;
}

const WRAPPER = 'mb-6';
const DESCRIPTION = 'text-lg text-content-muted/60';
const TITLE = 'mb-2';

export default function PageHeader({
  title,
  description,
  className = '',
}: PageHeaderProps) {
  return (
    <header className={`${WRAPPER} ${className}`}>
      <H1 className={TITLE}>
        {title}
      </H1>
      {description && <p className={DESCRIPTION}>{description}</p>}
    </header>
  );
}
