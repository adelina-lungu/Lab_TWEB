/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      colors: {
        gold: {
          400: "#c9a96e",
          500: "#b8944f",
          600: "#a07d3a",
        },
      },
    },
  },
  plugins: [],
};
