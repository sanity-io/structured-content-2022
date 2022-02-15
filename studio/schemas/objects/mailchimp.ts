export default {
  name: "mailchimp",
  type: "object",
  title: "Mailchimp",
  preview: {
    select: {
      title: "title",
      subtitle: "tagline",
    },
  },
  fields: [
    {
      name: "title",
      type: "string",
    },
    {
      name: "buttonText",
      type: "string",
    },
    {
      name: "id",
      type: "string",
      title: "Mailchimp ID",
    },
  ],
};
