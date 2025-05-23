/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        PathDraw: {
          '0%': { strokeDashoffset: '999' },
          '100%': { strokeDashoffset: '0' },
        },
        drawStroke: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      animation: {
        PathDraw: 'PathDraw 1s ease forwards',
        drawStroke: 'drawStroke 1s ease forwards',
      },
  },
  plugins: [],
}
};

