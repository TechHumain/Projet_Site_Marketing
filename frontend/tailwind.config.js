/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
          DEFAULT: "#1F3AE0",
          foreground: "#F8FAFC",
        },
        accent: {
          DEFAULT: "#38BDF8",
          foreground: "#0B1120",
        },
        brand: {
          DEFAULT: "#6366F1",
          dark: "#4338CA",
        },
        muted: "#F5F7FB",
        card: "#FFFFFF",
        border: "#E5E7EB",
        text: "#0F172A",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Space Grotesk", "Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "18px",
        DEFAULT: "18px",
      },
      boxShadow: {
        elevated: "0 20px 45px -25px rgba(31, 58, 224, 0.45)",
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(120% 120% at 85% 15%, rgba(56, 189, 248, 0.28) 0%, rgba(30, 58, 138, 0.18) 40%, transparent 65%)",
        "section-fade": "linear-gradient(180deg, #FFFFFF 0%, #F5F7FB 100%)",
        "brand-gradient": "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)",
      },
    },
  },
  plugins: [],
};
