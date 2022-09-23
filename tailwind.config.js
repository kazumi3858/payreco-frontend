/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-g-l": "#bcd6ce",
        "main-g-r": "#add7db",
        "sub-g-l": "#7ec4aa",
        "sub-g-r": "#6da7ae",
      },
    },
  },
  plugins: [],
};
