import createSchema from "part:@sanity/base/schema-creator";

import schemaTypes from "all:part:@sanity/base/schema-type";
import article from "./article";
import person from "./person";
import session from "./session";
import sponsor from "./sponsor";
import venue from "./venue";
import ticket from "./ticket";
import sponsorship from "./sponsorship";
import event from "./event";
import page from "./page";
import route from "./route";

// Objects
import seo from "./objects/seo";
import figure from "./objects/figure";
import simpleBlockContent from "./objects/simpleBlockContent";
import blockContent from "./objects/blockContent";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */
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
    seo,
    figure,
    simpleBlockContent,
    blockContent,
  ]),
});
