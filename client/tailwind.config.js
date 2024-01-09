import flowbitePlugin from 'flowbite/plugin'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,vue}",
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx,vue}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [
    flowbitePlugin,
  ],
}
