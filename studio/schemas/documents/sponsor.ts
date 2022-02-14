import { PresentationIcon } from "@sanity/icons";

export default {
  name: "sponsor",
  title: "Sponsors",
  type: "document",
  icon: PresentationIcon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "sponsorship",
      title: "Sponsorship",
      type: "reference",
      to: [{ type: "sponsorship" }],
    },
  ],
};
