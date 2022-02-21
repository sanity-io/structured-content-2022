export default {
  name: "mailchimp",
  type: "object",
  title: "Mailchimp",
  description: "A form for subscribing to a Mailchimp list",
  preview: {
    select: {
      heading: "heading",
      subheading: "subheading",
    },
    prepare({ heading, subheading }) {
      return {
        title: heading || subheading,
        subtitle: "Mailchimp",
      };
    },
  },
  fields: [
    {
      name: "heading",
      type: "string",
    },
    {
      name: "subheading",
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
