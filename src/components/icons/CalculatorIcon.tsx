import type { SVGProps } from 'react';

export function CalculatorIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M5.33333 1V5.33333M5.33333 5.33333V9.66667M5.33333 5.33333H1M5.33333 5.33333H9.66667M21.7308 15.6025L18.6667 18.6667M18.6667 18.6667L15.6025 21.7308M18.6667 18.6667L15.6025 15.6025M18.6667 18.6667L21.7308 21.7308M18.6667 9.66667C16.2734 9.66667 14.3333 7.72657 14.3333 5.33333C14.3333 2.9401 16.2734 1 18.6667 1C21.0599 1 23 2.9401 23 5.33333C23 7.72657 21.0599 9.66667 18.6667 9.66667ZM1 14.3333H9.66667V23H1V14.3333Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
    </svg>
  );
}
