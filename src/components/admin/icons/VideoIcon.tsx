import type { SVGProps } from 'react';

export function VideoIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M2.375 1.875H9.625M5.75 6.625H6M1.375 3.125H10.625V10.125H1.375V3.125ZM5.375 5.5V7.75L6.875 6.625L5.375 5.5Z"
        stroke="currentColor"
        strokeWidth="0.642301"
        strokeLinecap="square"
      />
    </svg>
  );
}
