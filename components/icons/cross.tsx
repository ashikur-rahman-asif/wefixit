import { SVGProps } from 'react';

export function CrossIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        fill="currentColor"
        d="M13.53 12.47a.75.75 0 0 1-1.06 1.06L7 8.06l-5.47 5.47a.748.748 0 0 1-1.06 0 .75.75 0 0 1 0-1.06L5.94 7 .47 1.53A.75.75 0 0 1 1.53.469L7 5.939l5.47-5.47a.75.75 0 1 1 1.062 1.06L8.062 7l5.468 5.47Z"
      />
    </svg>
  );
}
