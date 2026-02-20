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
      <section className="px-8 py-12 lg:px-6 lg:py-8">
        <div className={`mx-auto ${MAX_WIDTH[maxWidth]} ${className}`}>{children}</div>
      </section>
    </div>
  );
}
