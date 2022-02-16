import * as sections from "../objects";

export default {
  name: "sharedSections",
  title: "Shared Sections",
  type: "document",
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
      title: "Section name",
      type: "string",
      description: "This will be the editorial headline of the section.",
    },
    {
      name: "sections",
      type: "array",
      title: "Sections",
      of: Object.keys(sections).map((type) => ({ type })),
    },
  ],
};
