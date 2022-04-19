export default {
  name: "sponsorsSection",
  type: "object",
  title: "Sponsors section",
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
          { title: "All sponsors", value: "all" },
          { title: "Highlighted sponsors", value: "highlighted" },
          { title: "No sponsors", value: "none" },
        ],
      },
    },
    {
      name: "sponsors",
      type: "array",
      title: "sponsor",
      hidden: ({ parent }) => parent?.type !== "highlighted",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsor" }],
          options: {
            // Just include people that's part of a session, and that hasn't been selected already
            filter: ({ parent }) => ({
              filter: "!(_id in $current)",
              params: {
                current: parent?.map(({ _ref }) => _ref),
              },
            }),
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "type",
    },
  },
};
