import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          400: "#D27339",
          900: "#FF6A00",
        },
        secondary: {
          400: "#1A0A00",
          900: "#662700",
        },
        offwhite: "#FFFAFA",
        offgray: "#606060",
        textGray: "#7E746D",
        borderGray: "#ece9e9",
        transparentGray: "#D9D9D9",
        brownText: "#1B0B01",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
