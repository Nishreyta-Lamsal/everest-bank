import type { SVGProps } from 'react';

export function GrowthIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      {...props}
    >
      <path
        d="M1.5 0C0.671573 0 0 0.671573 0 1.5V4C0 12.5604 6.93959 19.5 15.5 19.5H16.5V34.5C16.5 35.3284 17.1716 36 18 36C18.8284 36 19.5 35.3284 19.5 34.5V26H20.5C29.0604 26 36 19.0604 36 10.5V7.5C36 6.67157 35.3284 6 34.5 6H32C26.7124 6 22.0432 8.64765 19.2458 12.6895C17.9236 5.47082 11.6007 0 4 0H1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
