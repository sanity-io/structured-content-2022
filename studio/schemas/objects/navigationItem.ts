export default {
  name: "navigation.item",
  type: "object",
  title: "Navigation item",
  fields: [
    {
      title: "Navigation label",
      name: "label",
      type: "string",
      description: "Overrides the route's title",
    },
    {
      title: "Navigation target",
      name: "target",
      type: "link",
    },
  ],
};
