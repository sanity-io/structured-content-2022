export default {
  name: "person",
  title: "Person",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "title",
      title: "Proffesional title",
      type: "string",
    },
    {
      name: "photo",
      type: "image",
    },
    {
      name: "social",
      type: "object",
      title: "Social media",
      fields: [
        {
          name: "twitter",
          type: "string",
          title: "Twitter",
        },
      ],
    },
    {
      name: "bio",
      type: "array",
      title: "Bio",
      of: [
        {
          type: "block",
        },
      ],
    },
  ],
};
