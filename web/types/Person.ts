import { Slug } from './Slug';
import { Section } from './Section';
import { Figure } from './Figure';

export type Person = {
  _id: string;
  name: string;
  title: string;
  _type: 'person';
  bio?: Section[];
  photo: Figure;
  social: {
    twitter: string;
  };
  slug: Slug;
};
