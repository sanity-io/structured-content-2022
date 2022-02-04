export default {
  name: "venue",
  title: "Venues",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "geolocation",
      title: "Geographical Location",
      type: "geopoint",
    },
  ],
};
