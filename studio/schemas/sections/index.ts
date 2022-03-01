/**
 * Entering the section types here will automatically add them to schema.ts
 * because it maps over all the exports in this file
 *
 * The sections will also be added to `sharedSections.ts` as object types in its sections array
 *
 * This means that the `default as NAME` need to be the same as the `name: "NAME"`
 */

export { default as articleSection } from "./articleSection";
export { default as textAndImageSection } from "./textAndImageSection";
export { default as questionAndAnswerCollectionSection } from "./questionAndAnswerCollectionSection";
export { default as speakersSection } from "./speakersSection";
export { default as sessionsSection } from "./sessionsSection";
export { default as venuesSection } from "./venuesSection";
export { default as sponsorsSection } from "./sponsorsSection";
export { default as sponsorshipsSection } from "./sponsorshipsSection";
export { default as ticketsSection } from "./ticketsSection";
export { default as formSection } from "./formSection";
export { default as graphSection } from "./graphSection";
export { default as programsSection } from "./programsSection";
