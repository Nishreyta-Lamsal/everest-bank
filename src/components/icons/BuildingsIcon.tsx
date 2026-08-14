import type { SVGProps } from 'react';

export function BuildingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="44"
      height="34"
      viewBox="0 0 44 34"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 0C5.567 0 4 1.567 4 3.5V31H1.5C0.671573 31 0 31.6716 0 32.5C0 33.3284 0.671573 34 1.5 34H42.5C43.3284 34 44 33.3284 44 32.5C44 31.6716 43.3284 31 42.5 31H40V11.5C40 9.567 38.433 8 36.5 8H30V31H28V3.5C28 1.567 26.433 0 24.5 0H7.5ZM13.5 10C12.6716 10 12 10.6716 12 11.5C12 12.3284 12.6716 13 13.5 13H18.5C19.3284 13 20 12.3284 20 11.5C20 10.6716 19.3284 10 18.5 10H13.5ZM13.5 18C12.6716 18 12 18.6716 12 19.5C12 20.3284 12.6716 21 13.5 21H18.5C19.3284 21 20 20.3284 20 19.5C20 18.6716 19.3284 18 18.5 18H13.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
