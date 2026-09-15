import type { SVGProps } from 'react';

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M5 5L11 11M11 5L5 11"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
}
