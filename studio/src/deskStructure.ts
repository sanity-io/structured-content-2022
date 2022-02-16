// deskStructure.js
import S from "@sanity/desk-tool/structure-builder";
import { HomeIcon } from "@sanity/icons";
import Iframe from "sanity-plugin-iframe-pane";
import DocumentsPane from "sanity-plugin-documents-pane";
import { getPreviewUrl } from "./urlResolver";
import SpecPreview from "./spec";

const IncomingRefs = S.view
  .component(DocumentsPane)
  .options({
    query: `*[!(_id in path("drafts.**")) && references($id)]`,
    params: { id: `_id` },
    useDraft: false,
    debug: false,
  })
  .title("Incoming References");

const defaultViews = [S.view.form(), IncomingRefs, SpecPreview];

export const getDefaultDocumentNode = ({ schemaType }) => {
  // Conditionally return a different configuration based on the schema type
  switch (schemaType) {
    case "event":
      return S.document().views([
        S.view
          .component(Iframe)
          .options({
            url: getPreviewUrl("event"),
          })
          .title("Preview"),
        ...defaultViews,
      ]);
    case "person":
      return S.document().views([
        S.view
          .component(Iframe)
          .options({
            url: (doc) =>
              doc?.slug?.current
                ? getPreviewUrl(doc._type, doc.slug.current)
                : getPreviewUrl(doc._type),
          })
          .title("Preview"),
      ]);
    default:
      return S.document().views(defaultViews);
  }
};

const FilteredTypes = ({ id }) =>
  ["person", "venue", "event", "session", "route", "page"].includes(id);
export default () =>
  S.list()
    .title("Sanity.io Events")
    .items([
      S.listItem()
        .title("Structured Content 2022")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("event")
            .documentId("aad77280-6394-4090-afad-1c0f2a0416c6")
            .views([
              S.view.form(),
              S.view
                .component(Iframe)
                .options({
                  url: getPreviewUrl("event"),
                })
                .title("Preview"),
              S.view
                .component(DocumentsPane)
                .options({
                  query: `*[!(_id in path("drafts.**")) && references($id)]`,
                  params: { id: `_id` },
                  useDraft: false,
                  debug: false,
                })
                .title("Incoming References"),
            ])
        ),
      S.documentTypeListItem("event").title("Events"),
      S.documentTypeListItem("person").title("People"),
      S.documentTypeListItem("session").title("Sessions"),
      S.documentTypeListItem("venue").title("Venues"),
      S.divider(),
      S.documentTypeListItem("route").title("Routes (URLs)"),
      S.documentTypeListItem("page").title("Landing Pages"),
      S.documentTypeListItem("sharedSections").title("Shared Sections"),
      S.documentTypeListItem("article").title("Editorial Articles"),
      S.divider(),
      S.documentTypeListItem("ticket").title("Ticket types"),
      S.documentTypeListItem("sponsorship").title("Sponsorships"),
      S.documentTypeListItem("sponsor").title("Sponsors"),
      S.divider(),
      S.documentTypeListItem("spec").title("Content Specification Sheets"),
      ...S.documentTypeListItems().filter(FilteredTypes),
    ]);
