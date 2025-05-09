/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        test: "var(--test)",
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
