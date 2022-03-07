import urlJoin from 'proper-url-join';

export const mainEventId = 'aad77280-6394-4090-afad-1c0f2a0416c6';

export const getEntityPath = (entity?: any) => {
  if (!entity?.slug?.current) {
    return '#';
  }

  switch (entity._type) {
    case 'route':
      return urlJoin(entity.slug.current, { leadingSlash: true });
    case 'article':
      return urlJoin('article', entity.slug.current, { leadingSlash: true });
    default:
      console.error(`getEntityPath: unsupported entity type: '${entity._type}'`);
      return '#';
  }
};
