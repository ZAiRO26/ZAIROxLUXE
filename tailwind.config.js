/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'raana-black': '#000000',
        'raana-gold': '#D4AF37',
        'raana-red': '#C41E3A',
        'raana-green': '#006400',
      },
      fontFamily: {
        'serif': ['Georgia', 'serif'],
        'sans': ['Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 