import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pastel: {
          primary: "#556B2F", // Olive Green
          secondary: "#8B4513", // Saddle Brown
          accent: "#DAA520", // Golden Rod
          background: "#F5F5DC", // Beige
          text: "#2F4F4F", // Dark Slate Gray
        },
      },
      gridTemplateColumns: {
        "13": "repeat(13, minmax(0, 1fr))",
      },
      fontSize: {
        "2xs": ".625rem",
        "3xs": ".5rem",
      },
      backdropBlur: {
        glass: "20px",
      },
      boxShadow: {
        clay: "20px 20px 60px #bebebe, -20px -20px 60px #ffffff",
        "clay-inset":
          "inset 20px 20px 60px #bebebe, inset -20px -20px 60px #ffffff",
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        "glass-glow": "0 0 20px rgba(255, 255, 255, 0.1)",
      },
      borderRadius: {
        clay: "20px",
        "clay-sm": "16px",
        "clay-lg": "24px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};

export default config;
