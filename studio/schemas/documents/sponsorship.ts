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
          {
            title: "Logo + link on conference website",
            value: "Logo + link on conference website",
          },
          {
            title: "Logo + link on conference website - Premium location",
            value: "Logo + link on conference website - Premium location",
          },
          {
            title: "Social media mention - Group post",
            value: "Social media mention - Group post",
          },
          {
            title: "Social media mention - Dedicated post",
            value: "Social media mention - Dedicated post",
          },
          { title: "On-stage mention", value: "On-stage mention" },
          { title: "Virtual booth", value: "Virtual booth" },
          {
            title: "Sizzle reel spot - Before keynote & 1 talk of choice",
            value: "Sizzle reel spot - Before keynote & 1 talk of choice",
          },
          {
            title: "Sizzle reel spot - Before 1 talk of choice",
            value: "Sizzle reel spot - Before 1 talk of choice",
          },
          {
            title: "Sponsor a talk of your choice",
            value: "Sponsor a talk of your choice",
          },
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
