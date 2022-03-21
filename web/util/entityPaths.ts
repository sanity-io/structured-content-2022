import urlJoin from 'proper-url-join';
import { Slug } from '../types/Slug';

export const mainEventId = 'aad77280-6394-4090-afad-1c0f2a0416c6';

export const getEntityPath = (entity?: { _type: string; slug?: Slug }) => {
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
