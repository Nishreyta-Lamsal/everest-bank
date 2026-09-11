import type { SVGProps } from 'react';

export function ImagesIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M2.76041 10.5624L4.89202 9.06142C5.54265 8.65318 6.41187 8.74951 6.94396 9.28882C8.13325 10.4943 9.51205 11.5902 11.3906 11.5902C13.035 11.5902 14.1526 11.0453 15.208 10.099M2.625 2.625H15.375V15.375H2.625V2.625ZM13.125 6.75C13.125 7.78553 12.2855 8.625 11.25 8.625C10.2145 8.625 9.375 7.78553 9.375 6.75C9.375 5.71447 10.2145 4.875 11.25 4.875C12.2855 4.875 13.125 5.71447 13.125 6.75Z"
        stroke="currentColor"
        strokeLinecap="square"
      />
    </svg>
  );
}
