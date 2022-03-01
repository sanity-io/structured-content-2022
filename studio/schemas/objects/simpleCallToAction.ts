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
      hidden: ({ parent }) => !parent.url && parent.reference,
      validation: (Rule) =>
        Rule.regex(/(?<=utm_[a-z]+=)\w+/).info(
          "You might want to include UTM tags."
        ),
    },
    {
      name: "reference",
      type: "reference",
      title: "Reference",
      hidden: ({ parent }) => !parent.reference && parent.url,
      to: [{ type: "route" }],
    },
  ],
};
