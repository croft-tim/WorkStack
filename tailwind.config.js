import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './client/**/*.tsx'],
  theme: {
    extend: {
      screens: {
        nav: '880px',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('pink', '.pink &')
    }),
  ],
}
