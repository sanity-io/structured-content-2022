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
      description: "/articles/:slug",
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
      name: "updatedAt",
      type: "datetime",
      title: "Updated at",
      description:
        'Intentionally set the "updated at" date for meaningfull changes. Will also signal freshness to Google etc. ',
    },
    {
      name: "authors",
      type: "array",
      title: "Authors",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
        },
      ],
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
    {
      name: "relatedTo",
      type: "object",
      title: "Related to",
      description: "Related to",
      fields: [
        {
          name: "sessions",
          type: "array",
          validation: (Rule) => Rule.unique(),
          title: "Sessions",
          of: [
            {
              type: "reference",
              to: [{ type: "session" }],
            },
          ],
        },
        {
          name: "venues",
          type: "array",
          validation: (Rule) => Rule.unique(),
          title: "Venues",
          of: [
            {
              type: "reference",
              to: [{ type: "venue" }],
            },
          ],
        },
        {
          name: "people",
          type: "array",
          validation: (Rule) => Rule.unique(),
          title: "People",
          of: [
            {
              type: "reference",
              to: [{ type: "person" }],
            },
          ],
        },
      ],
    },
  ],
};
