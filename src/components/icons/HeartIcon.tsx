import type { SVGProps } from 'react';

export function HeartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32.3333"
      height="29"
      viewBox="0 0 32.3333 29"
      fill="none"
      {...props}
    >
      <path
        d="M31.5833 11.0625C31.5833 20.9453 17.4514 28.25 16.1667 28.25C14.8819 28.25 0.75 20.9453 0.75 11.0625C0.75 4.1875 5.03241 0.75 9.31481 0.75C13.5972 0.75 16.1667 3.32812 16.1667 3.32812C16.1667 3.32812 18.7361 0.75 23.0185 0.75C27.3009 0.75 31.5833 4.1875 31.5833 11.0625Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
