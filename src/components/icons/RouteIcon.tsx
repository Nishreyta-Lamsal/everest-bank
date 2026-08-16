import type { SVGProps } from 'react';

export function RouteIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="24"
      viewBox="0 0 30 24"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25 0L30 6.66667L25 13.3333H16.3333V24H13.6667V18.6667H5L0 12L5 5.33333H13.6667V0H25ZM16.3333 2.66667V10.6667H23.6667L26.6667 6.66667L23.6667 2.66667H16.3333Z"
        fill="currentColor"
      />
    </svg>
  );
}
