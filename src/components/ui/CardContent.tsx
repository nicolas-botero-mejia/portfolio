interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
