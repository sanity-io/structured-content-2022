const typeOptions = [
  { title: "All sessions", value: "all" },
  { title: "Highlighted sessions", value: "highlighted" },
  { title: "No sessions", value: "none" },
];

export default {
  name: "sessionsSection",
  type: "object",
  title: "Sessions section",
  preview: {
    select: {
      type: "type",
    },
    prepare({ type }) {
      return {
        title: typeOptions.find(({ value }) => value === type)?.title,
        subtitle: "Sessions section",
      };
    },
  },
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
        list: typeOptions,
      },
    },
    {
      name: "sessions",
      type: "array",
      title: "Sessions list",
      hidden: ({ parent }) => parent?.type !== "highlighted",
      of: [
        {
          type: "reference",
          to: [{ type: "session" }],
          options: {
            // Just include people that's part of a session, and that hasn't been selected already
            filter: ({ parent }) => ({
              filter: "events != null && !(_id in $current)",
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
