/**
 * Entering the section types here will automatically add them to schema.ts
 * because it maps over all the exports in this file
 *
 * The sections will also be added to `sharedSections.ts` as object types in its sections array
 */

export { default as textAndImage } from "../sections/textAndImage";
export { default as questionAndAnswerCollection } from "./questionAndAnswerCollection";
export { default as mailchimp } from "./mailchimp";
export { default as simpleCallToAction } from "../sections/simpleCallToAction";
export { default as speakers } from "../sections/speakers";
export { default as sessions } from "../sections/sessions";
export { default as venues } from "../sections/venues";
export { default as sponsors } from "../sections/sponsors";
