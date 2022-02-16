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
      name: "url",
      type: "url",
      title: "Call to Action URL",
      description: "The target URL.",
      hidden: ({ document }) => !document.url && document.reference,
      validation: (Rule) =>
        Rule.regex(/(?<=utm_[a-z]+=)\w+/).warning(
          "You might want to include UTM tags."
        ),
    },
    {
      name: "reference",
      type: "reference",
      title: "Reference",
      hidden: ({ document }) => !document.reference && document.url,
      to: [{ type: "route" }],
    },
  ],
};
