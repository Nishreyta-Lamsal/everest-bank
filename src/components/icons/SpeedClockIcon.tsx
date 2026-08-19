import type { SVGProps } from 'react';

export function SpeedClockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      {...props}
    >
      <g transform="translate(12.92 7.92)">
        <circle
          cx="12.8333"
          cy="12.8333"
          r="12.0833"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(2.92 12.92)">
        <path
          d="M0.75 7.83333H4.91667M2.41667 14.9167H6.58333M2.41667 0.75H6.58333"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <g transform="translate(25 14.58)">
        <path
          d="M0.75 0.75V6.16667L4.08333 9.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
