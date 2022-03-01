import { BarChartIcon } from "@sanity/icons";

export default {
  name: "graphSection",
  title: "Graph section",
  type: "object",
  icon: BarChartIcon,
  fields: [
    {
      name: "type",
      type: "string",
      title: "Section type",
      description: "",
      options: {
        list: [
          { title: "Table view", value: "table" },
          { title: "Block graph", value: "block" },
        ],
      },
    },
    {
      name: "data",
      type: "array",
      title: "Data",
      of: [
        {
          name: "entry",
          type: "object",
          title: "Entry",
          preview: {
            select: {
              label: "label",
              value: "value",
              unit: "unit",
            },
            prepare({ label, value, unit }) {
              return {
                title: `${label}: ${[value, unit].filter(Boolean).join("")}`,
              };
            },
          },
          fields: [
            {
              name: "label",
              type: "string",
              title: "Label",
            },
            {
              name: "value",
              type: "string",
              title: "Value",
              description: "Data will be stored as a string.",
            },
            {
              name: "unit",
              type: "string",
              title: "unit",
              description: "%, $, miles, etc.",
            },
          ],
        },
      ],
    },
  ],
};
