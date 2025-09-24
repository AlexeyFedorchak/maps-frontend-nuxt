/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/components/**/*.{js,vue,ts}",
      "./app/layouts/**/*.vue",
      "./app/pages/**/*.vue",
      "./app/plugins/**/*.{js,ts}",
      "./app/app.vue"
    ],
    theme: {
      extend: {
        fontFamily: {
          'lato': ['Lato', 'sans-serif'],
          'roboto': ['Roboto', 'sans-serif']
        },
      },
    },
    plugins: [],
  }