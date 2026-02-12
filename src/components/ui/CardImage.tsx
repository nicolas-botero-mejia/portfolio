import Image from 'next/image';

interface CardImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

// 1. Layout — primitive scale (rounded-md from radii)
const LAYOUT = 'relative overflow-hidden rounded-md';

export default function CardImage({
  src,
  alt,
  width = 120,
  height = 180,
  className = '',
}: CardImageProps) {
  return (
    <div className={`${LAYOUT} ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover"
      />
    </div>
  );
}
