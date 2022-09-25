/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-gradient-l": "#BBCCD6",
        "main-gradient-r": "#CEE1CA",
        "sub-gradient-l": "#948AA8",
        "sub-gradient-r": "#689588",
        "sub-color": "#AD679B",
        "main-button-color": "#93B8CD",
        "sub-button-color": "#7495A8",
        "point-color": "#58307F",
      },
      dropShadow: {
        "3xl": "0 30px 55px rgba(0, 0, 0, 0.2)",
        "4xl": "0 40px 40px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
