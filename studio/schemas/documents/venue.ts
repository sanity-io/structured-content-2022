import timezones from "timezones-list";

import { PinIcon } from "@sanity/icons";

export default {
  name: "venue",
  title: "Venues",
  type: "document",
  icon: PinIcon,
  groups: [{ title: "Location", name: "location" }],
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "timezone",
      title: "Timezone",
      type: "string",
      options: {
        list: timezones.map(({ label, tzCode }) => ({
          title: label,
          value: tzCode,
        })),
      },
    },
    {
      name: "address",
      type: "object",
      title: "Address",
      group: "location",
      options: {
        columns: 2,
      },
      fields: [
        {
          name: "name",
          type: "string",
          title: "Name",
        },
        {
          name: "street",
          type: "string",
          title: "Street",
        },
        {
          name: "other",
          type: "string",
          title: "Other (Floor, suite, etc.)",
        },
        {
          name: "city",
          type: "string",
        },
        {
          name: "state",
          type: "string",
        },
        {
          name: "postalCode",
          type: "string",
          title: "ZIP/Postal Code",
        },
        { name: "country", type: "string" },
      ],
    },
    {
      name: "geolocation",
      group: "location",
      title: "Geographical Location",
      type: "geopoint",
    },
    {
      name: "url",
      type: "url",
      title: "Venue URL",
      description: "The URL of the venue's website, if any",
    },
    {
      name: "directions",
      type: "simpleBlockContent",
    },
    {
      name: "accomodations",
      type: "simpleBlockContent",
    },
    {
      name: "acccesibility",
      type: "object",
      title: "Accesibility",
      options: {
        columns: 1,
      },
      fieldsets: [
        {
          name: "checkList",
          title: "Accessibility Checklist",
        },
      ],
      fields: [
        {
          name: "wheelchair",
          type: "boolean",
          title: "Wheelchair Accessible",
          fieldset: "checkList",
        },
        {
          name: "parking",
          type: "boolean",
          title: "Accessible parking",
          fieldset: "checkList",
        },
        {
          name: "prioritySeating",
          type: "boolean",
          title: "Priority Seating",
          fieldset: "checkList",
        },
        {
          name: "captioning",
          type: "boolean",
          title: "Closed Captioning",
          fieldset: "checkList",
        },
        {
          name: "neutralRestroom",
          type: "boolean",
          title: "Gender neutral restrooms",
          fieldset: "checkList",
        },
        {
          name: "description",
          type: "simpleBlockContent",
          description:
            "For additional accessibilty information and directions.",
        },
      ],
    },
  ],
};
