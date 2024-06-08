import type { Config } from "tailwindcss";

const ELECTRIC_VIOLET = "#864AF9";
const SUN_GLOW = "#F8E559";
const SNOW_WHITE = "#ffffff";
const ULTRA_MARINE_BLUE = "#383486";
const HOT_PINK = "#f5426f";
const NIGHT_SHADOW = "#261241";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: SUN_GLOW,
          secondary: "#f6d860",
          accent: SUN_GLOW,
          neutral: SNOW_WHITE,
          "base-100": ULTRA_MARINE_BLUE,
        },
      },
    ],
  },
};
export default config;
