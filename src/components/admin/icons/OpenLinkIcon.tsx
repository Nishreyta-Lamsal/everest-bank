import type { SVGProps } from 'react';

export function OpenLinkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 8 8"
      fill="none"
      {...props}
    >
      <path
        d="M3.5 1.83333H1.7C1.51332 1.83333 1.41997 1.83333 1.34867 1.86966C1.28595 1.90162 1.23496 1.95262 1.203 2.01534C1.16667 2.08664 1.16667 2.17998 1.16667 2.36667V6.3C1.16667 6.48668 1.16667 6.58003 1.203 6.65133C1.23496 6.71405 1.28595 6.76504 1.34867 6.797C1.41997 6.83333 1.51332 6.83333 1.7 6.83333H5.63333C5.82002 6.83333 5.91336 6.83333 5.98466 6.797C6.04738 6.76504 6.09838 6.71405 6.13034 6.65133C6.16667 6.58003 6.16667 6.48668 6.16667 6.3V4.5M6.83333 3.16667V1.16667H4.83333M6.83333 1.16667L3.83333 4.16667"
        stroke="currentColor"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
