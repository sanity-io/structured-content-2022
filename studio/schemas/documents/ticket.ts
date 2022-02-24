import { BillIcon } from "@sanity/icons";

export default {
  name: "ticket",
  title: "Tickets",
  type: "document",
  icon: BillIcon,
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
      name: "availableFrom",
      title: "Available form",
      type: "datetime",
      description: "This ticket is available to purchase from this date",
    },
    {
      name: "availableTo",
      title: "Available to",
      type: "datetime",
      description: "This ticket is available to purchase until this date",
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
