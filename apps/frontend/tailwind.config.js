/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brandColor: '#4D80A9',
        brandBgColor: '#E7F5FF'
      }
    }
  },
  plugins: []
};
