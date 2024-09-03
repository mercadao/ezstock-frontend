import React from "react";

interface ChartIconProps {
    width?: string;
    height?: string;
}

function ChartIcon({width = '24px', height = '24px'}: ChartIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 33 33"
    >
      <mask
        id="mask0_70_767"
        style={{ maskType: "alpha" }}
        width="33"
        height="33"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="currentColor" d="M0 0H33V33H0z"></path>
      </mask>
      <g mask="url(#mask0_70_767)">
        <path
          fill="currentColor"
          d="M17.531 15.469V3.549c3.224.255 5.948 1.5 8.17 3.733 2.221 2.234 3.472 4.963 3.75 8.187h-11.92zm-2.04 13.948c-3.37-.256-6.2-1.621-8.492-4.096-2.291-2.475-3.437-5.415-3.437-8.82 0-3.43 1.146-6.381 3.437-8.856 2.292-2.475 5.122-3.84 8.491-4.096v25.868zm2.04 0V17.51h11.92c-.25 3.215-1.493 5.943-3.73 8.184-2.235 2.24-4.966 3.482-8.19 3.723z"
        ></path>
      </g>
    </svg>
  );
}

export default ChartIcon;
