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
        canvas: {
          DEFAULT: "#F9F7F4",
          warm: "#EDEAE4",
        },
        brand: {
          DEFAULT: "#3A5C3A",
          foreground: "#FFFFFF",
          dark: "#2D472D",
        },
        "section-dark": {
          DEFAULT: "#1E1A16",
          foreground: "#F9F7F4",
        },
        primary: {
          DEFAULT: "#3A5C3A",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#7A4DB3",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#E5DFD6",
          foreground: "#332E28",
        },
        background: "#F9F7F4",
        foreground: "#1E1A16",
        muted: {
          DEFAULT: "#EDEAE4",
          foreground: "#766F65",
        },
        border: "#DDD8D0",
      },
      borderRadius: {
        ...themeConfig.borderRadius,
        lg: "0.375rem",
        md: "calc(0.375rem - 2px)",
        sm: "calc(0.375rem - 4px)",
      },
      fontFamily: {
        sans: ['"Open Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
