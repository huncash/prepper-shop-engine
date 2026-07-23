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
      colors: {
        ...themeConfig.colors,
        brand: {
          DEFAULT: "#6AB5EE",
          foreground: "#FFFFFF",
          dark: "#4A9AD8",
        },
        "section-dark": {
          DEFAULT: "#33373D",
          foreground: "#F7F7F7",
        },
        primary: {
          DEFAULT: "#6AB5EE",
          foreground: "#FFFFFF",
        },
        foreground: "#35383D",
        muted: {
          DEFAULT: "#F4F4F5",
          foreground: "#71717A",
        },
        border: "#E4E4E7",
      },
      borderRadius: themeConfig.borderRadius,
      fontFamily: {
        sans: ['"Open Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
        display: ['"Open Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
