export default {
  name: "programsSection",
  type: "object",
  title: "Programs section",
  fields: [
    {
      name: "heading",
      type: "string",
      title: "Section heading",
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
          { title: "All programs", value: "all" },
          { title: "Highlighted programs", value: "highlighted" },
          { title: "No programs", value: "none" },
        ],
      },
    },
    {
      name: "programs",
      type: "array",
      title: "programs",
      hidden: ({ parent }) => parent?.type !== "highlighted",
      of: [
        {
          type: "reference",
          to: [{ type: "program" }],
          options: {
            // Just include programs that's part of an event, and that hasn't been selected already
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
