const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#131922',
      blue: {
        50: '#E8F1FE',
        100: '#D2E3FE',
        200: '#A6C8FD',
        300: '#7AACFD',
        400: '#4E91FC',
        500: '#2276FC',
        600: '#1E63D0',
        700: '#1B50A5',
        800: '#183D79',
        900: '#152A4E',
        950: '#162036',
      },
      red: {
        50: '#FDEBEA',
        100: '#FCD8D5',
        200: '#F9B1AB',
        300: '#F68B82',
        400: '#F36458',
        500: '#F03E2F',
        600: '#C3362C',
        700: '#972E2A',
        800: '#6A2627',
        900: '#3E1E25',
      },
      gray: {
        50: 'F1F3F6',
        100: 'E4E8ED',
        200: '#CAD1DC',
        300: '#AFBACA',
        400: '#95A3B9',
        500: '#7B8CA8',
        600: '#66758D',
        700: '#515E72',
        800: '#3C4758',
        900: '#262F3D',
        950: '#1C2430',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
        larsseit: ['Larsseit', ...fontFamily.sans],
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
