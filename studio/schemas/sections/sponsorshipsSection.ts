export default {
  name: "sponsorshipsSection",
  type: "object",
  title: "Sponsorships section",
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
          { title: "All sponsorships", value: "all" },
          { title: "Highlighted sponsorships", value: "highlighted" },
          { title: "No sponsorships", value: "none" },
        ],
      },
    },
    {
      name: "sponsorships",
      type: "array",
      title: "Sponsorhips",
      hidden: ({ parent }) => parent?.type !== "highlighted",
      of: [
        {
          type: "reference",
          to: [{ type: "sponsorship" }],
          options: {
            // Just include people that's part of a session, and that hasn't been selected already
            filter: ({ parent }) => ({
              filter:
                '_id in *[_type == "event"].sponsorships[]._ref && !(_id in $current)',
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
