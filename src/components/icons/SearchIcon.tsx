import type { SVGProps } from 'react';

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M13.6667 13.6673L10.8667 10.8673M12.3334 7.33398C12.3334 10.0954 10.0948 12.334 7.33337 12.334C4.57195 12.334 2.33337 10.0954 2.33337 7.33398C2.33337 4.57256 4.57195 2.33398 7.33337 2.33398C10.0948 2.33398 12.3334 4.57256 12.3334 7.33398Z"
        stroke="currentColor"
        strokeWidth="0.999318"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
