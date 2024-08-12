/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fffcea",
          100: "#fff5c5",
          200: "#ffeb85",
          300: "#ffda46",
          400: "#ffc71b",
          500: "#ffa502",
          600: "#e27c00",
          700: "#bb5502",
          800: "#984108",
          900: "#7c360b",
          950: "#481a00",
        },
        secondary: {
          50: "#f5f7fa",
          100: "#ebeef3",
          200: "#d2dae5",
          300: "#abbcce",
          400: "#7d97b3",
          500: "#5d7b9a",
          600: "#4b6584",
          700: "#3c4f68",
          800: "#344458",
          900: "#2f3b4b",
          950: "#1f2632",
        },
      },
    },
  },
  plugins: [],
};
