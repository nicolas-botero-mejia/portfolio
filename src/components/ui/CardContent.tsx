interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

// Layout — primitive scale (p-6 from spacing)
const LAYOUT = 'p-6';

export default function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`${LAYOUT} ${className}`}>{children}</div>;
}
