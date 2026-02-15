/**
 * Skeleton placeholders for loading states.
 * Use Skeleton for blocks, SkeletonText for line placeholders, SkeletonImage for image aspect ratio.
 */

interface SkeletonProps {
  className?: string;
}

// 1. Layout — primitive scale; 2. Semantic colors — role-based
const BASE = 'rounded-md bg-background-muted animate-pulse';

/** Generic block skeleton. Set width/height via className (e.g. w-48 h-4). */
export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`${BASE} ${className}`} aria-hidden="true" />;
}

interface SkeletonTextProps {
  /** Number of lines. Default 3. */
  lines?: number;
  className?: string;
}

const LINE_LAYOUT = 'h-4';

/** Multiple lines of text placeholder. Use in cards or section previews. */
export function SkeletonText({ lines = 3, className = '' }: SkeletonTextProps) {
  return (
    <div className={`space-y-2 ${className}`} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={`${LINE_LAYOUT} ${i === lines - 1 && lines > 1 ? 'w-[80%]' : 'w-full'}`}
        />
      ))}
    </div>
  );
}

interface SkeletonImageProps {
  /** Aspect ratio (e.g. "16/9", "1", "4/3"). Default 16/9. */
  aspectRatio?: '16/9' | '1' | '4/3';
  className?: string;
}

const aspectMap = {
  '16/9': 'aspect-video',
  '1': 'aspect-square',
  '4/3': 'aspect-[4/3]',
};

/** Image-shaped skeleton. Use for card thumbs or hero images. */
export function SkeletonImage({
  aspectRatio = '16/9',
  className = '',
}: SkeletonImageProps) {
  return (
    <Skeleton
      className={`w-full ${aspectMap[aspectRatio]} ${className}`}
    />
  );
}
