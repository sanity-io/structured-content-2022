import { PinIcon } from "@sanity/icons";

export default {
  name: "venue",
  title: "Venues",
  type: "document",
  icon: PinIcon,
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
