import { Slug } from "./Slug";

export type Venue = {
  title: string;
  geolocation?: {
    _type: 'geopoint';
    lat: number;
    lng: number;
  };
  slug: Slug;
};
