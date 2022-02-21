export default {
  name: "spec",
  type: "document",
  title: "Content Specification Sheet",
  fields: [
    {
      name: "references",
      type: "object",
      fields: [
        {
          name: "type",
          type: "string",
          options: {
            list: [
              { value: "session", title: "Session" },
              { value: "person", title: "Person" },
              { value: "article", title: "Article" },
              { value: "sponsor", title: "Sponsor" },
              { value: "sponsorship", title: "Sponsorship" },
              { value: "ticket", title: "Ticket" },
              { value: "venue", title: "Venue" },
            ],
          },
        },
        {
          name: "route",
          type: "reference",
          to: [{ type: "route" }],
        },
      ],
    },
    {
      name: "audience",
      type: "text",
    },
    {
      name: "topTask",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "businessGoal",
      type: "text",
    },
    {
      name: "fields",
      type: "array",
      of: [
        {
          type: "object",
          preview: {
            select: {
              type: "type",
              field: "field",
              validation: "validation",
              sample: "sample",
            },
            prepare({ type = "", field = "", validation = "", sample = "" }) {
              return {
                title: `${type} - ${field} - ${validation}`,
                subtitle: sample,
              };
            },
          },
          fields: [
            {
              name: "type",
              type: "string",
            },
            {
              name: "field",
              type: "string",
            },
            {
              name: "validation",
              type: "string",
            },
            {
              name: "sample",
              type: "text",
            },
          ],
        },
      ],
    },
  ],
};
