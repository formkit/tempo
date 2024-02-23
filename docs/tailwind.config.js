/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        body: "#efefef",
        footer: "#e2e2e2",
        lcd: "#e1eaee",
      },
      screens: {
        mdl: "900px",
      },
    },
  },
  plugins: [],
}
