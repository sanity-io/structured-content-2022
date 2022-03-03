const remoteUrl = 'https://structured-content-2022.sanity.build/'
const localUrl = 'http://localhost:3000'

export default function resolveProductionUrl(doc) {
  if (doc._type !== 'route') {
    return null;
  }

  const baseUrl = window.location.hostname === 'localhost' ? localUrl : remoteUrl;
  const previewUrl = new URL(baseUrl);

  previewUrl.pathname = `/api/preview`;
  previewUrl.searchParams.append(`secret`, process.env.SANITY_STUDIO_PREVIEW_SECRET);
  previewUrl.searchParams.append(`slug`, doc?.slug?.current ?? `/`);

  return previewUrl.toString();
}
