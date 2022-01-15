module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      blue: {
        50: '#E8F1FE',
        100: '#D2E3FE',
        400: '#4E91FC',
        900: '#152A4E',
      },
      red: {
        50: '#FDEBEA',
        100: '#FCD8D5',
        200: '#F9B1AB',
        300: '#F68B82',
        400: '#F36458',
        500: '#F03E2F',
      },
      gray: {
        300: '#AFBACA',
        500: '#7B8CA8',
      }
    },
    extend: {
      listStyleType: {
        checkMark: ''
      }
    },
  },
  plugins: [],
}
