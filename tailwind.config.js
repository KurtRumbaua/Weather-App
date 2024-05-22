/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/app/pages/home/home.component.{html,ts}"
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 4s ease-in-out infinite', // Adjust the duration (4s) and easing as desired
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }, // Adjust the vertical displacement (10px)
        }
      }
    },
  },
  plugins: [],
}

