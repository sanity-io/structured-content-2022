import type { Section } from './Section';
import type { Slug } from './Slug';

export type Venue = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: 'venue';
  _updatedAt: string;
  accessibility?: {
    captioning?: boolean;
    neutralRestroom?: boolean;
    parking?: boolean;
    prioritySeating?: boolean;
    wheelchair?: boolean;
  };
  accomodations?: Section[];
  address?: {
    city?: string;
    country?: string;
    postalCode?: string;
    state?: string;
    street?: string;
    other?: string;
    zip?: string;
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
};
