/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // enable dark mode support
  theme: {
    extend: {
      backdropBlur: {
        md: '12px',
      },
      colors: {
        glassWhite: 'rgba(255, 255, 255, 0.1)',
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding',
      },
    },
  },
  plugins: [],
}
