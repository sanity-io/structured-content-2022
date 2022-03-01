import { Person } from './Person';
import { Section } from './Section';
import { Slug } from './Slug';
import { Sponsor } from './Sponsor';

export type Session = {
  createdAt: string;
  _id: string;
  _rev: string;
  _type: 'session';
  _updatedAt: string;
  duration: number;
  internalName: string;
  slug: Slug;
  title: string;
  type: 'talk' | 'panel' | 'break' | 'social' | 'workshop';
  publishedAt?: string;
  shortDescription?: Section[];
  longDescription?: Section[];
  speakers: Person[];
  sponsoredBy?: Sponsor[];
};
