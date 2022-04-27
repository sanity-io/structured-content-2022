import { UlistIcon } from "@sanity/icons";
import { intervalToDuration, addMinutes, parseISO } from "date-fns";

import SlotPreview from "../../src/SlotPreview";

export default {
  name: "program",
  title: "Program",
  type: "document",
  icon: UlistIcon,
  preview: {
    select: {
      internalName: "internalName",
      venue: "venues",
      event: "event.name",
      start: "startDateTime",
      sessions: "sessions",
      duration0: "sessions.0.session.duration",
      duration1: "sessions.1.session.duration",
      duration2: "sessions.2.session.duration",
      duration3: "sessions.3.session.duration",
      duration4: "sessions.4.session.duration",
      duration5: "sessions.5.session.duration",
      duration6: "sessions.6.session.duration",
      duration7: "sessions.7.session.duration",
      duration8: "sessions.8.session.duration",
      duration9: "sessions.9.session.duration",
      duration10: "sessions.10.session.duration",
      duration11: "sessions.11.session.duration",
      duration12: "sessions.12.session.duration",
    },
    prepare({
      internalName,
      venue,
      event,
      start,
      sessions = [],
      ...durations
    }) {
      const startDate = new Date(start).toLocaleDateString();
      const numberOfVenues = venue.length;
      const sessionsDurations = Object.values(sessions).filter(
        (session) => session?._type === "slot" && session.session
      );

      const totalMinutes = (): number => {
        return sessionsDurations.length > 0
          ? sessionsDurations.reduce((total, { session, durationOverride }) => {
              const duration = durationOverride || session?.duration || 0;
              const minutes: number = total + duration;

              return minutes;
            }, 0)
          : 0;
      };
      const duration = (): string => {
        return Object.entries(
          intervalToDuration({
            start: parseISO(start),
            end: addMinutes(parseISO(start), totalMinutes()),
          })
        )
          .map(([key, value]) =>
            ["hours", "minutes"].includes(key) ? `${value} ${key}` : undefined
          )
          .filter(Boolean)
          .join(", ");
      };
      return {
        title: `${internalName} at ${event}`,
        subtitle: `${startDate} (${duration()}) at ${numberOfVenues} venue${
          numberOfVenues > 1 ? "s" : ""
        }`,
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
