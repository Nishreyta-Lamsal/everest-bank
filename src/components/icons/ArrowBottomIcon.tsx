import type { SVGProps } from 'react';

export function ArrowBottomIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      {...props}
    >
      <path
        d="M9.5 6.75L6 10.25L2.5 6.75M6 1.75L6 10"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
}
