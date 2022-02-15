import { Slug } from './Slug';
import { Section } from './Section';

export type Person = {
  _id: string;
  name: string;
  title: string;
  _type: 'person';
  bio?: Section[];
  photo: {
    _type: 'figure';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  social: {
    twitter: string;
  };
  slug: Slug;
};
