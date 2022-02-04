export default {
  name: "figure",
  title: "Figure",
  type: "image",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the image as you would to someone over the phone.",
    },
    {
      name: "caption",
      type: "string",
    },
  ],
};
