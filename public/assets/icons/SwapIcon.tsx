import React from "react";

interface SwapIconProps {
    width?: string;
    height?: string;
}

function SwapIcon({ width = "24", height = "21" }: SwapIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 21"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M13.035 6.167a.801.801 0 010-1.132l4.8-4.8a.802.802 0 011.133 1.132l-4.8 4.8a.8.8 0 01-1.133 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M23.768 6.167a.8.8 0 01-1.133 0l-4.8-4.8A.8.8 0 1118.968.235l4.8 4.8a.8.8 0 010 1.132z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M18.401.801a.8.8 0 01.8.8v15.2a.8.8 0 11-1.6 0v-15.2a.8.8 0 01.8-.8zm-7.433 13.834a.8.8 0 010 1.132l-4.8 4.8a.801.801 0 01-1.133-1.132l4.8-4.8a.8.8 0 011.133 0z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M.235 14.635a.801.801 0 011.133 0l4.8 4.8a.8.8 0 11-1.133 1.132l-4.8-4.8a.8.8 0 010-1.132z"
        clipRule="evenodd"
      ></path>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.602 20.001a.8.8 0 01-.8-.8v-15.2a.8.8 0 011.6 0v15.2a.8.8 0 01-.8.8z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export default SwapIcon;
