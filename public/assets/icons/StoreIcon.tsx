import React from "react";

interface StoreIconProps {
    width?: string;
    height?: string;
}

function StoreIcon({width = '24px', height = '24px'}: StoreIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 33 33"
    >
      <mask
        id="mask0_70_744"
        style={{ maskType: "alpha" }}
        width="33"
        height="33"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <path fill="currentColor" d="M0 0H33V33H0z"></path>
      </mask>
      <g mask="url(#mask0_70_744)">
        <path
          fill="currentColor"
          d="M6.822 5.844h19.356c.292 0 .537.099.735.296a.998.998 0 01.296.735.996.996 0 01-.296.735.997.997 0 01-.735.296H6.822a.997.997 0 01-.735-.296.998.998 0 01-.296-.735c0-.293.099-.538.296-.735a.998.998 0 01.735-.296zm.264 21.312c-.352 0-.647-.119-.885-.357a1.203 1.203 0 01-.357-.885v-7.008h-.426a1.2 1.2 0 01-.966-.459 1.148 1.148 0 01-.242-1.045l1.375-6.452a1.21 1.21 0 01.438-.705c.23-.184.49-.276.783-.276h19.388c.292 0 .553.092.783.276.23.184.376.419.438.705l1.375 6.452c.092.391.011.74-.242 1.045a1.2 1.2 0 01-.966.46h-.426v7.218a.997.997 0 01-.296.735.998.998 0 01-.735.296.996.996 0 01-.735-.296.997.997 0 01-.296-.735v-7.219h-6.188v7.008c0 .352-.119.647-.357.885a1.203 1.203 0 01-.885.357H7.086zm.82-2.062h8.938v-6.188H7.906v6.188z"
        ></path>
      </g>
    </svg>
  );
}

export default StoreIcon;
