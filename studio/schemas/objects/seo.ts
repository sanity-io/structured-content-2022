export default {
  name: "seo",
  type: "object",
  fields: [
    ...[
      { name: "title", type: "string", title: "Title" },
      { name: "description", type: "string", title: "Description" },
    ].map((field) => ({ ...field, validation: (Rule) => Rule.required() })),
    {
      name: "image",
      type: "figure",
      title: "Image",
      description: "Override the automatically generated SEO image",
    },
    {
      name: "noIndex",
      type: "boolean",
      title: "Hide this route from search engines",
      description: "This route will not be indexed by search engines",
    },
  ],
};
