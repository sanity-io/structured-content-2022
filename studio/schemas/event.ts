export default {
  name: "event",
  title: "Events",
  type: "document",
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
  ],
};
