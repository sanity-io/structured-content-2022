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

const SPEAKER = `
  _id,
  _type, 
  slug,
  photo { ${FIGURE} },
  name,
  title,
  company,
`;

const SESSION = `
  _id,
  _type,
  duration,
  longDescription,
  shortDescription,
  slug,
  speakers[] {
    _key,
    person-> { ${SPEAKER} },
    role,
  },
  title,
  type,
`;
const VENUE = `
  _id,
  _type,
  acccesibility,
  accomodations,
  address { city, country, name, other, postalCode, state, street },
  directions,
  geolocation { _type, lat, lng },
  name,
  slug,
  timezone,
  url,
`;
const PROGRAM = `
  _id,
  internalName,
  startDateTime,
  sessions[] {
    ...,
    session->{ ${SESSION} },
  },
  venues[]->{ ${VENUE} },
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
    soldOut,
    priceAndAvailability[] { _key, from, label, price },    
  },
  included,
  type,
`;
const SPEAKER_WITH_SESSIONS = `
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
    "session": { _id, _type, title, duration, slug },
    "programContainingSession": *[_type == "program" && references(^._id)] | order(_createdAt)[0] {
      "programStart": startDateTime,
      sessions[] {
        "_id": coalesce(session->._id, _key),
        "duration": coalesce(durationOverride, duration, session->.duration, 0),
      },
      "venueTimezone": venues[0]->.timezone,
    },
  },       
`;

const SPONSOR = `
  _id,
  _type,
  _key,
  callToActionURL,
  image,
  title,
  url,
`;

const SPONSORSHIP = `
  _createdAt,
  _id,
  _rev,
  _type,
  _updatedAt,
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
  sponsors[]->{ ${SPONSOR} },
`;

const PRIMARY_NAV = `
  *[_type == "navigation" && slug.current == "primary-nav"][0].items[] {
    label,
    target { ${LINK} },
  }
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
  SESSION,
  SPONSORSHIP,
  SPONSOR,
  SPEAKER_WITH_SESSIONS,
  SPEAKER,
  PRIMARY_NAV,
  VENUE,
};
