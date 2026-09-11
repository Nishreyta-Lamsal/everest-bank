import type { SVGProps } from 'react';

export function BankIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <path
        d="M14.625 7.125V13.125M11.625 13.125V7.125M3.375 7.125V13.125M6.375 13.125V7.125M1.875 5.625L9 1.5L16.125 5.625V7.125H1.875V5.625ZM1.875 15.375H16.125L15.375 13.125H2.625L1.875 15.375Z"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
}
