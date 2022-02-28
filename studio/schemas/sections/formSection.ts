import { ClipboardIcon } from "@sanity/icons";

export default {
  name: "formSection",
  title: "Form section",
  type: "object",
  icon: ClipboardIcon,
  fields: [
    {
      name: "type",
      type: "string",
      title: "Form type",
      description: "",
      options: {
        list: [
          { title: "Contact form", value: "contact" },
          { title: "Registration form", value: "registration" },
          { title: "Newsletter form", value: "newsletter" },
        ],
      },
    },
    {
      name: "id",
      type: "string",
      title: "ID",
      description:
        "ID for connecting the form with an external service (Mailchimp, Hopin, etc.)",
    },
    {
      name: "buttonText",
      type: "string",
      title: "Button text",
      description: "Text for the submit button",
    },
    {
      name: "target",
      type: "url",
      title: "Target",
      description:
        'The target of the form. Must beging with "mailto:" or "https://"',
      validation: (Rule) => Rule.uri({ scheme: ["mailto", "https"] }),
    },
    {
      name: "redirect",
      type: "reference",
      title: "Redirect",
      description: "The page to redirect to after the form has been submitted",
      to: [{ type: "route" }, { type: "article" }],
    },
  ],
};
