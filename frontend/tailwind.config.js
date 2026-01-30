/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- THIS line makes sure Dashboard.jsx gets styled
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}