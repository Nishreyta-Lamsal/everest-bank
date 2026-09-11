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
        d="M13.3333 13.3333L10.751 10.751M10.751 10.751C11.6257 9.87635 12.1667 8.66802 12.1667 7.33333C12.1667 4.66396 10.0027 2.5 7.33333 2.5C4.66396 2.5 2.5 4.66396 2.5 7.33333C2.5 10.0027 4.66396 12.1667 7.33333 12.1667C8.66802 12.1667 9.87635 11.6257 10.751 10.751Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
