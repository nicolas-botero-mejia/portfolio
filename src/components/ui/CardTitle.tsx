interface CardTitleProps {
  children: React.ReactNode;
  as?: 'h2' | 'h3';
  className?: string;
}

export default function CardTitle({
  children,
  as: Component = 'h2',
  className = '',
}: CardTitleProps) {
  return (
    <Component
      className={`text-xl font-semibold text-gray-900 ${className}`}
    >
      {children}
    </Component>
  );
}
