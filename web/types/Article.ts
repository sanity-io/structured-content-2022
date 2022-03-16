import { Slug } from './Slug';
import { Section } from './Section';
import { Figure } from './Figure';

export type Article = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: 'article';
  _updatedAt: string;
  authors?: { name: string; photo: Figure }[];
  content: Section[];
  heading: string;
  publishedAt: string;
  slug: Slug;
  summary: string;
  relatedTo?: {
    people: { name: string; photo: Figure }[];
    sessions: string[];
    venues: string[];
  };
};
