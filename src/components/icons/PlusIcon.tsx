import type { SVGProps } from 'react';

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      {...props}
    >
      <path
        d="M8.23426 0V14H5.76574V0H8.23426ZM14 8.09739H0V5.90261H14V8.09739Z"
        fill="currentColor"
      />
    </svg>
  );
}
