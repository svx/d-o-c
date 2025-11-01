/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.js"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f2ff',
          100: '#e6eaff',
          200: '#d1d9ff',
          300: '#aab9ff',
          400: '#7c8fff',
          500: '#5469d4',
          600: '#4c63d2',
          700: '#3d4eb8',
          800: '#32409e',
          900: '#2a3484',
        }
      }
    },
  },
  plugins: [],
}