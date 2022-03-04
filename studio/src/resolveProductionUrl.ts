import { getEnvironment, rootURLs } from "./urlResolver";

export default function resolveProductionUrl(doc) {
  if (!["route", "page"].includes(doc._type)) {
    return null;
  }

  const previewUrl = new URL(rootURLs[getEnvironment()].web);
  previewUrl.pathname = `/api/preview`;
  previewUrl.searchParams.append(
    `secret`,
    process.env.SANITY_STUDIO_PREVIEW_SECRET
  );
  previewUrl.searchParams.append(`slug`, doc?.slug?.current ?? `/`);

  return previewUrl.toString();
}
