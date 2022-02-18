import { ImageIcon } from "@sanity/icons";
export default {
  name: "figure",
  title: "Figure",
  type: "image",
  icon: ImageIcon,
  description: "An image with alternative text and an optional caption",
  options: {
    hotspot: true,
  },
  fields: [
    {
      name: "alt",
      title: "Alternative text",
      type: "string",
      description: "Describe the image as you would to someone over the phone.",
    },
    {
      name: "caption",
      type: "string",
    },
  ],
};
