/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          50: '#d9fff0',
          500: '#46d1b2',
          600: '#28c299',
        },
      },
    },
  },
  plugins: [],
};