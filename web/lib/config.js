const projectConfig = {
  projectId: '33zsuc7i',
  dataset: 'production',
};

const config = {
  sanity: {
    baseConfig: {
      ...projectConfig,
      useCdn: false,
    },
  },
};

module.exports = {
  default: config,
  projectConfig,
};
