import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0C1F4A",
        saffron: "#FF6B00",
        ink: "#101828",
        muted: "#667085",
        line: "#E4E7EC",
        mint: "#0E8F6E",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(12, 31, 74, 0.12)",
        glow: "0 20px 55px rgba(255, 107, 0, 0.22)",
      },
    },
  },
  plugins: [],
};

export default config;
