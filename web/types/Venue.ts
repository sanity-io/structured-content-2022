import type { Section } from './Section';
import type { Slug } from './Slug';

export type Venue = {
  _createdAt?: string;
  _id: string;
  _rev?: string;
  _type: 'venue';
  _updatedAt?: string;
  // sic - typo in the schema
  acccesibility?: {
    captioning?: boolean;
    neutralRestroom?: boolean;
    parking?: boolean;
    prioritySeating?: boolean;
    wheelchair?: boolean;
  };
  // sic - typo in the schema
  accomodations?: Section[];
  address?: {
    city?: string;
    country?: string;
    name?: string;
    other?: string;
    postalCode?: string;
    state?: string;
    street?: string;
  };
  directions?: Section[];
  geolocation?: {
    _type: 'geopoint';
    lat: number;
    lng: number;
  };
  name: string;
  slug: Slug;
  timezone?: string;
  url?: string;
};
