/**
 * Mouse-scroll affordance: oval with dot (scroll-down hint).
 * Non-square aspect ratio (24×40 viewBox).
 */
interface ScrollIconProps {
  size?: number;
  className?: string;
}

const VIEWBOX_WIDTH = 24;
const VIEWBOX_HEIGHT = 40;

export default function ScrollIcon({ size = 24, className }: ScrollIconProps) {
  const height = (size * VIEWBOX_HEIGHT) / VIEWBOX_WIDTH;
  return (
    <svg
      width={size}
      height={height}
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      <path
        d="M12 4v0a12 12 0 0 1 0 24v0a12 12 0 0 1 0-24Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="2.5" fill="currentColor" />
    </svg>
  );
}
