import { ArrowRightIcon } from "@sanity/icons";

export default {
  name: "simpleCallToAction",
  type: "object",
  title: "Simple Call To Action",
  icon: ArrowRightIcon,
  fields: [
    {
      name: "text",
      type: "string",
      title: "Text",
    },
    {
      name: "link",
      type: "link",
      title: "Link",
    },
  ],
};
