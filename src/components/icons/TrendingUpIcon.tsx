import type { SVGProps } from 'react';

export function TrendingUpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <g transform="translate(1.667 2.333)">
        <g transform="translate(0 12.333) scale(1 -1)">
          <path
            d="M0.5 6.875L1.907 4.75L4.018 8.291L7.537 0.5L11.055 11.833L13.166 7.583"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
}
