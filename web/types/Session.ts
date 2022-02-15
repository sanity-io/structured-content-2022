import { Person } from './Person';
import { Venue } from './Venue';
import { Section } from './Section';
import { Slug } from './Slug';

export type Session = {
  _id: string;
  title: string;
  startTime: string;
  _type: 'session';
  duration: number;
  location: Venue;
  speakers: Person[];
  shortDescription?: Section[];
  longDescription?: Section[];
  slug: Slug;
};
