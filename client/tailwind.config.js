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
          50: "#f8fafc",
          100: "#f1f5f9",
          150: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        social: {
          facebook: "#3b5998",
          twitter: "#1da1f2",
          linkedin: "#0077b5",
          instagram: "#c13584",
          youtube: "#ff0000",
          whatsapp: "#25d366",
          telegram: "#0088cc",
        },
      },
    },
  },
  plugins: [],
};
