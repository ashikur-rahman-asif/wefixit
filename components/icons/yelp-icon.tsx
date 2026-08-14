import { SVGProps } from "react";

export function YelpIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        fill="#d32323"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.29 14.29c-.39.39-1.02.39-1.41 0l-3.54-3.54a.996.996 0 1 1 1.41-1.41l3.54 3.54c.39.39.39 1.02 0 1.41zm0-7.07a.996.996 0 1 1-1.41-1.41l3.54-3.54c.39-.39 1.02-.39 1.41 0s.39 1.02 0 1.41l-3.54 3.54z"
      />
    </svg>
  );
}
