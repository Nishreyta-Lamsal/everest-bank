import type { SVGProps } from 'react';

export function PlusSmallIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M10 5.625V10M10 10V14.375M10 10H5.625M10 10H14.375"
        stroke="currentColor"
        strokeWidth="1.49898"
        strokeLinecap="round"
      />
    </svg>
  );
}
