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
        primary: {
          DEFAULT: "#6B9B6E",
          foreground: "#FDFCF9",
          deep: "#6B5A4A",
          soft: "#F0EDE6",
        },
        cta: {
          DEFAULT: "#F0D97A",
          foreground: "#3D3428",
          hover: "#E5C85A",
        },
        "accent-amber": {
          DEFAULT: "#A08B72",
          foreground: "#FDFCF9",
        },
        sky: {
          DEFAULT: "#9BB8D4",
          foreground: "#2A3D4F",
        },
        savings: {
          DEFAULT: "#5FA872",
          foreground: "#1A2E22",
        },
        surface: {
          DEFAULT: "#F8F6F2",
          muted: "#F2EFE8",
        },
        background: "#FDFCF8",
        foreground: "#4A4035",
        muted: {
          DEFAULT: "#EBE8E2",
          foreground: "#7A7268",
        },
        border: "#E0DBD3",
      },
      borderRadius: {
        ...themeConfig.borderRadius,
        lg: "0.625rem",
        md: "calc(0.625rem - 2px)",
        sm: "calc(0.625rem - 4px)",
      },
      fontFamily: {
        sans: [themeConfig.fonts.base],
      },
    },
  },
  plugins: [],
};

export default config;
