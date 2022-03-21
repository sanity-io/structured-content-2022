import { CalendarIcon } from "@sanity/icons";

export default {
  name: "event",
  title: "Events",
  type: "document",
  icon: CalendarIcon,
  groups: [
    {
      name: "messaging",
      title: "Messaging",
    },
    {
      name: "practical",
      title: "Practical",
    },
  ],
  fields: [
    {
      name: "name",
      type: "string",
      title: "Event name",
      group: "messaging",
    },
    {
      name: "logo",
      type: "image",
      title: "Logo",
      group: "messaging",
    },
    {
      name: "type",
      type: "string",
      title: "Event type",
      group: "practical",
      options: {
        list: [
          { title: "Workshop", value: "workshop" },
          { title: "Conference", value: "conference" },
          { title: "Meetup", value: "meetup" },
          { title: "Webinar", value: "webinar" },
        ],
      },
    },
    {
      name: "tagline",
      type: "string",
      title: "Tagline",
      group: "messaging",
    },
    {
      name: "description",
      type: "text",
      title: "Description",
      group: "messaging",
    },
    {
      name: "valueProposition",
      type: "simpleBlockContent",
      title: "Value proposition",
      description: "Why should anyone attend this event?",
      group: "messaging",
    },
    {
      name: "startDate",
      type: "datetime",
      title: "Start date",
      group: "practical",
    },
    {
      name: "endDate",
      type: "datetime",
      title: "End date",
      group: "practical",
    },
    {
      name: "promotedSpeakers",
      type: "array",
      title: "Promoted speakers",
      description: "Speakers that are featured in the event",
      group: "practical",
      validiation: (Rule) => Rule.unique(),
      of: [
        {
          type: "reference",
          to: [{ type: "person" }],
        },
      ],
    },
    {
      name: "venues",
      type: "array",
      title: "Venue(s)",
      description: "Venues where the event will take place",
      group: "practical",
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: "reference",
          to: [{ type: "venue" }],
        },
      ],
    },
    {
      name: "sponsorships",
      type: "array",
      title: "Sponsorships(s)",
      description:
        "Sponsorship packages for the event. Remember to put them in an intentional order",
      group: "practical",
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: "reference",
          to: [{ type: "sponsorship" }],
          options: {
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
    {
      name: "registrationUrl",
      type: "url",
      title: "Registration URL",
      group: "practical",
      description: "URL to the event registration page (Hopin, Zoom, etc.)",
    },
    {
      name: "tickets",
      type: "array",
      title: "Ticket(s)",
      description:
        "Tickets for the event. Remember to put them in an intentional order",
      group: "practical",
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: "reference",
          to: [{ type: "ticket" }],
          options: {
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
    /**
     * We're keeping this code because we might want to use it later.
     */
    /* {
      name: "microcopy",
      type: "array",
      title: "Microcopy",
      description:
        "A list of microcopy sentences that will be displayed on the event page",
      group: "messaging",
      of: [
        {
          type: "object",
          preview: {
            select: {
              title: "text",
              subtitle: "key",
            },
          },
          fields: [
            {
              name: "key",
              type: "string",
              title: "Key",
              hidden: true, // still a bit undeciced if we should use this
              validation: (Rule) => [
                Rule.required(),
                // Regex for no spaces, no special characters, no numbers
                Rule.custom(
                  (value) =>
                    /^[a-zA-Z0-9]+$/.test(value) || "Key must be alphanumeric"
                ),
              ],
              description: "Used to identify the microcopy in code",
            },
            {
              name: "text",
              type: "text",
              title: "Text",
              description: "The user-facing text",
            },
            {
              name: "action",
              type: "string",
              title: "Action",
              description:
                "The action, if any, that will be taken when the user clicks the microcopy.",
            },
            {
              name: "related",
              type: "reference",
              title: "Related",
              to: [
                { type: "route" },
                { type: "sponsor" },
                { type: "sponsorship" },
                { type: "ticket" },
                { type: "article" },
                { type: "person" },
                { type: "event" },
                { type: "venue" },
              ],
            },
            {
              name: "type",
              type: "string",
              title: "Type",
              description: "The type of microcopy.",
              options: {
                list: [
                  { title: "Link", value: "link" },
                  { title: "Info", value: "info" },
                  { title: "Warning", value: "warning" },
                  { title: "Error", value: "error" },
                ],
              },
            },
          ],
        },
      ],
    }, */
  ],
};
