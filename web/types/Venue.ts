import { Slug } from './Slug';

export type Venue = {
  name: string;
  _type: 'venue';
  geolocation?: {
    _type: 'geopoint';
    lat: number;
    lng: number;
  };
  slug: Slug;
};
