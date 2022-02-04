export default {
  name: "event",
  title: "Events",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Event name",
    },
    {
      name: "logo",
      type: "image",
      title: "Logo",
    },
    {
      name: "type",
      type: "string",
      title: "Event type",
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
    },
    {
      name: "description",
      type: "text",
      title: "Description",
    },
    {
      name: "startDate",
      type: "datetime",
      title: "Start date",
    },
    {
      name: "endDate",
      type: "datetime",
      title: "End date",
    },
  ],
};
