import type { SVGProps } from 'react';

export function EnvelopeIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M0.702237 3.02195C2.40471 4.36511 4.55433 5.16667 6.89117 5.16667C9.228 5.16667 11.3776 4.36511 13.0801 3.02195M0.557833 0.5H13.2245V10.5H0.557833V0.5Z"
        transform="translate(1.667 3)"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
}
