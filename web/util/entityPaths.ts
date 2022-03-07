import urlJoin from 'proper-url-join';
import { Session } from '../types/Session';
import { Venue } from '../types/Venue';
import { Person } from '../types/Person';

type Entity = Person | Session | Venue;

export const mainEventId = 'aad77280-6394-4090-afad-1c0f2a0416c6';

export const getEntityPath = (entity?: Entity) => {
  if (!entity?.slug?.current) {
    return '#';
  }

  switch (entity._type) {
    case 'session':
    case 'person':
    case 'venue':
      return urlJoin(`${entity._type}s`, entity.slug?.current);
    default:
      return '';
  }
};
