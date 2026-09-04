import type { SVGProps } from 'react';

export function GridIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M2.33333 2.33333H7V7H2.33333V2.33333ZM9 2.33333H13.6667V7H9V2.33333ZM2.33333 9H7V13.6667H2.33333V9ZM9 9H13.6667V13.6667H9V9Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
