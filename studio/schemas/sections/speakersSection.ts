export default {
  name: "speakersSection",
  type: "object",
  title: "Speakers section",
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
          { title: "All speakers", value: "all" },
          { title: "Highlighted speakers", value: "highlighted" },
          { title: "No speakers", value: "none" },
        ],
      },
    },
    {
      name: "speakers",
      type: "array",
      title: "Speakers",
      hidden: ({ parent }) => parent?.type !== "highlighted",
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
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
};
