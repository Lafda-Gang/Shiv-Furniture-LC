import React from "react";

interface RupeeIconProps {
  className?: string;
}

export function RupeeIcon({ className = "w-6 h-6" }: RupeeIconProps) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="black"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 8h4m0 0V6h8M10 8c1.5 0 2.5 1 2.5 2.5S11.5 13 10 13H8m2 0v5l4-2"
      />
    </svg>
  );
}
