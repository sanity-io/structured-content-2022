import { ProjectConfig } from 'next-sanity';

export const projectConfig: ProjectConfig = {
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

export default config;
