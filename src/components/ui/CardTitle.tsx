interface CardTitleProps {
  children: React.ReactNode;
  as?: 'h2' | 'h3';
  className?: string;
}

// Layout (primitive) + semantic (content-primary)
const LAYOUT = 'text-xl font-semibold text-content-primary';

export default function CardTitle({
  children,
  as: Component = 'h2',
  className = '',
}: CardTitleProps) {
  return (
    <Component className={`${LAYOUT} ${className}`}>
      {children}
    </Component>
  );
}
