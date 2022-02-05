import { UsersIcon } from "@sanity/icons";

export default {
  name: "person",
  title: "People",
  type: "document",
  icon: UsersIcon,
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "title",
      title: "Profesional title",
      type: "string",
    },
    {
      name: "photo",
      type: "image",
    },
    {
      name: "social",
      type: "object",
      title: "Social media",
      fields: [
        {
          name: "twitter",
          type: "string",
          title: "Twitter",
        },
      ],
    },
    {
      name: "bio",
      type: "array",
      title: "Bio",
      of: [
        {
          type: "block",
        },
      ],
    },
  ],
};
