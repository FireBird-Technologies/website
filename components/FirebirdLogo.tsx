"use client";

interface FirebirdLogoProps {
  size?: number;
  className?: string;
}

export function FirebirdLogo({ size = 40, className = "" }: FirebirdLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" fill="#FF2000" />

      <defs>
        <clipPath id="fb-left">
          <rect x="0" y="0" width="20" height="40" />
        </clipPath>
        <clipPath id="fb-right">
          <rect x="20" y="0" width="20" height="40" />
        </clipPath>
      </defs>

      {/* 8-pointed star path */}
      <path
        id="fb-star"
        d="M20,2 L23.1,12.6 L32.7,7.3 L27.4,17 L38,20 L27.4,23 L32.7,32.7 L23.1,27.4 L20,38 L16.9,27.4 L7.3,32.7 L12.6,23 L2,20 L12.6,17 L7.3,7.3 L16.9,12.6 Z"
      />

      {/* Left half: solid white fill */}
      <use href="#fb-star" fill="white" clipPath="url(#fb-left)" />

      {/* Right half: outline only */}
      <use href="#fb-star" fill="none" stroke="white" strokeWidth="1.5" clipPath="url(#fb-right)" />
    </svg>
  );
}

export function FirebirdLogoLarge({ size = 80, className = "" }: FirebirdLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="80" height="80" fill="#FF2000" />
      <defs>
        <clipPath id="fbl-left">
          <rect x="0" y="0" width="40" height="80" />
        </clipPath>
        <clipPath id="fbl-right">
          <rect x="40" y="0" width="40" height="80" />
        </clipPath>
      </defs>
      <path
        id="fbl-star"
        d="M40,4 L46.2,25.2 L65.4,14.6 L54.8,33.8 L76,40 L54.8,46.2 L65.4,65.4 L46.2,54.8 L40,76 L33.8,54.8 L14.6,65.4 L25.2,46.2 L4,40 L25.2,33.8 L14.6,14.6 L33.8,25.2 Z"
      />
      <use href="#fbl-star" fill="white" clipPath="url(#fbl-left)" />
      <use href="#fbl-star" fill="none" stroke="white" strokeWidth="2.5" clipPath="url(#fbl-right)" />
    </svg>
  );
}
