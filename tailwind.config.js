/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          black: "#121212",
          gray2: "#363636",
        }
      }
    },
  },
  plugins: [],
}