interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardDescription({
  children,
  className = '',
}: CardDescriptionProps) {
  return (
    <p className={`text-gray-600 leading-relaxed ${className}`}>
      {children}
    </p>
  );
}
