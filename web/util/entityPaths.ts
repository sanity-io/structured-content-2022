import urlJoin from 'proper-url-join';
import { Slug } from '../types/Slug';

export const getEntityPath = (entity?: { _type: string; slug: Slug }) => {
  if (!entity?.slug?.current) {
    return '#';
  }

  switch (entity._type) {
    case 'route':
      return urlJoin(entity.slug.current, { leadingSlash: true });
    case 'article':
      return urlJoin('article', entity.slug.current, { leadingSlash: true });
    default:
      console.error(
        `getEntityPath: unsupported entity type: '${entity._type}'`
      );
      return '#';
  }
};
