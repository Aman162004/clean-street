/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  // Keep Bootstrap styles intact while allowing Tailwind utilities
  corePlugins: {
    preflight: false,
  },
};
