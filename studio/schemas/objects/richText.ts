import { EditIcon } from "@sanity/icons";
import { toPlainText } from "@portabletext/react";
export default {
  name: "richText",
  type: "object",
  title: "Rich text",
  icon: EditIcon,
  preview: {
    select: {
      heading: "heading",
      content: "content",
    },
    prepare({ heading, content }) {
      return {
        title: toPlainText(content) || heading,
        subtitle: "Rich text",
      };
    },
  },
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
    },
  ],
};
