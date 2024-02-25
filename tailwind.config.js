/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      screens: {
        'vs': '450px',
        'sm': '540px',
        'md': '768px',
        'lg': '1024px',
      }
    },
  },
  plugins: [],
}

