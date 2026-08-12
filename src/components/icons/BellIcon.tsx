import type { SVGProps } from 'react';

export function BellIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M8.833 10.5C8.833 11.972 7.639 13.166 6.166 13.166C4.694 13.166 3.5 11.972 3.5 10.5M0.5 10.5H11.833V9.666L10.771 7.5L10.629 4.717C10.51 2.354 8.547 0.5 6.166 0.5C3.786 0.5 1.823 2.354 1.704 4.717L1.562 7.5L0.5 9.666V10.5Z"
        transform="translate(2.333 1.667)"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
