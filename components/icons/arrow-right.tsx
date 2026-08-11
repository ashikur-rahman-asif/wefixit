import { SVGProps } from 'react';

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M3.75 9.167h9.655l-3.75-3.75 1.178-1.179L16.595 10l-5.762 5.762-1.178-1.179 3.75-3.75H3.75V9.167Z"
      />
    </svg>
  );
}
