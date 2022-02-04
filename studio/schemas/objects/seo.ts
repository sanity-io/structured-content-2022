export default {
  name: "seo",
  type: "object",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "description", type: "string", title: "Description" },
    { name: "image", type: "figure", title: "Image" },
    { name: "imageAlt", type: "figure", title: "ImageAlt" },
    { name: "siteName", type: "string", title: "SiteName" },
    { name: "type", type: "string", title: "Type" },
    { name: "url", type: "string", title: "Url" },
    { name: "audio", type: "string", title: "Audio" },
    { name: "determiner", type: "string", title: "Determiner" },
    { name: "locale", type: "string", title: "Locale" },
    { name: "video", type: "string", title: "Video" },
    { name: "videoType", type: "string", title: "VideoType" },
  ],
};
