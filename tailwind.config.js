export const Palette = {
  red: "#f93f3e",
  green: "#00CC00",
  blue: "#262BD8",
  darkBlue: "#01175F",
  yellow: "#f6d524",
  background: "#DDDDDD",
  screenBg: "#010D0A",
  white: "#fff",
  white10: "#FFFFFF10",
  white50: "#FFFFFF50",
  white60: "#FFFFFF60",
  white80: "#FFFFFF80",
  white90: "#FFFFFF90",
  grey: "#888888",
  grey50: "#88888850",
  lightGrey: "#999999",
  black: "#000",
  black80: "#00000080",
  transparent: "#fff0",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: Palette,
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
