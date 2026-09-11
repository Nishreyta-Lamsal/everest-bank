import type { SVGProps } from 'react';

export function PlusIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M9 4.875V9M9 9V13.125M9 9H4.875M9 9H13.125"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
}
