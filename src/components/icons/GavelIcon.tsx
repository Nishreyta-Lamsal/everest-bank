import type { SVGProps } from 'react';

export function GavelIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M9.166 2.5H9.833M9.166 2.5L8.166 0.5H2.166L1.166 2.5M9.166 2.5H1.166M0.5 2.5H1.166"
        transform="translate(1.667 11.667)"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.769 4.769L2.416 7.121L0.5 5.204L5.204 0.5L7.121 2.416L4.769 4.769ZM4.769 4.769L8.166 8.166"
        transform="translate(6.333 2)"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.5 0.5H2.5"
        transform="translate(1 9)"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.166 2.166L0.5 0.5"
        transform="translate(2 5.333)"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
