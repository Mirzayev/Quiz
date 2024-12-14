/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '5xl': '0 2px 2px 0 black',
        '6xl': '0 2px 5px 0 black'
      }
    },
  },
  plugins: [],
}