import urlJoin from 'proper-url-join';
import { productionUrl } from './constants';
import { Slug } from '../types/Slug';

export const getEntityPath = (entity?: { _type: string; slug?: Slug }) => {
  /* Should quite possibly return null instead, but this will require some
   * refactoring. The empty string is falsy, at least, which is useful.
   */
  if (!entity?.slug?.current) {
    return '';
  }

  switch (entity._type) {
    case 'route':
      return urlJoin(entity.slug.current, { leadingSlash: true });
    case 'article':
      return urlJoin('articles', entity.slug.current, { leadingSlash: true });
    case 'person':
      return urlJoin('speakers', entity.slug.current, { leadingSlash: true });
    case 'session':
      return urlJoin('program', entity.slug.current, { leadingSlash: true });
    default:
      console.error(
        `getEntityPath: unsupported entity type: '${entity._type}'`
      );
      return '';
  }
};

export const getOgImagePath = (imageText?: string) =>
  imageText
    ? urlJoin(productionUrl, 'api', 'og-image', encodeURIComponent(imageText), {
        leadingSlash: true,
      })
    : '';
