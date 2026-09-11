import type { SVGProps } from 'react';

export function GridIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M2.625 2.625H7.875V7.875H2.625V2.625Z"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M2.625 10.125H7.875V15.375H2.625V10.125Z"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M10.125 12.75C10.125 11.3003 11.3003 10.125 12.75 10.125C14.1997 10.125 15.375 11.3003 15.375 12.75C15.375 14.1997 14.1997 15.375 12.75 15.375C11.3003 15.375 10.125 14.1997 10.125 12.75Z"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <path
        d="M10.125 2.625H15.375V7.875H10.125V2.625Z"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  );
}
