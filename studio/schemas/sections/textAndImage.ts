export default {
  name: "textAndImage",
  title: "Text and Image",
  type: "object",
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "image",
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
