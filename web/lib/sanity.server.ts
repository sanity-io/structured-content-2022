import sanityClient from '@sanity/client';
import config from './config';

const mainClient = sanityClient({ ...config.sanity.baseConfig });

export default mainClient;
