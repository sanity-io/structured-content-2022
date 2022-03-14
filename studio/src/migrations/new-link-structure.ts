/**
 * @TODO:
 * - [X] Pages with embedded articleSections with link annotations
 * - [ ] Pages with embedded articleSections with simpleCallToAction blocks
 * - [ ] Pages with hero call to actions
 * - [ ] SharedSections with embedded articleSections with link annotations
 * - [ ] SharedSections with embedded articleSections with simpleCallToAction blocks
 *
 *
 */
import sanityClient from "part:@sanity/base/client";

const versionedClient = sanityClient.withConfig({
  apiVersion: "2022-03-10",
  dataset: "external-links-in-new-tab",
});

/*



# Pages with embedded articleSections with simpleCallToAction blocks

Old structure:
```json
[
  {
  "_key": "af6df0d45694",
  "_type": "simpleCallToAction",
  "reference": {
    "_ref": "a852951c-3f3f-48be-930e-07e66300a7cc",
    "_type": "reference"
  },
  "text": "Get registration information"
  },
]

```

New structure:
```json
[
  {
    "_key": "1a26bb175355",
    "_type": "simpleCallToAction",
    "text": "External link in new tab",
    "link": {
      "_type": "link",
      "external": "https://www.google.com",
      "blank": true
    }
  }
]


*/

const pagesWithSimpleCallToActionsQuery = `*[
  _type == "page"
  && length(sections[_type == "articleSection"].content[_type == "simpleCallToAction" && link == null]) > 0
]{
  _id,
  internalName,
  "link": "http://localhost:3333/desk/" + _type + ";" + _id,
  "totalSections": length(sections[_type == "articleSection"].content[_type == "simpleCallToAction"]),
  "sections": sections[_type == "articleSection"].content[_type == "simpleCallToAction"]
}`;

async function migratePagesWithSimpleCallToActionBlocks() {
  const docs = await versionedClient.fetch(pagesWithSimpleCallToActionsQuery);
  console.log(`Found ${docs.length} pages with simpleCallToAction blocks`);
  console.log(JSON.stringify(docs, null, 2));
}

migratePagesWithSimpleCallToActionBlocks();

const sharedSectionsWithArticleSectionsWithSimpleCallToActionBlocksQuery = `*[
  _type == "sharedSections"
  && length(sections[_type == "articleSection"].content[_type == "simpleCallToAction" && link == null]) > 0
]{
  _id,
  internalName,
  "link": "http://localhost:3333/desk/sharedSections;" + _id,
  "totalSections": length(sections[_type == "articleSection"].content[_type == "simpleCallToAction"]),
  "sections": sections[_type == "articleSection"].content[_type == "simpleCallToAction"]
}`;

async function migrateSharedSectionsWithArticleSectionsWithSimpleCallToActionBlocks() {
  const docs = await versionedClient.fetch(
    sharedSectionsWithArticleSectionsWithSimpleCallToActionBlocksQuery
  );
  console.log(
    `Found ${docs.length} sharedSections with articleSections with simpleCallToAction blocks`
  );
  console.log(JSON.stringify(docs, null, 2));
}

//migrateSharedSectionsWithArticleSectionsWithSimpleCallToActionBlocks();
