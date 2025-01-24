/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Work Sans', 'Roboto', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        emerald: {
          50: '#d9fff0',
          500: '#46d1b2',
          600: '#28c299',
        },
        babyblue: {
          50: '#caf0f8',
          100: '#ade8f4',
          200: '#90e0ef',
          300: '#48cae4',
          400: '#00b4d8',
          500: '#0096c7',
          600: '#0077b6',
        }
      },
    },
  },
  plugins: [],
};