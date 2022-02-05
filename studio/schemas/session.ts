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
