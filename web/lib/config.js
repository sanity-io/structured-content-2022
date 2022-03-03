const projectConfig = {
  projectId: '33zsuc7i',
  dataset: 'production',
};

const config = {
  sanity: {
    baseConfig: {
      ...projectConfig,
      useCdn: false,
      apiVersion: '2022-03-03'
    },
  },
};

module.exports = {
  default: config,
  projectConfig,
};
