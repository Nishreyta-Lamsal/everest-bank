import type { SVGProps } from 'react';

export function FileTextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M19.25 9.25L12.75 2.75H4.75V21.25H19.25V9.25ZM12.75 2.75V9.25H19.25M8.75 13.25H12.25M8.75 17.25H15.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
