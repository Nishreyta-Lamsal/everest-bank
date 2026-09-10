import type { SVGProps } from 'react';

export function TextBlockIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M9.375 4.125H15.375M9.375 6.375H13.125M9.375 11.625H15.375M9.375 13.875H13.125M2.625 3.375H6.375V7.125H2.625V3.375ZM2.625 10.875H6.375V14.625H2.625V10.875Z"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
}
