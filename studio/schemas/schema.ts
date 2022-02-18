import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";
import article from "./documents/article";
import person from "./documents/person";
import session from "./documents/session";
import sponsor from "./documents/sponsor";
import venue from "./documents/venue";
import ticket from "./documents/ticket";
import sponsorship from "./documents/sponsorship";
import event from "./documents/event";
import page from "./documents/page";
import route from "./documents/route";

// Objects

import simpleBlockContent from "./arrays/simpleBlockContent";
import blockContent from "./arrays/blockContent";
import { figure, richText, seo } from "./objects";
import questionAndAnswer from "./objects/questionAndAnswer";

import sharedSections from "./documents/sharedSections";

import spec from "./documents/spec";
import * as sections from "./sections";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
    ...Object.values(sections),
    figure,
    questionAndAnswer,
    richText,
    seo,
    event,
    session,
    person,
    article,
    page,
    route,
    sponsor,
    venue,
    sponsorship,
    ticket,
    sharedSections,
    simpleBlockContent,
    blockContent,
    spec,
  ]),
});
