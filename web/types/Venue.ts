import { Slug } from './Slug';

export type Venue = {
  _id: string;
  _type: 'venue';
  name: string;
  geolocation?: {
    _type: 'geopoint';
    lat: number;
    lng: number;
  };
  slug: Slug;
  timezone?: string;
};
