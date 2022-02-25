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
