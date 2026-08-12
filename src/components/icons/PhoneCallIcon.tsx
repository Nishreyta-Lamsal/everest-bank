import type { SVGProps } from 'react';

export function PhoneCallIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M5.04688 0.75H0.75V2.46875C0.75 9.11343 6.13657 14.5 12.7812 14.5H14.5V10.2031L11.0625 8.48438L9.77344 9.77344C7.625 8.91406 6.33594 7.625 5.47656 5.47656L6.76562 4.1875L5.04688 0.75Z"
        transform="translate(3.125 3.125)"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
