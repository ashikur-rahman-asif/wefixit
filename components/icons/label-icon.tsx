import { SVGProps } from "react";

export function LabelIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      {...props}>
      <path
        fill="#a1a1aa"
        fillRule="evenodd"
        d="M15.707 7.293a1 1 0 0 1 0 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7A.997.997 0 0 1 0 8V3a3 3 0 0 1 3-3h5c.256 0 .512.098.707.293zM3 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
        clipRule="evenodd"
      />
    </svg>
  );
}
