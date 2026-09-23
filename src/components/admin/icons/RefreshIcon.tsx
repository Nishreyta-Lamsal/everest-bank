import type { SVGProps } from 'react';

export function RefreshIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M13.5 8A5.5 5.5 0 0 1 3.9 11.67M2.5 8A5.5 5.5 0 0 1 12.1 4.33M12.5 1.5V4.5H9.5M3.5 14.5V11.5H6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
