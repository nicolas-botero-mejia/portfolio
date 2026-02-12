interface CardMetaProps {
  children: React.ReactNode;
  className?: string;
}

// Layout + semantic: text-sm (primitive), content-muted (role)
const LAYOUT = 'text-sm text-content-muted';

export default function CardMeta({ children, className = '' }: CardMetaProps) {
  return (
    <p className={`${LAYOUT} ${className}`}>
      {children}
    </p>
  );
}
