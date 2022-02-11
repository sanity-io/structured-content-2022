import { Speaker } from './Speaker';
import { Venue } from './Venue';
import { Section } from './Section';

export type Session = {
  _id: string;
  title: string;
  startTime: string;
  duration: number;
  location: Venue;
  speakers: Speaker[];
  shortDescription?: Section[];
  longDescription?: Section[];
};
