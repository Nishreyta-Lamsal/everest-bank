import type { SVGProps } from 'react';

export function ShieldCheckIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M3.999 7.166L5.444 8.666L8.333 5.666M6.166 0.5L0.5 2.833V7.833C0.5 10.963 3.037 13.5 6.166 13.5C9.296 13.5 11.833 10.963 11.833 7.833V2.833L6.166 0.5Z"
        transform="translate(2.333 1.333)"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
