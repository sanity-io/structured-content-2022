export default {
  name: "sponsor",
  title: "Sponsor",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "image",
      title: "Image",
      type: "image",
    },
    {
      name: "sponsorship",
      title: "Sponsorship",
      type: "reference",
      to: [{ type: "sponsorship" }],
    },
  ],
};
