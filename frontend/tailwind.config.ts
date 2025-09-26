import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1200px",
      },
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1E3A8A",
          foreground: "#FFFFFF",
        },
        muted: "#F5F7FB",
        card: "#FFFFFF",
        border: "#E5E7EB",
        text: "#0F172A",
      },
      borderRadius: {
        lg: "12px",
        DEFAULT: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
