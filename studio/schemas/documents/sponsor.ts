import { HeartFilledIcon } from "@sanity/icons";

export default {
  name: "sponsor",
  title: "Sponsors",
  type: "document",
  icon: HeartFilledIcon,
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "url",
      type: "url",
      title: "URL",
      description: "Main URL of the sponsor",
    },
    {
      name: "callToActionURL",
      type: "url",
      title: "Call to Action URL",
      description:
        "The sponsor's target URL for where they want to direct people to.",
      validation: (Rule) =>
        Rule.regex(/utm_[a-z]+=\w+/).warning(
          "Remember to ask this sponsor if they want to include UTM tags."
        ),
    },
    {
      name: "image",
      title: "Image",
      type: "figure",
      description: "Preferably SVG, and the monochrome version of the logo",
    },
  ],
};
