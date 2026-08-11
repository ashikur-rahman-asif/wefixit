import { SVGProps } from 'react';

export function BlueStarIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 25"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="m13 .5 3.863 7.825L25.5 9.588l-6.25 6.087 1.475 8.6L13 20.212l-7.725 4.063 1.475-8.6L.5 9.587l8.637-1.262L13 .5Z"
      />
    </svg>
  );
}
