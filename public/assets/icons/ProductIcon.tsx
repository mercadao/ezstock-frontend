import React from "react";

interface ProductIconProps {
    width?: string;
    height?: string;
}

function ProductIcon({width = '24px', height = '24px'}: ProductIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 33 33"
    >
      <mask
        id="mask0_70_749"
        style={{ maskType: "alpha" }}
        width="33"
        height="33"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="currentColor" d="M0 0H33V33H0z"></path>
      </mask>
      <g mask="url(#mask0_70_749)">
        <path
          fill="currentColor"
          d="M15.469 29.277V17.092l-10.656-6.16v10.782a2.436 2.436 0 001.243 2.147l9.413 5.416zm2.062 0l9.414-5.416a2.436 2.436 0 001.243-2.147V10.931L17.53 17.092v12.185zm5.254-17.597l4.281-2.478-9.323-5.36a2.448 2.448 0 00-2.486 0l-3.02 1.732 10.548 6.106zM16.5 15.316l4.223-2.43L10.17 6.772 5.926 9.21 16.5 15.315z"
        ></path>
      </g>
    </svg>
  );
}

export default ProductIcon;
