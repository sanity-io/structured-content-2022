import { UsersIcon } from "@sanity/icons";

export default {
  name: "person",
  title: "People",
  type: "document",
  icon: UsersIcon,
  preview: {
    select: {
      title: "name",
      subtitle: "social.twitter",
      media: "photo",
    },
  },
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "prononciation",
      title: "Prononciation",
      type: "string",
      description: "Let's figure out how to use this field",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "title",
      title: "Profesional title",
      type: "string",
    },
    {
      name: "company",
      title: "Company",
      type: "string",
      description: "Company or affiliation",
    },
    {
      name: "pronouns",
      type: "string",
      title: "Pronouns",
    },
    {
      name: "photo",
      type: "figure",
    },
    {
      name: "social",
      type: "object",
      title: "Social media",
      fields: [
        {
          name: "twitter",
          type: "string",
          title: "Twitter",
          validation: (Rule) =>
            Rule.regex(/^@[a-zA-Z0-9_]+$/).error('Include "@" symbol'),
          description: "Only the handle is required. (e.g. @sanity_io)",
        },
        {
          name: "linkedin",
          type: "url",
          title: "LinkedIn",
          description: "Full URL",
        },
      ],
    },
    {
      name: "bio",
      type: "array",
      title: "Bio",
      of: [
        {
          type: "block",
        },
      ],
    },
  ],
};
