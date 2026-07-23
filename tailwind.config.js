/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#0061FF",
        secondary: "#F5F7FA",

        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",

        black: "#191D31",
        white: "#FFFFFF",

        gray: {
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
        },
      },
    },
  },
  plugins: [],
};