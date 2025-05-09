/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        base: "450px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        primary: "var(--primary)",
        "primary-inverted": "var(--primary-inverted)",
      },
      fontFamily: {
        metropolis: ["Metropolis", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("light", '[theme="light"] &');
      addVariant("dark", '[theme="dark"] &');
    },
  ],
};
