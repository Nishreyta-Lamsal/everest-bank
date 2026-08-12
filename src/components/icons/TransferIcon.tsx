import type { SVGProps } from 'react';

export function TransferIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      {...props}
    >
      <path
        d="M14 27C6.8203 27 1 21.1797 1 14C1 6.8203 6.8203 1 14 1C19.3294 1 23.9098 4.20692 25.9167 8.7963M40 22.6667C40 29.8464 34.1797 35.6667 27 35.6667C21.3321 35.6667 16.5115 32.0395 14.7326 26.9797C14.2581 25.6301 14 24.1785 14 22.6667C14 15.7328 19.4285 10.0669 26.2674 9.68696C26.5099 9.67349 26.7542 9.66667 27 9.66667C34.1797 9.66667 40 15.487 40 22.6667Z"
        transform="translate(6.5 8.67)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}
