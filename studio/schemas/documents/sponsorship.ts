import { PackageIcon } from "@sanity/icons";

export default {
  name: "sponsorship",
  title: "Sponsorships",
  type: "document",
  icon: PackageIcon,
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
  ],
};
