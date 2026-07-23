import type { Config } from "tailwindcss";
import { themeConfig } from "../shared-core/styles/theme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
    "../shared-core/src/**/*.{ts,tsx}",
    "../shared-core/templates/**/*.{ts,tsx}",
    "../shared-core/auth/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors:       themeConfig.colors,
      borderRadius: themeConfig.borderRadius,
      fontFamily:   { sans: [themeConfig.fonts.base] },
    },
  },
  plugins: [],
};

export default config;
