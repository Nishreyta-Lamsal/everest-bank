import type { SVGProps } from 'react';

export function SafeIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M36.75 1H1V36.75H36.75V1Z"
        transform="translate(8.13 8.13)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M1 1H5.33333"
        transform="translate(5.96 16.79)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M1 1H5.33333"
        transform="translate(5.96 35.21)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M6.41667 11.8333C9.40821 11.8333 11.8333 9.40821 11.8333 6.41667C11.8333 3.42512 9.40821 1 6.41667 1C3.42512 1 1 3.42512 1 6.41667C1 9.40821 3.42512 11.8333 6.41667 11.8333Z"
        transform="translate(21.13 20.58)"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4.89626 4.89635L1.41421 1.41421M14.1822 4.89635L17.6642 1.41421M14.1822 14.1822L17.6642 17.6642M4.89626 14.1822L1.41421 17.6642"
        transform="translate(18.42 17.88)"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}
