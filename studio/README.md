# Sanity Clean Content Studio

Congratulations, you have now installed the Sanity Content Studio, an open source real-time content editing environment connected to the Sanity backend.

Now you can do the following things:

- [Read “getting started” in the docs](https://www.sanity.io/docs/introduction/getting-started?utm_source=readme)
- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

## Enabling Live Preview

[Live Preview][0] is a great way to test your content in real-time. Your local page can reflect your Studio drafts.

You can enable Live Preview by adding a _.env.development_ file to the _/studio_ directory with a `SANITY_STUDIO_PREVIEW_SECRET` variable,
and an _.env_ file to the _/web_ directory. Fetch the value for this key [in the "Environment Variables" section of the Vercel project][1].
Once added, restart the project locally. After you've logged in to Sanity Studio, open a Route document, click the top-right meatball menu,
and select "Open preview". That page will load draft content client-side after the initial render.

[0]: https://www.sanity.io/guides/nextjs-live-preview
[1]: https://vercel.com/sanity-io/structured-content-2022-studio/settings/environment-variables
