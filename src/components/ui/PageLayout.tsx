const MAX_WIDTH = {
  prose: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
} as const;

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: keyof typeof MAX_WIDTH;
  background?: string;
  className?: string;
}

export default function PageLayout({
  children,
  maxWidth = 'md',
  background = 'bg-background-surface',
  className = '',
}: PageLayoutProps) {
  return (
    <div className={background}>
      <section className="px-8 py-16 lg:px-16 lg:py-24">
        <div className={`${MAX_WIDTH[maxWidth]} ${className}`}>{children}</div>
      </section>
    </div>
  );
}
