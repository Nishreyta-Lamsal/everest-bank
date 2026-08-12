import type { SVGProps } from 'react';

export function LanguageIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M0.5 7.166L3.166 9.833L5.833 7.166M0.5 3.166L3.166 0.5L5.833 3.166"
        transform="translate(5.333 3.333)"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
