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
  ],
};
