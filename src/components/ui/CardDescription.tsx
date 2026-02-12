interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

// Layout + semantic: content-muted for secondary text
const LAYOUT = 'text-content-muted leading-relaxed';

export default function CardDescription({
  children,
  className = '',
}: CardDescriptionProps) {
  return (
    <p className={`${LAYOUT} ${className}`}>
      {children}
    </p>
  );
}
