import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";
import article from "./documents/article";
import event from "./documents/event";
import page from "./documents/page";
import person from "./documents/person";
import route from "./documents/route";
import session from "./documents/session";
import sharedSections from "./documents/sharedSections";
import sponsor from "./documents/sponsor";
import sponsorship from "./documents/sponsorship";
import ticket from "./documents/ticket";
import venue from "./documents/venue";

// Objects

import { figure, richText, seo, simpleCallToAction } from "./objects";
import blockContent from "./arrays/blockContent";
import questionAndAnswer from "./objects/questionAndAnswer";
import simpleBlockContent from "./arrays/simpleBlockContent";

import * as sections from "./sections";

import spec from "./documents/spec";
import program from "./documents/program";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    ...Object.values(sections),
    figure,
    questionAndAnswer,
    simpleCallToAction,
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
    program,
  ]),
});
