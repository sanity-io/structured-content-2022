export default {
  name: "simpleBlockContent",
  title: "Simple Block Content",
  type: "array",
  of: [
    {
      type: "block",
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "link",
          },
        ],
      },
    },
    {
      type: "simpleCallToAction",
    },
  ],
};
