import { BlockElementIcon } from "@sanity/icons";

import * as sections from "../sections";

export default {
  name: "sharedSections",
  title: "Shared Sections",
  type: "document",
  icon: BlockElementIcon,
  preview: {
    select: {
      title: "internalName",
      sections: "sections",
    },
    prepare({ title, sections }) {
      return {
        title,
        subtitle: sections.length
          ? sections.map(({ _type }) => _type).join(", ")
          : undefined,
      };
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
      name: "sections",
      type: "array",
      title: "Sections",
      of: [
        { type: "figure" },
        ...Object.keys(sections).map((type) => ({ type })),
      ],
    },
  ],
};
