/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#f15025',
        },
        background: {
          light: '#ffffff',
          dark: '#364958',
        },
        text: {
          light: '#364958',
          dark: '#f7f7ff',
        },
      },
    },
  },
  plugins: [],
}

