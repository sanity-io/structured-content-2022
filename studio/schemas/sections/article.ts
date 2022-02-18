export default {
  name: "article",
  title: "Article",
  type: "object",
  preview: {
    select: {
      title: "heading",
      subtitle: "subheading",
    },
  },
  description:
    "An article-like section with heading, subheading and rich-text content",
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Heading",
    },
    {
      name: "subheading",
      type: "string",
      title: "Subheading",
    },
    {
      name: "text",
      type: "simpleBlockContent",
      title: "Text",
    },
  ],
};
