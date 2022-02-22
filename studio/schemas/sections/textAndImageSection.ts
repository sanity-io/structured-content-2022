import { toPlainText } from "@portabletext/react";
export default {
  name: "textAndImageSection",
  title: "Text and Image",
  type: "object",
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "image",
      text: "text",
    },
    prepare({ title, subtitle, text = [], media }) {
      return {
        title: title || subtitle || toPlainText(text),
        subtitle: "Text and image",
        media,
      };
    },
  },
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "tagline",
      type: "string",
    },
    {
      name: "text",
      type: "simpleBlockContent",
    },
    {
      name: "image",
      type: "figure",
    },
  ],
};
