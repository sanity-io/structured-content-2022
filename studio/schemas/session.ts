export default {
  name: "session",
  title: "Session",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "location",
      type: "reference",
      to: [{ type: "venue" }],
    },
  ],
};
