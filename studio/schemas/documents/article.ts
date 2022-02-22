import { DocumentsIcon } from "@sanity/icons";

export default {
  name: "article",
  title: "Editorial Articles",
  type: "document",
  icon: DocumentsIcon,
  preview: {
    select: {
      title: "heading",
      subtitle: "slug.current",
      media: "mainImage",
    },
  },
  fields: [
    {
      name: "heading",
      title: "Heading",
      type: "string",
      description: "This will be the heading of the article",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      description: "/article/:slug",
      options: {
        source: "heading",
      },
    },
    {
      name: "publishedAt",
      type: "datetime",
      title: "Publish time",
      description:
        "Publish date for this article. This article should be hidden if no date is set.",
    },
    {
      name: "mainImage",
      type: "figure",
      title: "Main image",
    },
    {
      name: "summary",
      type: "text",
      title: "Summary",
      description:
        "Used to preview the article content (on Google, social media etc).",
      validation: (Rule) => [
        Rule.max(150).warning(
          "You should keep this under 150 characters to keep it easily scannable."
        ),
        Rule.required(),
      ],
    },
    {
      name: "content",
      title: "Content",
      type: "blockContent",
    },
  ],
};
