const projectConfig = {
  projectId: '33zsuc7i',
  dataset:
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'production'
      ? 'production'
      : 'staging',
};

console.log(`Using ${projectConfig.dataset} dataset`);

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
