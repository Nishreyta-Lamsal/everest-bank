import type { SVGProps } from 'react';

export function CardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      {...props}
    >
      <path
        d="M9.66667 11.8333H11.8333M1 1H40V31.3333H1V1Z"
        transform="translate(6.5 10.83)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}
