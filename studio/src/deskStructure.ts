import S from "@sanity/desk-tool/structure-builder";
import { HomeIcon, MenuIcon } from "@sanity/icons";
import Iframe from "sanity-plugin-iframe-pane";
import DocumentsPane from "sanity-plugin-documents-pane";
import { createDeskHierarchy } from "@sanity/hierarchical-document-list";
import documentStore from "part:@sanity/base/datastore/document";

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
        ...defaultViews,
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
      S.listItem()
        .title("People")
        .schemaType("person")
        .child(
          S.list()
            .title("People")
            .items([S.documentTypeListItem("person").title("Everyone")])
        ),
      S.documentTypeListItem("session").title("Sessions"),
      S.documentTypeListItem("venue").title("Venues"),
      S.divider(),
      S.documentTypeListItem("route").title("Routes (URLs)"),
      S.documentTypeListItem("page").title("Landing Pages"),
      S.documentTypeListItem("sharedSections").title("Shared Sections"),
      S.listItem()
        .title("Navigation")
        .icon(MenuIcon)
        .child(
          S.list()
            .items([
              createDeskHierarchy({
                title: "Primary Navigation",

                // The hierarchy will be stored in this document ID 👇
                documentId: "primary-nav",

                // Document types editors should be able to include in the hierarchy
                referenceTo: ["route"],
              }).icon(MenuIcon),
              createDeskHierarchy({
                title: "Secondary Navigation",

                // The hierarchy will be stored in this document ID 👇
                documentId: "secondary-nav",

                // Document types editors should be able to include in the hierarchy
                referenceTo: ["route"],
              }).icon(MenuIcon),
            ])
            .title("Navigation")
        ),
      //S.documentTypeListItem("article").title("Editorial Articles"), // disabled for now
      S.divider(),
      S.documentTypeListItem("ticket").title("Ticket types"),
      S.listItem()
        .title("Sponsorships")
        .child(
          S.list()
            .items([
              S.documentTypeListItem("sponsorship").title("Sponsorships"),
              createDeskHierarchy({
                title: "Sponsorship tiers",

                // The hierarchy will be stored in this document ID 👇
                documentId: "sponsorship-tiers",

                // Document types editors should be able to include in the hierarchy
                referenceTo: ["sponsorship"],
              }),
            ])
            .title("Sponsorships")
        ),
      //S.documentTypeListItem("sponsorship").title("Sponsorships"),
      S.documentTypeListItem("sponsor").title("Sponsors"),
      S.divider(),
      S.documentTypeListItem("spec").title("Content Specification Sheets"),
      ...S.documentTypeListItems().filter(FilteredTypes),
    ]);
