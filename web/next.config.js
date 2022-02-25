const client = require('./lib/sanity.server');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  async redirects() {
    // ".microcopy[key == "mainCta"]" filtering does not work, so we have to filter server side
    const microCopy = await client.fetch(`*[_id == "aad77280-6394-4090-afad-1c0f2a0416c6"][0].microcopy[]`);
    if (!Array.isArray(microCopy) || !microCopy.length) {
      console.error("Could not find 'microcopy' attribute of main event!")
      return [];
    }

    const mainCta = microCopy.find(microCopy => microCopy.key === 'mainCta');
    if (!mainCta?.action) {
      console.error("Could not find 'mainCta' element in microcopy array!")
      return [];
    }

    console.log(`Redirecting /tickets to ${mainCta.action}`);
    return [
      {
        source: '/tickets',
        destination: mainCta.action,
        permanent: true,
      },
    ]
  },
};
