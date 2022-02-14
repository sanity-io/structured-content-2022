import { HelpCircleIcon } from "@sanity/icons";
export default {
  name: "questionAndAnswer",
  type: "object",
  title: "Question and Answer",
  icon: HelpCircleIcon,
  preview: {
    select: {
      title: "question",
      subtitle: "answer",
    },
  },
  fields: [
    {
      name: "question",
      type: "string",
      title: "Question",
    },
    {
      name: "answer",
      type: "simpleBlockContent",
      title: "Answer",
    },
  ],
};
