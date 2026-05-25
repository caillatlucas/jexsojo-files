import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        doj: {
          navy: "#002244",
          gold: "#D4AF37",
          gray: "#F4F6F8",
          darkGray: "#333333"
        }
      },
      fontFamily: {
        serif: ['"Merriweather"', "serif"],
        sans: ['"Inter"', "sans-serif"]
      }
    },
  },
  plugins: [],
};
export default config;
