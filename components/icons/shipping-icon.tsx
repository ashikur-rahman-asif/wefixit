import { SVGProps } from "react";

export function ShippingIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}>
      <path
        fill="#041b29"
        fillRule="evenodd"
        d="M.75 0a.75.75 0 1 0 0 1.5H11V12H8.396a2.751 2.751 0 0 0-5.292 0H2.5V8.75a.75.75 0 0 0-1.5 0v4c0 .414.336.75.75.75h1.354a2.751 2.751 0 0 0 5.292 0h4.707a2.751 2.751 0 0 0 5.293 0h1.354a.75.75 0 0 0 .75-.75V6.762a.747.747 0 0 0-.113-.408l-2.994-4.99A.75.75 0 0 0 16.75 1H12.5V.75a.75.75 0 0 0-.75-.75zm17.646 12H19V7.5h-6.5V12h.604a2.751 2.751 0 0 1 5.293 0m-3.897.75a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0m-10 0a1.25 1.25 0 1 0 2.5 0 1.25 1.25 0 0 0-2.5 0m8-6.75V2.5h3.825l2.1 3.5z"
        clipRule="evenodd"
      />
    </svg>
  );
}
