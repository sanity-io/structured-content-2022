// deskStructure.js
import S from "@sanity/desk-tool/structure-builder";
import { HomeIcon } from "@sanity/icons";
import Iframe from "sanity-plugin-iframe-pane";
import DocumentsPane from "sanity-plugin-documents-pane";

export const getDefaultDocumentNode = ({ schemaType }) => {
  // Conditionally return a different configuration based on the schema type
  switch (schemaType) {
    /*case "person":
      return S.document().views([
        S.view.form(),
         S.view
          .component(Iframe)
          .options({
            url: (doc) => {
              let handle = doc.social.twitter.startsWith("@")
                ? doc.social.twitter
                : `@${doc.social.twitter}`;
              return `https://twitter.com/${handle}`;
            },
          })
          .title("Twitter"),
      ]);*/
    default:
      return S.document().views([
        S.view.form(),
        S.view
          .component(DocumentsPane)
          .options({
            query: `*[!(_id in path("drafts.**")) && references($id)]`,
            params: { id: `_id` },
            useDraft: false,
            debug: false,
          })
          .title("Incoming References"),
      ]);
  }
};

const FilteredTypes = ({ id }) =>
  ["person", "venue", "event", "session", "route", "page"].includes(id);
export default () =>
  S.list()
    .title("Structured Content 2022")
    .items([
      S.listItem()
        .title("Conference info")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("event")
            .documentId("aad77280-6394-4090-afad-1c0f2a0416c6")
        ),
      S.documentTypeListItem("person").title("People"),
      S.documentTypeListItem("session").title("Sessions"),
      S.documentTypeListItem("venue").title("Venues"),
      S.divider(),
      S.documentTypeListItem("route").title("Routes (URLs)"),
      S.documentTypeListItem("page").title("Landing Pages"),
      S.documentTypeListItem("article").title("Editorial Articles"),
      S.divider(),
      S.documentTypeListItem("ticket").title("Ticket types"),
      S.documentTypeListItem("sponsorship").title("Sponsorships"),
      S.documentTypeListItem("sponsor").title("Sponsors"),
      ...S.documentTypeListItems().filter(FilteredTypes),
    ]);