import React from "react";

interface LogOutIconProps {
    width?: string;
    height?: string;
}

function LogOutIcon({width = '24px', height = '24px'}: LogOutIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 26 26"
    >
      <path
        fill="currentColor"
        d="M11.878 0c3.107 0 5.64 2.49 5.64 5.556v5.993H9.879a.964.964 0 00-.98.964c0 .525.433.963.98.963h7.639v5.981c0 3.066-2.534 5.569-5.665 5.569h-6.2C2.533 25.026 0 22.536 0 19.47V5.568C0 2.49 2.546 0 5.665 0h6.213zm8.819 8.196a.956.956 0 011.363-.012l3.654 3.64a.955.955 0 010 1.365L22.06 16.83a.97.97 0 01-.675.288c-.25 0-.5-.1-.689-.288a.967.967 0 010-1.364l2.002-1.99h-5.18V11.55h5.18L20.697 9.56a.967.967 0 010-1.364z"
      ></path>
    </svg>
  );
}

export default LogOutIcon;
