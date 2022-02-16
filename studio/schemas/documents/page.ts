import { DocumentIcon } from "@sanity/icons";
import * as sections from "../objects";
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
      name: "internalName",
      title: "Interal name",
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
        ...Object.keys(sections).map((type) => ({ type })),
        {
          type: "reference",
          to: [{ type: "sharedSections" }],
        },
      ],
    },
  ],
};
