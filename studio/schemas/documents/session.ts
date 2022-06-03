import { PresentationIcon } from "@sanity/icons";

export default {
  name: "session",
  title: "Sessions",
  type: "document",
  preview: {
    select: {
      title: "title",
      internalName: "internalName",
      duration: "duration",
    },
    prepare({ title = "", internalName = "", duration = 0 }) {
      return {
        title: [internalName, title].filter(Boolean).join(" - "),
        subtitle: `${duration} minutes`,
      };
    },
  },
  icon: PresentationIcon,
  fields: [
    {
      name: "internalName",
      title: "Internal Session Name",
      type: "string",
    },
    {
      name: "title",
      title: "Session title",
      type: "string",
    },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "publishedAt",
      type: "datetime",
      title: "Publish time",
      description:
        "Publish date for this session. The type string can be used as an placeholder before this date. This details of this session should be hidden if no date is set.",
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
      name: "videoURL",
      type: "url",
      title: "URL to recording",
      description: "URL to YouTube, Vimeo etc",
    },
    {
      name: "slideURL",
      type: "url",
      title: "URL to slide-deck",
      description: "URL to SlideShare, Google Slides etc",
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
    {
      name: "sponsoredBy",
      title: "Sponsored by",
      type: "array",
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: "reference",
          title: "Sponsor",
          to: [{ type: "sponsor" }],
          option: {
            // Filter out if the sponsorship is already in the event
            filter: ({ parent }) => ({
              filter: "!(_id in $current)",
              params: {
                current: parent?.map(({ _ref }) => _ref),
              },
            }),
          },
        },
      ],
    },
  ],
};
