import type { SVGProps } from 'react';

export function FeedbackIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24.9684"
      viewBox="0 0 24 24.9684"
      fill="none"
      {...props}
    >
      <path
        d="M12 15V9.66667M1 1H23V20.3333H16.0207L11.9972 23.6667L8.02067 20.3333H1V1Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
      />
      <path
        d="M0 2H2V0H0V2Z"
        transform="translate(11 5.5)"
        fill="currentColor"
      />
    </svg>
  );
}
