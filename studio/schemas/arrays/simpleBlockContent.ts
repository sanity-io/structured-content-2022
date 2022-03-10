export default {
  name: "simpleBlockContent",
  title: "Simple Block Content",
  type: "array",
  of: [
    {
      type: "block",
      marks: {
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
