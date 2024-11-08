/*eslint-env node*/
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bgdarkgray': '#dddbe7',
        'bgdarkblue': '#5f64a7',
        'bgdarkpurple': '#371555',
        
        'cinza': '#f3f4f6',
        'cinzatexto': '#555555'
      },
      fontFamily: {
        tenorsans: ['TenorSans']
      }
    },
  },
  
  plugins: [],
}