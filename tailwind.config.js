/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14213D",
        accent: "#C58A2A",
        background: "#F7F6F3",
        card: "#FFFFFF",
        border: "#E5E7EB",
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "2xl": "16px",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(20, 33, 61, 0.06)",
      },
    },
  },
  plugins: [],
};
