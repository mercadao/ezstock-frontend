import React from "react";

interface SearchIconProps {
  width?: string;
  height?: string;
}

function SearchIcon({ width = "24px", height = "24px" }: SearchIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 24 24"
    >
      <mask
        id="mask0_81_822"
        style={{ maskType: "alpha" }}
        width="24"
        height="24"
        x="0"
        y="0"
        maskUnits="userSpaceOnUse"
      >
        <rect width="24" height="24" fill="#D9D9D9" rx="12"></rect>
      </mask>
      <g mask="url(#mask0_81_822)">
        <path
          fill="#7E746D"
          d="M20.3 20.3a.99.99 0 01-1.4 0l-4.201-4.201c-.796-.796-2.064-.83-3.124-.449-.65.233-1.342.35-2.075.35-1.817 0-3.354-.63-4.612-1.887C3.629 12.854 3 11.317 3 9.5c0-1.817.63-3.354 1.888-4.612C6.146 3.629 7.683 3 9.5 3c1.817 0 3.354.63 4.613 1.888C15.37 6.146 16 7.683 16 9.5c0 .733-.117 1.425-.35 2.075-.38 1.06-.348 2.328.449 3.124L20.3 18.9a.99.99 0 010 1.4zM9.5 14c1.25 0 2.313-.438 3.188-1.313C13.562 11.813 14 10.75 14 9.5c0-1.25-.438-2.313-1.313-3.188C11.813 5.438 10.75 5 9.5 5c-1.25 0-2.313.438-3.188 1.313S5 8.25 5 9.5c0 1.25.438 2.313 1.313 3.188C7.188 13.562 8.25 14 9.5 14z"
        ></path>
      </g>
    </svg>
  );
}

export default SearchIcon;
