export default {
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    {
      name: "internalName",
      title: "Internal name",
      type: "string",
    },
    {
      name: "slug",
      type: "slug",
      title: "Navigation slug",
      description: "Used to identify this navigation",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "items",
      type: "array",
      title: "Navigation items",
      of: [
        {
          type: "navigation.item",
        },
      ],
    },
  ],
};
