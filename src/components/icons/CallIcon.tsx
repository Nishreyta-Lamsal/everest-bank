import type { SVGProps } from 'react';

export function CallIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <path
        d="M1 1C1 11.3093 9.35735 19.6667 19.6667 19.6667V14.0667L15 12.6667L13.0268 14.6398C9.98365 13.1556 7.51102 10.683 6.02684 7.63982L8 5.66667L6.6 1H1Z"
        transform="translate(3.667 3.667)"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
