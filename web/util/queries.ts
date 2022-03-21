const LINK = 'internal->{_type, slug}, external, blank';

const FIGURE = '_type, alt, asset';
const SIMPLE_CALL_TO_ACTION = `text, link{ ${LINK} }`;

const BLOCK_CONTENT = `
  ...,
  children[] {
    ...,
    _type == "simpleCallToAction" => { ${SIMPLE_CALL_TO_ACTION} },
  },
  markDefs[] {
    ...,
    _type == "link" => { ${LINK} },
  },
`;
const SIMPLE_BLOCK_CONTENT = `
  ...,
  markDefs[] {
    ...,
    _type == "link" => { ${LINK} },
  },
  _type == "simpleCallToAction" => { ${SIMPLE_CALL_TO_ACTION} },
`;

const ARTICLE_SECTION = `heading, subheading, content[]{ ${SIMPLE_BLOCK_CONTENT} }`;
const HERO = `heading, summary, callToAction{ ${SIMPLE_CALL_TO_ACTION} }`;
const PROGRAM = `
  _id,
  internalName,
  startDateTime,
  sessions[] {
    ...,
    session->{ duration, title },
  },
  venues[]->{ name, timezone },
`;
const QUESTION_AND_ANSWER_COLLECTION_SECTION = `
  title, questions[]{ _key, question, answer[]{ ${SIMPLE_BLOCK_CONTENT} } }
`;
const TEXT_AND_IMAGE_SECTION = `
  title, tagline, text[]{ ${SIMPLE_BLOCK_CONTENT} }, image{ ${FIGURE} }
`;
const TICKET = `
  _id,
  _type,
  description[]{ ${SIMPLE_BLOCK_CONTENT} },
  included,
  priceAndAvailability,
  type,
`;

export {
  ARTICLE_SECTION,
  BLOCK_CONTENT,
  FIGURE,
  HERO,
  PROGRAM,
  QUESTION_AND_ANSWER_COLLECTION_SECTION,
  SIMPLE_CALL_TO_ACTION,
  TEXT_AND_IMAGE_SECTION,
  TICKET,
};
