import SlotPreview from "../../src/SlotPreview";

export default {
  name: "program",
  title: "Program",
  type: "document",
  preview: {
    select: {
      internalName: "internalName",
      venue: "venues",
      event: "event.name",
      start: "startDateTime",
      sessions: "sessions",
    },
    prepare({ internalName, venue, event, start, sessions }) {
      const startDate = new Date(start).toLocaleDateString();
      const numberOfVenues = venue.length;
      const totalMinutes = sessions.reduce((total, session = 0) => {
        return total + Number(session.duration);
      }, 0);

      return {
        title: `${internalName} at ${event}`,
        subtitle: `${startDate} (${totalMinutes}mins) at ${numberOfVenues} venues`,
      };
    },
  },
  fields: [
    {
      name: "internalName",
      type: "string",
      title: "Internal name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "event",
      type: "reference",
      to: [{ type: "event" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "venues",
      type: "array",
      title: "Venues",
      description: "Venues where the event will take place",
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: "reference",
          to: [{ type: "venue" }],
        },
      ],
    },
    {
      name: "startDateTime",
      type: "datetime",
      title: "Start date and time",
      description: "Use PST timezone",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "sessions",
      type: "array",
      title: "Sessions",
      description: "Sessions that are part of this program",
      of: [
        {
          name: "padding",
          type: "object",
          title: "Padding slot",
          preview: {
            select: {
              minutes: "duration",
            },
            prepare({ minutes }) {
              return {
                title: "Padding",
                subtitle: `${minutes} minutes`,
              };
            },
          },
          fields: [
            {
              name: "duration",
              type: "number",
            },
          ],
        },
        {
          type: "object",
          title: "Slot",
          name: "slot",
          preview: {
            select: {
              internalName: "session.internalName",
              title: "session.title",
              sessionDuration: "session.duration",
              durationOverride: "durationOverride",
            },
            prepare({
              internalName = "",
              title = "",
              sessionDuration = 0,
              durationOverride,
            }) {
              return {
                title: [internalName, title].filter(Boolean).join(" - "),
                subtitle: `${durationOverride || sessionDuration} minutes`,
              };
            },
            //component: SlotPreview,
          },
          fields: [
            {
              name: "session",
              type: "reference",
              to: [{ type: "session" }],
            },
            {
              name: "durationOverride",
              type: "number",
              title: "Override duration",
              description: "Override Session duration in minutes",
            },
          ],
        },
      ],
    },
  ],
};
