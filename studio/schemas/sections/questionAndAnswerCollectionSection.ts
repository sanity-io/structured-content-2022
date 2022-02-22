import { HelpCircleIcon } from "@sanity/icons";

export default {
  name: "questionAndAnswerCollectionSection",
  title: "Question and Answer Collection",
  type: "object",
  icon: HelpCircleIcon,
  preview: {
    select: {
      title: "title",
      questions: "questions",
    },
    prepare({ title, questions }) {
      return {
        title,
        subtitle: questions.length
          ? `${questions.length} questions`
          : undefined,
      };
    },
  },
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "Optional title for the collection",
    },
    {
      name: "questions",
      type: "array",
      title: "Questions",
      description:
        "We should put a disclaimer here about what to use this section for",
      of: [
        {
          type: "questionAndAnswer",
        },
      ],
    },
  ],
};
