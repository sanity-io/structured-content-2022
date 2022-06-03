import type { Person } from './Person';
import type { Section } from './Section';
import type { Slug } from './Slug';

export type Session = {
  _id: string;
  _type: 'session';
  title?: string;
  duration?: number;
  shortDescription?: Section;
  longDescription?: Section;
  slug?: Slug;
  speakers?: {
    role: 'speaker' | 'moderator';
    person: Person;
  }[];
  type?: 'talk' | 'panel' | 'break' | 'social' | 'workshop';
  videoURL?: string;
  slideURL?: string;
};
