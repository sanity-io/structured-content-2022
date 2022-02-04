export default {
  name: "ticket",
  title: "Tickets",
  type: "document",
  preview: {
    select: {
      title: "type",
      subtitle: "price",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? `$${subtitle}` : "Price is missing",
      };
    },
  },
  fields: [
    {
      name: "type",
      title: "Ticket type",
      type: "string",
    },
    {
      name: "price",
      title: "Price",
      type: "number",
      description: "Price in USD",
    },
    {
      name: "included",
      type: "array",
      of: [
        {
          type: "string",
        },
      ],
      options: {
        list: [
          {
            title: "Workshop",
            value: "workshop",
          },
          {
            title: "Recordings",
            value: "recordings",
          },
        ],
      },
    },
  ],
};
