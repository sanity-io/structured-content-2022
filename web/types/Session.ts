import { Section } from './Section';
import { Person } from './Person';

export type Session = {
  _id: string;
  _type: 'session';
  title?: string;
  duration?: number;
  shortDescription?: Section;
  speakers?: {
    role: 'speaker' | 'moderator';
    person: Person;
  }[];
  type?: 'workshop' | 'conference' | 'meetup' | 'webinar';
};
