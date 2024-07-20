/** @type {import('tailwindcss').Config} */
module.exports = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  darkMode: "selector",
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        titilium: ['"Titillium Web", sans-serif;'],

        play: ['"Play", sans-serif;'],

        poiret: ['"Poiret One", sans-serif;'],
      },
    },
  },
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
