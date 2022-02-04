export default {
  name: "article",
  title: "Editorial Articles",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      //description: 'This will be the headline of the article',
    },
    {
      name: "summary",
      type: "text",
      title: "Summary",
      description:
        "Used to preview the article content (on Google, social media etc).",
      validation: (Rule) => [
        Rule.max(150).warning(
          "You should keep this under 150 characters to keep it easily scannable."
        ),
        Rule.required(),
      ],
    },
  ],
};
