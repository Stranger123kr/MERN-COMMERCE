/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm0: "330px", // custom small screen size
      sm1: "365px", // custom small screen size
      sm2: "425px", // custom small screen size
      sm: "640px", // default small screen size
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },

    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
  ],
};
