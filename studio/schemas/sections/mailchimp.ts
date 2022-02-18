export default {
  name: "mailchimp",
  type: "object",
  title: "Mailchimp",
  description: "A form for subscribing to a Mailchimp list",
  preview: {
    select: {
      title: "heading",
      subtitle: "tagline",
    },
  },
  fields: [
    {
      name: "heading",
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
