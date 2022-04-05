The website of [Structured Content 2022][sc2022] conference.

## Getting Started

Install dependencies:

```bash
npm i
# or
yarn
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment variables

To override defaults, add a _.env_ file to this _/web_ directory. The file should not be committed to your repository. The
following variables are supported:

- SANITY_STUDIO_API_DATASET: The name of the dataset to use for the Sanity API. If not specified, `staging` will be used
  locally and for Live Previews, and `production` in production.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

Will auto-deploy to production from the `main` branch. Pull Requests will also be deployed on their own staging URLs.

[sc2022]: https://www.structuredcontent.live
[env-vars]: https://vercel.com/sanity-io/structured-content-2022-web/settings/environment-variables
