module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-custom-media': {
      preserve: false,
      importFrom: ['./styles/media.css'],
    },
    'postcss-custom-properties': {
      preserve: false,
      importFrom: ['./styles/variables.css'],
    },
  },
};
