import { InlineElementIcon } from "@sanity/icons";
import { DocumentsIcon } from "@sanity/icons";

export default {
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    {
      type: "block",
      of: [
        {
          type: "reference",
          title: "Embed inline",
          /* icon: InlineElementIcon, */
          to: [
            { type: "person" },
            { type: "session" },
            { type: "venue" },
            { type: "sponsorship" },
            { type: "sponsor" },
            { type: "ticket" },
          ],
        },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "internalLink",
            type: "object",
            title: "Internal link",
            icon: DocumentsIcon,
            fields: [
              {
                name: "reference",
                type: "reference",
                title: "Reference",
                to: [
                  { type: "route" },
                  { type: "person" },
                  { type: "session" },
                  { type: "article" },
                  // other types you may want to link to
                ],
              },
            ],
          },
          {
            name: "link",
            type: "object",
            title: "External link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (Rule) => [
                  Rule.uri({
                    allowRelative: false,
                  }).warning(
                    "Consider the internal link annotation for relative URLs"
                  ),
                  Rule.uri({ scheme: ["https", "mailto", "tel"] }),
                ],
              },
              {
                title: "Open in new tab",
                name: "blank",
                description: "Read https://css-tricks.com/use-target_blank/",
                type: "boolean",
              },
            ],
          },
        ],
      },
    },
  ],
};
