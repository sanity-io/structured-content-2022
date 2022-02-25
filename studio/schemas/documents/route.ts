import { LinkIcon } from "@sanity/icons";

export default {
  name: "route",
  type: "document",
  title: "Routes",
  icon: LinkIcon,
  preview: {
    select: {
      title: "seo.title",
      subtitle: "internalName",
    },
  },
  groups: [
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    {
      name: "internalName",
      type: "string",
      title: "Internal name",
      description: "Used to identify a route ",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "seo.title",
      },
    },
    {
      name: "page",
      type: "reference",
      title: "Page",
      to: [{ type: "page" }, { type: "article" }],
    },
    {
      name: "seo",
      type: "seo",
      title: "Metadata",
      description: "For Search Engine Optimization",
      group: "seo",
    },
  ],
};
