export default {
  name: "venuesSection",
  type: "object",
  title: "Venues section",
  fields: [
    {
      name: "type",
      type: "string",
      title: "Section type",
      description: "",
      options: {
        list: [
          { title: "All venues", value: "all" },
          { title: "Highlighted venues", value: "highlighted" },
          { title: "No venues", value: "none" },
        ],
      },
    },
    {
      name: "venues",
      type: "array",
      title: "Venues",
      hidden: ({ parent }) => parent?.type !== "highlighted",
      of: [
        {
          type: "reference",
          to: [{ type: "venue" }],
          options: {
            // Just include venues that's part of an event, and that hasn't been selected already
            filter: ({ parent }) => ({
              filter:
                '_id in *[_type == "event"].venues[]._ref && !(_id in $current)',
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
