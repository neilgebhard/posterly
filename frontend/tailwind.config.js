const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        orange: {
          DEFAULT: "#ff4500",
        },
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      opacity: ["disabled"],
    },
  },
  plugins: [],
};
