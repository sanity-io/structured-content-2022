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
            name: "link",
            type: "link",
            title: "Link to internal or external content",
          },
        ],
      },
    },
    {
      type: "simpleCallToAction",
    },
  ],
};
