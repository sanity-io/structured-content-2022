const { fontFamily } = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			white: '#FFFFFF',
			black: '#000000',
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
			},
			red: {
				50: '#FDEBEA',
				100: '#FCD8D5',
				200: '#F9B1AB',
				300: '#F68B82',
				400: '#F36458',
				500: '#F03E2F',
				900: '#3E1E25',
			},
			gray: {
				300: '#AFBACA',
				500: '#7B8CA8',
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
