import { toPlainText } from "@portabletext/react";
import { BillIcon } from "@sanity/icons";
import { compareAsc, parseISO } from "date-fns";

export default {
  name: "ticket",
  title: "Tickets",
  type: "document",
  icon: BillIcon,
  preview: {
    select: {
      title: "type",
      priceAndAvailability: "priceAndAvailability",
    },
    prepare({ title, priceAndAvailability }) {
      const findCurrentPrice = priceAndAvailability?.reduce((acc, current) => {
        const fromDate = parseISO(current.from);
        const currentDate = new Date();
        // Check if current date is before the from date
        if (compareAsc(currentDate, fromDate) == 1) {
          return current;
        }
        return acc;
      }, priceAndAvailability[0]);
      return {
        title,
        subtitle: [
          `Current price: $${findCurrentPrice?.price}`,
          findCurrentPrice?.label,
        ]
          .filter(Boolean)
          .join(" - "),
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
      name: "priceAndAvailability",
      title: "Price and availability",
      type: "array",
      description:
        "Add a price and availability. If you don't add a price, the ticket will be free.",
      of: [
        {
          name: "available",
          title: "Available from-to",
          type: "object",
          description:
            "If no other date slot comes after, then the event date will be used as the final ticket date",
          preview: {
            select: {
              price: "price",
              from: "from",
              label: "label",
            },
            prepare({ price, from, label }) {
              return {
                title: "$" + price,
                subtitle: [new Date(from).toLocaleDateString(), label]
                  .filter(Boolean)
                  .join(" - "),
              };
            },
          },
          fields: [
            {
              name: "price",
              title: "Price",
              type: "number",
              description: "Price in USD",
            },
            {
              name: "from",
              title: "Available from",
              type: "datetime",
              validation: (Rule) => [
                Rule.required(),
                Rule.custom((value, context) => {
                  // find the index with this current value
                  const { priceAndAvailability } = context?.document;
                  const currentDate = parseISO(value);
                  const index = priceAndAvailability.findIndex(
                    ({ from }) => from === value
                  );
                  const previousDate = parseISO(
                    priceAndAvailability[index - 1]?.from
                  );
                  if (!previousDate) {
                    return true;
                  }
                  if (compareAsc(currentDate, previousDate) === -1) {
                    return "Date must be after previous date";
                  }

                  return true;
                }),
              ],
              description:
                "This ticket is available to purchase from this date",
            },
            {
              name: "label",
              type: "string",
              title: "Ticket price label (optional)",
              description: 'For example: "Early bird"',
            },
          ],
        },
      ],
    },
    {
      name: "description",
      title: "Description",
      type: "simpleBlockContent",
    },
    {
      name: "included",
      type: "array",
      validation: (Rule) => [Rule.unique()],
      of: [
        {
          type: "string",
        },
      ],
      options: {
        list: [
          {
            title: "Recordings after the event",
            value: "Recordings after the event",
          },
          {
            title: "Access to the conference community",
            value: "Access to the conference community",
          },
          { title: "Live-streamed sessions", value: "Live-streamed sessions" },
          { title: "Virtual networking", value: "Virtual networking" },
          {
            title: "Access to in-person event",
            value: "Access to in-person event",
          },
          {
            title: "Access to in-person networking",
            value: "Access to in-person networking",
          },
          { title: "Swag kit", value: "Swag kit" },
          { title: "Workshop", value: "Workshop" },
        ],
      },
    },
  ],
};
