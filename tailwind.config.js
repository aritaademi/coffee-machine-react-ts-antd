/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fill: {
          '0%': { height: '0%' },
          '100%': { height: '100%' },
        },
      },
      animation: {
        fill: 'fill 2s ease-out forwards',
      },
    },
  },
  plugins: [],
}