export default {
  name: "richText",
  type: "object",
  title: "Rich text",
  preview: {
    select: {
      title: "content", // <= You can preview Portable Text here without a `prepare` function
    },
    /* prepare({ title }) {
      return {
        title, // <= This will error
      };
    }, */
  },
  fields: [
    {
      name: "content",
      type: "simpleBlockContent",
    },
  ],
};
