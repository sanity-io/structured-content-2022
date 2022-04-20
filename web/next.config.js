const client = require('./lib/sanity.server');
const { mainEventId } = require('./util/constants');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['cdn.sanity.io'],
  },
  async redirects() {
    const registrationUrl = await client.fetch(
      `*[_id == "${mainEventId}"][0].registrationUrl`
    );
    if (!registrationUrl) {
      console.error("Could not find 'registrationUrl' of main event!");
      return [];
    }

    console.log(`Redirecting /tickets to ${registrationUrl}`);
    return [
      {
        source: '/tickets',
        destination: registrationUrl,
        permanent: true,
      },
    ];
  },
  async rewrites() {
    const articleSlugs = await client.fetch(
      `*[_type == "article"].slug.current`
    );
    if (!Array.isArray(articleSlugs) || !articleSlugs.length) {
      console.error('Next.js rewrites: could not find any Editorial Articles!');
      return [];
    }

    const rewrites = articleSlugs.filter(Boolean).map((slug) => ({
      source: `/${slug}`,
      destination: `/articles/${slug}`,
    }));

    console.log(`Rewriting ${rewrites.length} article slugs:`);
    rewrites.forEach((rewrite) =>
      console.log(rewrite.source, '->', rewrite.destination)
    );
    return rewrites;
  },
};
