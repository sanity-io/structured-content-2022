import type { ParsedUrlQuery } from 'querystring';
import urlJoin from 'proper-url-join';

export const getSlug = (params?: ParsedUrlQuery) => {
  const slug = params?.slug;
  if (!slug) {
    return '';
  }

  return Array.isArray(slug)
    ? slug.reduce((acc, curr) => urlJoin(acc, curr, { leadingSlash: false }))
    : slug;
};
