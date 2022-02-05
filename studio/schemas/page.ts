import { DocumentIcon } from "@sanity/icons";
export default {
  name: "page",
  title: "Pages",
  type: "document",
  icon: DocumentIcon,
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
      ],
    },
  ],
};
