import type { SVGProps } from 'react';

export function MapPinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <g transform="translate(3 1.667)" stroke="currentColor" strokeWidth="1">
        <path
          d="M7.165 5.5C7.165 6.42 6.419 7.166 5.498 7.166C4.578 7.166 3.832 6.42 3.832 5.5C3.832 4.579 4.578 3.833 5.498 3.833C6.419 3.833 7.165 4.579 7.165 5.5Z"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 5.5C10.5 9.628 5.5 13.166 5.5 13.166C5.5 13.166 0.5 9.628 0.5 5.5C0.5 2.666 2.738 0.5 5.5 0.5C8.261 0.5 10.5 2.666 10.5 5.5Z"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
