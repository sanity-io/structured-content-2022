export default {
  name: "page",
  title: "Page",
  type: "document",
  preview: {
    select: {
      title: "internalTitle",
    },
  },
  fields: [
    {
      name: "internalTitle",
      title: "Interal title",
      type: "string",
      description: "For internal use.",
    },
    {
      name: "name",
      title: "Page name",
      type: "string",
      description: "This will be the editorial headline of the page.",
    },
    {
      name: "sections",
      type: "array",
      title: "Sections",
      of: [
        {
          name: "richText",
          type: "object",
          title: "Rich text",
          fields: [
            {
              name: "content",
              type: "array",
              of: [
                {
                  type: "block",
                },
              ],
            },
          ],
        },
        {},
      ],
    },
  ],
};
