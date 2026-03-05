/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5EFE6',
        dark: '#0D0D0D',
        accent: '#C17A3C', // warm terracotta
      },
      fontFamily: {
        geologica: ['Geologica', 'serif'],
        afacad: ['Afacad', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
