import { SVGProps } from 'react';

export function RoundedTickIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="none"
      {...props}
    >
      <g clipPath="url(#a)">
        <mask
          id="b"
          width={18}
          height={18}
          x={0}
          y={0}
          maskUnits="userSpaceOnUse"
          style={{
            maskType: 'luminance',
          }}
        >
          <path fill="#fff" d="M18 0H0v18h18V0Z" />
        </mask>
        <g mask="url(#b)">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            strokeWidth={1.406}
            d="m12.481 6.641-4.717 4.717L5.52 9.113"
          />
          <mask
            id="c"
            width={18}
            height={18}
            x={0}
            y={0}
            maskUnits="userSpaceOnUse"
            style={{
              maskType: 'luminance',
            }}
          >
            <path fill="#fff" d="M0 0h18v18H0V0Z" />
          </mask>
          <g mask="url(#c)">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeMiterlimit={10}
              strokeWidth={1.406}
              d="M17.297 9A8.297 8.297 0 1 1 .703 9a8.297 8.297 0 0 1 16.594 0Z"
            />
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
