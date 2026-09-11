import type { SVGProps } from 'react';

export function PageTextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M6.375 4.875H11.625M6.375 7.875H11.625M6.375 10.875H8.625M3.375 1.875H14.625V16.125H3.375V1.875Z"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
}
