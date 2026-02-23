const MAX_WIDTH = {
  prose: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
} as const;

interface PageLayoutProps {
  children: React.ReactNode;
  as?: 'section' | 'article';
  background?: string;
  maxWidth?: keyof typeof MAX_WIDTH;
  className?: string;
}

export default function PageLayout({
  children,
  as = 'section',
  background = 'bg-background-surface',
  maxWidth = 'md',
  className = 'mx-auto',
}: PageLayoutProps) {
  const Wrapper = as === 'article' ? 'article' : 'section';
  return (
    <div className={`min-h-screen ${background}`}>
      <Wrapper className="px-8 py-12 lg:px-8 lg:py-4">
        <div className={`${MAX_WIDTH[maxWidth]} ${className}`}>{children}</div>
      </Wrapper>
    </div>
  );
}
