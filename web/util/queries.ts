const LINK = 'internal->{_type, slug}, external, blank';

const FIGURE = '_type, alt, asset';
const SIMPLE_CALL_TO_ACTION = `text, link{ ${LINK} }`;
const BLOCK_CONTENT = `
  ...,
  markDefs[] {
    ...,
    _type == "link" => { ${LINK} },
  },
  _type == "simpleCallToAction" => { ${SIMPLE_CALL_TO_ACTION} },
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
  groups[]{
    name,
    priceAndAvailability[] { _key, from, label, price },    
  },
  included,
  type,
`;
const SPEAKER = `
  bio,
  company,
  name,
  photo { ${FIGURE} },
  pronouns,
  slug,
  social { twitter, linkedin },
  title,
  _createdAt,
  _id,
  _rev,
  _type,
  _updatedAt,
  "sessions": *[_type == "session" && references(^._id) && !(_id in path("drafts.**"))] {
    _id,
    title,
    duration,
    "programContainingSession": *[_type == "program" && references(^._id)][0] {
      startDateTime,
      sessions[] {
        _type,
        duration,
        session-> {
          _id,
          duration,
        }
      },
      "venueTimezone": venues[0]->.timezone,
    },
  },       
`;

const SPONSORSHIP = `
  _createdAt,
  _id,
  _rev,
  _type,
  _updatedAt,
  available,
  benefits[] {
    _key,
    _type,
    benefit-> {
      _createdAt,
      _id,
      _rev,
      _type,
      _updatedAt,
      name,
    },
    description,
    number,
  },
  price,
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
  SPONSORSHIP,
  SPEAKER,
};
