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
        gray: {
          100: '#ebf2f2',
          200: '#d9dbdb',
          500: '#555555',
        },
        black: {
          100: '#0c0c0c',
          200: '#000000',
        },
        white: {
          50: '#fffdff'
        }
      },
    },
  },
  plugins: [],
};