import { SVGProps, useId } from "react";

export function PickUpIcon(props: SVGProps<SVGSVGElement>) {
  const uniqueId = useId();
  const clipId = `pickup-clip-${uniqueId}`;
  const gradB = `pickup-grad-b-${uniqueId}`;
  const gradC = `pickup-grad-c-${uniqueId}`;
  const gradD = `pickup-grad-d-${uniqueId}`;
  const gradE = `pickup-grad-e-${uniqueId}`;
  const gradF = `pickup-grad-f-${uniqueId}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="currentColor"
      {...props}>
      <g clipPath={`url(#${clipId})`}>
        <path
          fill={`url(#${gradB})`}
          d="M53.279 47.203V14.55L.869 16.797V49.45a2.2 2.2 0 0 0 1.111 1.924l20.762 11.987a4.77 4.77 0 0 0 4.772 0l24.654-14.234a2.2 2.2 0 0 0 1.11-1.924"
        />
        <path
          fill={`url(#${gradC})`}
          d="M1.98 14.873 26.634.64a4.77 4.77 0 0 1 4.773 0l20.76 11.987c1.482.855 1.482 2.992 0 3.848L27.515 30.707a4.77 4.77 0 0 1-4.772 0L1.98 18.721c-1.48-.855-1.48-2.993 0-3.848"
        />
        <path
          fill="#dea861"
          d="m9.974 10.258 26.48 15.288 7.024-4.055-26.48-15.288z"
        />
        <path
          fill="#cc8241"
          d="m14.172 7.832 26.48 15.288-1.376.794-26.48-15.288zm22.282 17.714v5.8l7.024-4.055v-5.8z"
        />
        <path
          fill={`url(#${gradD})`}
          d="m60.074 21.825-3.935-2.271c-1.895-1.313-4.497-1.236-7.349.583-5.173 3.298-9.35 11.359-9.517 18.356-.072 3.043.604 5.439 1.794 7.021l-.002.003 6.37 8.143q.172.22.387.333l3.947 2.279z"
        />
        <path
          fill={`url(#${gradE})`}
          d="M63.13 29.647c0-7.557-4.722-10.917-10.447-7.267-5.173 3.298-9.35 11.359-9.517 18.356-.072 3.044.603 5.44 1.794 7.021l-.002.003 6.369 8.143c.893 1.143 2.744.074 3.637-2.1l6.369-15.497h-.002c1.133-2.814 1.8-5.824 1.8-8.66"
        />
        <path
          fill={`url(#${gradF})`}
          d="m60.435 27.81-2.937-1.691c-1.16-.614-2.65-.526-4.274.412-3.697 2.134-6.695 7.861-6.695 12.791 0 2.71.907 4.613 2.338 5.424l-.001.002 2.684 1.55z"
        />
        <path
          fill="#f2effa"
          d="M61.344 39.346c2.225-5.222 1.634-10.476-1.32-11.735s-7.153 1.954-9.378 7.176-1.634 10.476 1.32 11.734c2.955 1.26 7.153-1.954 9.378-7.175"
        />
      </g>
      <defs>
        <linearGradient
          id={gradB}
          x1={20.939}
          x2={28.138}
          y1={39.275}
          y2={39.275}
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#cc8241" />
          <stop offset={1} stopColor="#dea861" />
        </linearGradient>
        <linearGradient
          id={gradC}
          x1={12.483}
          x2={39.445}
          y1={7.25}
          y2={22.816}
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#dea861" />
          <stop offset={1} stopColor="#ebcba0" />
        </linearGradient>
        <linearGradient
          id={gradD}
          x1={48.657}
          x2={55.613}
          y1={39.135}
          y2={27.088}
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#ab2c37" />
          <stop offset={1} stopColor="#ff7a85" />
        </linearGradient>
        <linearGradient
          id={gradE}
          x1={43.161}
          x2={67.627}
          y1={44.831}
          y2={44.831}
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#ff4757" />
          <stop offset={1} stopColor="#ff7a85" />
        </linearGradient>
        <linearGradient
          id={gradF}
          x1={52.842}
          x2={55.593}
          y1={34.185}
          y2={29.419}
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#c5baeb" />
          <stop offset={1} stopColor="#d7d1eb" />
        </linearGradient>
        <clipPath id={clipId}>
          <path fill="#fff" d="M0 0h64v64H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
