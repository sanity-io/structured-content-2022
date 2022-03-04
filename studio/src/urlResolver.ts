export const rootURLs = {
  production: {
    studio: "https://admin.structuredcontent.live",
    web: "https://structuredcontent.live",
  },
  staging: {
    studio: "https://stagingadmin.structuredcontent.live/",
    web: "https://structured-content-2022.sanity.build/",
  },
  development: {
    studio: "http://localhost:3333",
    web: "http://localhost:3000",
  },
};

export const paths = {
  venue: "venues",
  person: "speakers",
  session: "sessions",
  sponsor: "sponsors",
  sponsorship: "sponsorships",
  ticket: "tickets",
  article: "articles",
  event: "",
};

export const getEnvironment = () => {
  const location = window.location.href;
  if (location.includes("localhost")) {
    return "development";
  }
  if (location.includes("build")) {
    return "staging";
  }
  if (location.includes("stagingadmin")) {
    return "staging";
  }
  if (location.includes("live")) {
    return "production";
  }
};

/**
 *
 * @param root The root of the URL, e.g. rootURLs.production.web
 * @param type The documnt type, e.g. "venue"
 * @returns The URL based on the document type and environment
 */
export const getPath = (root: string, type: string): string => {
  return `${root}${paths[type] ? `/${paths[type]}` : ""}`;
};

export const getPreviewUrl = (type: string, slug: string = ""): string => {
  const environment = getEnvironment();
  const root = rootURLs[environment].web;
  return getPath(root, type) + "/" + slug;
};
