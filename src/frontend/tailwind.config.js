/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          default: "#f58549",
        },
        yellow: {
          default: "#fbc687",
          hover: "#E6B566",
        },
        red: {
          default: "#e97777",
          hover: "#C96868",
        },
        background: {
          light: "#ffffff",
          dark: "#5d5f71",
          darker: "#333446",
        },
        background2: {
          dark: "#424242",
        },
        text: {
          light: "#364958",
          dimmed: "#eee5e9",
          dark: "#f7f7ff",
        },
      },
    },
  },
  plugins: [],
};
