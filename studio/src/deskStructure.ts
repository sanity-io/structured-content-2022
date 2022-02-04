// deskStructure.js
import S from "@sanity/desk-tool/structure-builder";

const FilteredTypes = ({ id }) =>
  ["person", "venue", "event", "session", "route", "page"].includes(id);
export default () =>
  S.list()
    .title("Structured Content 2022")
    .items([
      S.listItem()
        .title("Conference info")
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
