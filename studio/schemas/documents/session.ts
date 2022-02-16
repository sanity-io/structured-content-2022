import { RestoreIcon } from "@sanity/icons";

export default {
  name: "session",
  title: "Sessions",
  type: "document",
  icon: RestoreIcon,
  fields: [
    {
      name: "title",
      title: "Session title",
      type: "string",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "events",
      type: "array",
      title: "Events",
      description: "Which event(s) this session is part of",
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: "reference",
          to: [{ type: "event" }],
        },
      ],
    },
    {
      name: "type",
      type: "string",
      title: "Type",
      description: "The type of session",
      initialValue: "talk",
      options: {
        list: [
          { value: "talk", title: "Talk" },
          { value: "panel", title: "Panel" },
          { value: "break", title: "Break" },
          { value: "social", title: "Social" },
          { value: "workshop", title: "Workshop" },
        ],
      },
    },
    {
      name: "location",
      type: "reference",
      to: [{ type: "venue" }],
    },
    {
      name: "startTime",
      title: "Start time",
      type: "datetime",
      description: "Use Pacific timezone",
    },
    {
      name: "duration",
      title: "Duration",
      type: "number",
      description: "Duration in minutes",
    },
    {
      name: "shortDescription",
      title: "Short description",
      type: "simpleBlockContent",
    },
    {
      name: "longDescription",
      title: "Long description",
      type: "blockContent",
    },
    {
      name: "speakers",
      title: "Speakers",
      type: "array",
      of: [
        {
          type: "object",
          preview: {
            select: {
              title: "person.name",
              subtitle: "role",
              media: "person.photo",
            },
          },
          fields: [
            {
              name: "person",
              type: "reference",
              to: [{ type: "person" }],
            },
            {
              name: "role",
              title: "Role",
              type: "string",
              initialValue: "speaker",
              options: {
                list: [
                  { title: "Speaker", value: "speaker" },
                  { title: "Moderator", value: "moderator" },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
};
