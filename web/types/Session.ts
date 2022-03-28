import { Person } from './Person';
import { Section } from './Section';
import { Slug } from './Slug';
import { Sponsor } from './Sponsor';

export type Session = {
  _id: string;
  _type: 'session';
  title?: string;
  duration?: number;
};
