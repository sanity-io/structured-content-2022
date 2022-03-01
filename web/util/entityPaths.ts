import urlJoin from 'proper-url-join';
import { Session } from '../types/Session';
import { Venue } from '../types/Venue';
import { Person } from '../types/Person';
import { Sponsor } from '../types/Sponsor';

type Entity = Person | Session | Venue | Sponsor;

export const mainEventId = 'aad77280-6394-4090-afad-1c0f2a0416c6';

export const getEntityPath = (entity: Entity) => {
  if (!entity.slug?.current) {
    return '#';
  }

  switch (entity._type) {
    case 'session':
    case 'person':
    case 'venue':
    case 'sponsor':
      return urlJoin(`${entity._type}s`, entity.slug?.current);
    default:
      return '';
  }
};
