import { PackageIcon } from "@sanity/icons";

export default {
  name: "sponsorship",
  title: "Sponsorships",
  type: "document",
  icon: PackageIcon,
  fields: [
    {
      name: "type",
      title: "Sponsorship type",
      type: "string",
    },
    {
      name: "available",
      type: "number",
      title: "Available sponsorships",
      description: "Sets the upper limit of sponsors on this tier.",
      validation: (Rule) => Rule.min(0),
    },
    {
      name: "sponsors",
      type: "array",
      title: "Sponsors",
      of: [{ type: "sponsor" }],
      validation: (Rule) => [
        Rule.unique(),
        Rule.min(1),
        Rule.max(Rule.valueOfField("available")),
      ],
    },
    {
      name: "price",
      type: "number",
      title: "Price",
      description: "USD ($)",
      validation: (Rule) => Rule.min(0),
    },
    {
      name: "offering",
      type: "array",
      title: "Offering",
      options: {
        list: [
          { title: "Logo + link on conference website", value: "logoLink" },
          {
            title: "Logo + link on conference website - Premium location",
            value: "premiumLocation",
          },
          { title: "Social media mention", value: "soMeMention" },
          {
            title: "Social media mention - Dedicated post",
            value: "soMeMentionDedicated",
          },
          { title: "On-stage mention", value: "onStageMention" },
          { title: "Virtual booth", value: "virtualBooth" },
          { title: "Sizzle reel spot", value: "sizzleReelSpot" },
        ],
      },
      of: [
        {
          type: "string",
        },
      ],
    },
    {
      name: "passes",
      type: "object",
      title: "Included passes",
      options: {
        columns: 3,
      },
      fields: [
        {
          name: "online",
          type: "number",
          title: "Online passes",
          validation: (Rule) => Rule.min(0),
        },
        {
          name: "inPerson",
          type: "number",
          title: "In-person passes",
          validation: (Rule) => Rule.min(0),
        },
        {
          name: "workshop",
          type: "number",
          title: "Workshop passes",
          validation: (Rule) => Rule.min(0),
        },
      ],
    },
  ],
};
