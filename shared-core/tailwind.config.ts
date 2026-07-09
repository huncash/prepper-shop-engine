import type { Config } from "tailwindcss";
import { themeConfig } from "./styles/theme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "./auth/**/*.{ts,tsx}",
    "./templates/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: themeConfig.colors,
      borderRadius: themeConfig.borderRadius,
      fontFamily: {
        sans: [themeConfig.fonts.base],
      },
    },
  },
  plugins: [],
};

export default config;
