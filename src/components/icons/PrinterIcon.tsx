import type { SVGProps } from 'react';

export function PrinterIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M7.70833 8.95833H5.625M14.375 11.4583V14.375H17.7083V5.625H2.29167V14.375H5.625V11.4583H14.375V17.7083H5.625V11.4583M5.625 2.29167H14.375V5.625H5.625V2.29167Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
