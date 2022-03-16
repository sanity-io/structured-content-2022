const projectConfig = {
  projectId: '33zsuc7i',
  dataset:
    process.env.SANITY_STUDIO_API_DATASET ||
    (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? 'production'
      : 'staging'),
};

const config = {
  sanity: {
    baseConfig: {
      ...projectConfig,
      useCdn: false,
      apiVersion: '2022-03-03',
    },
  },
};

module.exports = {
  default: config,
  projectConfig,
};
