import { Slug } from './Slug';
import { Section } from './Section';
import { Figure } from './Figure';

export type Person = {
  bio?: Section[];
  company?: string;
  name: string;
  photo: Figure;
  pronouns?: string;
  slug: Slug;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
  title: string;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: 'person';
  _updatedAt: string;
};

export type FrontpagePerson = {
  _id: string;
  _type: 'person';
  slug: Slug;
  photo: Figure;
  name: string;
  title: string;
  company: string;
};
