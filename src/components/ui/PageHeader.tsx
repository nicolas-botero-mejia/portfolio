import { H1 } from './Typography';

interface PageHeaderProps {
  title: string;
  description?: React.ReactNode;
  /** 'serif' for large editorial title (e.g. "projects.") */
  variant?: 'default' | 'serif';
  className?: string;
}

const WRAPPER = 'mb-12';
const TITLE_DEFAULT = 'text-4xl font-bold text-content-primary mb-4';
const TITLE_SERIF =
  'text-4xl md:text-5xl font-normal text-content-primary mb-4 tracking-tight';
const SERIF_FONT = 'font-[Georgia,"Times New Roman",serif]';
const DESCRIPTION = 'text-lg text-content-muted';

export default function PageHeader({
  title,
  description,
  variant = 'default',
  className = '',
}: PageHeaderProps) {
  return (
    <header className={`${WRAPPER} ${className}`}>
      <H1
        className={
          variant === 'serif'
            ? `${TITLE_SERIF} ${SERIF_FONT}`
            : TITLE_DEFAULT
        }
      >
        {title}
      </H1>
      {description && <p className={DESCRIPTION}>{description}</p>}
    </header>
  );
}
