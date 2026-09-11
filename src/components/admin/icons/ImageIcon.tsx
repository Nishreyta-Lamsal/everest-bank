import type { SVGProps } from 'react';

export function ImageIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M12.6667 2H3.33333C2.59695 2 2 2.59695 2 3.33333V12.6667C2 13.403 2.59695 14 3.33333 14H12.6667C13.403 14 14 13.403 14 12.6667V3.33333C14 2.59695 13.403 2 12.6667 2Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.0013 7.33341C6.73768 7.33341 7.33464 6.73646 7.33464 6.00008C7.33464 5.2637 6.73768 4.66675 6.0013 4.66675C5.26492 4.66675 4.66797 5.2637 4.66797 6.00008C4.66797 6.73646 5.26492 7.33341 6.0013 7.33341Z"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 10L11.9427 7.94267C11.6926 7.6927 11.3536 7.55228 11 7.55228C10.6464 7.55228 10.3074 7.6927 10.0573 7.94267L4 14"
        stroke="currentColor"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
