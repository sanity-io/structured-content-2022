const sanityClient = require('@sanity/client');
const { default: config } = require('./config');

const mainClient = sanityClient({ ...config.sanity.baseConfig });

module.exports = mainClient;
