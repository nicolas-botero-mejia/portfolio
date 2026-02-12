interface CardMetaProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardMeta({ children, className = '' }: CardMetaProps) {
  return (
    <p className={`text-sm text-gray-500 ${className}`}>
      {children}
    </p>
  );
}
