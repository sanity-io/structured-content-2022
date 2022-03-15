const FIGURE = '_type, alt, asset';
const SIMPLE_CALL_TO_ACTION = 'text, url, reference->{slug}';

const SIMPLE_BLOCK_CONTENT = `
  ...,
  _type == "simpleCallToAction" => { ${SIMPLE_CALL_TO_ACTION} },
`;

const ARTICLE_SECTION = `heading, subheading, content[]{ ${SIMPLE_BLOCK_CONTENT} }`;
const HERO = `heading, summary, callToAction{ ${SIMPLE_CALL_TO_ACTION} }`;
const QUESTION_AND_ANSWER_COLLECTION_SECTION = `
  title, questions[]{ _key, question, answer[]{ ${SIMPLE_BLOCK_CONTENT} } }
`;
const TEXT_AND_IMAGE_SECTION = `
  title, tagline, text[]{ ${SIMPLE_BLOCK_CONTENT} }, image{ ${FIGURE} }
`;

export {
  ARTICLE_SECTION,
  FIGURE,
  HERO,
  QUESTION_AND_ANSWER_COLLECTION_SECTION,
  SIMPLE_CALL_TO_ACTION,
  TEXT_AND_IMAGE_SECTION,
};
