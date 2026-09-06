import { SVGProps } from "react";

export function MastercardIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 39 24"
      fill="none"
      {...props}
    >
      <path fill="#ff5f00" d="M24.666 2.566h-10.5v18.868h10.5z" />
      <path
      fill="#eb001b"
      d="M14.833 12a11.978 11.978 0 0 1 4.583-9.434 12 12 0 1 0 0 18.868A11.98 11.98 0 0 1 14.833 12"
    />
    <path
      fill="#f79e1b"
      d="M38.832 12a12 12 0 0 1-19.416 9.434 12.001 12.001 0 0 0 0-18.868A12 12 0 0 1 38.832 12m-1.145 7.436v-.386h.156v-.08h-.397v.08h.156v.386zm.77 0v-.466h-.121l-.14.32-.14-.32h-.122v.466h.086v-.351l.131.303h.09l.13-.304v.352z"
    />
  </svg>
  );
}
