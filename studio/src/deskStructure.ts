import S from "@sanity/desk-tool/structure-builder";
import { HomeIcon, MenuIcon } from "@sanity/icons";
import Iframe from "sanity-plugin-iframe-pane";
import DocumentsPane from "sanity-plugin-documents-pane";
import { createDeskHierarchy } from "@sanity/hierarchical-document-list";
import SocialPreview from "part:social-preview/component";

import client from "part:@sanity/base/client";

import documentStore from "part:@sanity/base/datastore/document";
import resolveProductionUrl from "./resolveProductionUrl";
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

const defaultViews = [S.view.form(), IncomingRefs /* SpecPreview */];

export const getDefaultDocumentNode = ({ schemaType, documentId }) => {
  // Conditionally return a different configuration based on the schema type
  switch (schemaType) {
    case "route":
      return S.document()
        .id(documentId)
        .views([
          ...defaultViews,
          S.view
            .component(Iframe)
            .options({
              url: (doc) => resolveProductionUrl(doc),
            })
            .title("Preview"),
          S.view
            .component(
              SocialPreview({
                prepareFunction: (doc) => {
                  const { seo } = doc;
                  return {
                    title: seo?.title,
                    description: seo?.description,
                    ogImage: seo.ogImage || {
                      _ref: "image-1cedb02a5c2d3bd30aebe1a15999f6c83a804ff5-1200x630-svg",
                    },
                    siteUrl: getPreviewUrl(doc).replace(/\/\/$/, "/"),
                    slug: doc?.slug?.current,
                  };
                },
              })
            )
            .title("Social & SEO"),
        ]);

    case "event":
      return S.document()
        .id(documentId)
        .views([
          S.view
            .component(Iframe)
            .options({
              url: getPreviewUrl("event"),
            })
            .title("Preview"),
          ...defaultViews,
        ]);
    case "person":
      return S.document()
        .id(documentId)
        .views([
          ...defaultViews,
          S.view
            .component(Iframe)
            .options({
              url: (doc) => resolveProductionUrl(doc),
            })
            .title("Preview"),
        ]);
    default:
      return S.document().id(documentId).views(defaultViews);
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
      S.documentTypeListItem("program").title("Programs"),
      S.documentTypeListItem("session").title("Sessions"),
      S.documentTypeListItem("venue").title("Venues"),
      S.divider(),
      S.documentTypeListItem("route").title("Routes (URLs)"),
      S.listItem()
        .title("Pages")
        .id("page")
        .schemaType("page")
        .child((pageId) =>
          S.documentTypeList("page")
            .id(pageId)
            .schemaType("page")
            .child(async (docId) => {
              const currentDoc = await client
                .withConfig({ apiVersion: "2022-03-03" })
                .fetch(`*[_type =="route" && page._ref == $id][0]`, {
                  id: docId,
                });

              if (!currentDoc) {
                return S.document()
                  .id(docId)
                  .schemaType("page")
                  .views(defaultViews);
              }

              return S.document()
                .id(docId)
                .views([
                  ...defaultViews,
                  S.view
                    .component(Iframe)
                    .options({
                      url: () => resolveProductionUrl(currentDoc) || "",
                    })
                    .title("Preview"),
                ]);
            })
        ),
      S.documentTypeListItem("sharedSections").title("Shared Sections"),
      S.documentTypeListItem("navigation").title("Navigation"),
      S.documentTypeListItem("article").title("Editorial Articles"),
      S.divider(),
      S.documentTypeListItem("ticket").title("Ticket types"),
      S.listItem()
        .title("Sponsorships")
        .schemaType("sponsorship")
        .child(
          S.list()
            .items([
              S.documentTypeListItem("sponsorship").title("Sponsorships"),
            ])
            .title("Sponsorships")
        ),
      //S.documentTypeListItem("sponsorship").title("Sponsorships"),
      S.documentTypeListItem("sponsor").title("Sponsors"),
      S.divider(),
      /* S.documentTypeListItem("spec").title("Content Specification Sheets"), */
      ...S.documentTypeListItems().filter(FilteredTypes),
    ]);
