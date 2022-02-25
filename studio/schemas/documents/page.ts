import { DocumentIcon, SyncIcon } from "@sanity/icons";
import * as sections from "../sections";
export default {
  name: "page",
  title: "Pages",
  type: "document",
  icon: DocumentIcon,
  preview: {
    select: {
      title: "internalName",
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
        {
          type: "reference",
          title: "Shared section",
          icon: SyncIcon,
          to: [{ type: "sharedSections" }],
        },
        { type: "figure" },
        { type: "article" },
        ...Object.keys(sections).map((type) => ({ type })),
      ],
    },
  ],
};
