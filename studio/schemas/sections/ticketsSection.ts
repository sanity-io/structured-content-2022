export default {
  name: "ticketsSection",
  type: "object",
  title: "Tickets section",
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Ticket table heading",
    },
    {
      name: "callToAction",
      type: "simpleCallToAction",
      title: "Call to action",
    },
    {
      name: "type",
      type: "string",
      title: "Section type",
      description: "",
      options: {
        list: [
          { title: "All tickets", value: "all" },
          { title: "Highlighted tickets", value: "highlighted" },
          { title: "No tickets", value: "none" },
        ],
      },
    },
    {
      name: "tickets",
      type: "array",
      title: "Tickets",
      hidden: ({ parent }) => parent?.type !== "highlighted",
      of: [
        {
          type: "reference",
          to: [{ type: "ticket" }],
          options: {
            // Just include people that's part of a session, and that hasn't been selected already
            filter: ({ parent }) => ({
              filter:
                '_id in *[_type == "event"].tickets[]._ref && !(_id in $current)',
              params: {
                current: parent?.map(({ _ref }) => _ref),
              },
            }),
          },
        },
      ],
    },
  ],
};
