interface WireframeDecorProps {
  className?: string;
  color?: string;
  opacity?: number;
}

export function WireframeDecor({ className = "", color = "white", opacity = 0.15 }: WireframeDecorProps) {
  return (
    <svg
      viewBox="0 0 400 600"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ opacity }}
      aria-hidden="true"
    >
      {/* Top section - overlapping triangles and rectangles forming the firebird pattern */}
      <polygon points="0,0 200,0 0,200" />
      <rect x="40" y="40" width="120" height="120" />
      <line x1="0" y1="0" x2="200" y2="200" />
      <line x1="0" y1="100" x2="100" y2="0" />
      <polygon points="40,0 200,0 200,160" />
      <rect x="80" y="0" width="120" height="120" />
      <line x1="80" y1="0" x2="200" y2="120" />
      <line x1="0" y1="40" x2="160" y2="200" />
      <polygon points="0,80 120,80 0,200" />

      {/* Middle section */}
      <polygon points="0,200 200,200 0,400" />
      <rect x="40" y="240" width="120" height="120" />
      <line x1="0" y1="200" x2="200" y2="400" />
      <line x1="0" y1="300" x2="100" y2="200" />
      <polygon points="40,200 200,200 200,360" />
      <rect x="80" y="200" width="120" height="120" />
      <line x1="80" y1="200" x2="200" y2="320" />
      <line x1="0" y1="240" x2="160" y2="400" />
      <polygon points="0,280 120,280 0,400" />

      {/* Bottom section */}
      <polygon points="0,400 200,400 0,600" />
      <rect x="40" y="440" width="120" height="120" />
      <line x1="0" y1="400" x2="200" y2="600" />
      <line x1="0" y1="500" x2="100" y2="400" />
      <polygon points="40,400 200,400 200,560" />
      <rect x="80" y="400" width="120" height="120" />
      <line x1="80" y1="400" x2="200" y2="520" />
      <line x1="0" y1="440" x2="160" y2="600" />
    </svg>
  );
}
