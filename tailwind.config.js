/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    gridTemplateColumns: {
      'auto-fill': 'repeat(auto-fill, minmax(200px, 1fr))'
    },
    extend: {
      height: {
        128: '40rem'
      },
      boxShadow: {
        'custom': "0 0 16px rgb(235, 235, 235)"
      },
      colors: {
        green: {
          DEFAULT: '#03AC0E',
          200: '#02920c'
        }
      },
      backgroundImage: {
        'hero-login': "url('https://i.ibb.co/yp8KpS4/5570863.jpg')",
      },
      minHeight: {
        128: '40rem'
      }
    },
  },
  plugins: [],
}



