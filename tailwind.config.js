/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-gradient-l": "#C5BDD5",
        "main-gradient-r": "#ADDBD8",
        "sub-gradient-l": "#8F92BC",
        "sub-gradient-r": "#68929C",
        "large-description": "black/70",
        "sub-color": "#AD679B",
      },
    },
  },
  plugins: [],
};
