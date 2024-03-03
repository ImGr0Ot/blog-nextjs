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
      fontFamily: {
          candara: ["PlusJakartaSans","-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Oxygen","Cantarell","Helvetica Neue","Ubuntu","sans-serif"],
        // Add more custom font families as needed
      },
    },
  },
  plugins: [],
};
export default config;
