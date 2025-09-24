/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sansita: ["'Sansita Swashed'", "cursive"],
        poppins: ["Poppins", sans-serif]
      },
    },
  },
  plugins: [],
}
