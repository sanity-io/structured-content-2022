import { CreditCardIcon } from "@sanity/icons";

const offeringBenefits = [
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
];

export default {
  name: "sponsorship",
  title: "Sponsorships",
  type: "document",
  icon: CreditCardIcon,
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
      of: [{ type: "reference", to: [{ type: "sponsor" }] }],
      validation: (Rule) => [
        Rule.unique(),
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
      name: "benefits",
      type: "array",
      title: "Benefits",
      of: [
        {
          type: "object",
          name: "benefit",
          title: "Benefit",
          preview: {
            select: {
              name: "benefit.name",
              number: "number",
              description: "description",
            },
            prepare({ name, number, description = "" }) {
              return {
                title: name,
                subtitle: `${number ? number : "☑️"} ${description}`,
              };
            },
          },
          fields: [
            {
              name: "benefit",
              title: "Benefit",
              type: "reference",
              to: [{ type: "benefit" }],
            },
            {
              name: "number",
              title: "Number",
              type: "number",
              validation: (Rule) => Rule.min(0),
              description:
                "Specify number. Use 0 or remove this item to disable this benefit. Leave blank for ☑️.",
            },
            {
              name: "description",
              title: "Description",
              type: "string",
              description: "Add unit of measure, or other tiny clarifycations.",
            },
          ],
        },
      ],
    },
  ],
};
