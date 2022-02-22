import { toPlainText } from "@portabletext/react";
export default {
  name: "articleSection",
  title: "Article",
  type: "object",
  preview: {
    select: {
      heading: "heading",
      subheading: "subheading",
      content: "content",
    },
    prepare({ heading, subheading, content = [] }) {
      return {
        title: heading || subheading || toPlainText(content),
        subtitle: "Rich text",
      };
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
      name: "content",
      type: "simpleBlockContent",
      title: "Content",
    },
  ],
};
