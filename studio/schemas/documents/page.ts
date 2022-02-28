import { DocumentIcon, SyncIcon } from "@sanity/icons";
import * as sections from "../sections";
export default {
  name: "page",
  title: "Pages",
  type: "document",
  icon: DocumentIcon,
  groups: [
    {
      title: "Hero",
      name: "hero",
    },
    {
      title: "Sections",
      name: "sections",
    },
  ],
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
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      fields: [
        {
          name: "heading",
          title: "Hero heading",
          type: "string",
          description: "This will be the editorial headline of the page.",
        },
        {
          name: "summary",
          title: "Hero summary",
          type: "text",
          validation: (Rule) =>
            Rule.max(315).warning("Keep it short and sweet!"),
        },
        {
          name: "callToAction",
          title: "Hero call to action",
          type: "simpleCallToAction",
        },
      ],
    },
    {
      name: "sections",
      group: "sections",
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
