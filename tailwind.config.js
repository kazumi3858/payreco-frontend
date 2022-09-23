/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "main-g-l": "#C5BDD5",
        "main-g-r": "#ADDBD8",
        "sub-g-l": "#8F92BC",
        "sub-g-r": "#68929C",
        "large-t": "black/70",
        "company-t": "#AD679B",
      },
    },
  },
  plugins: [],
};
