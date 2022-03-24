import { Slug } from './Slug';
import { Section } from './Section';
import { Figure } from './Figure';

export type Article = {
  _id: string;
  _rev: string;
  _type: 'article';
  authors?: { name: string; photo: Figure }[];
  content: Section[];
  heading: string;
  publishedAt: string;
  updatedAt: string;
  slug: Slug;
  summary: string;
  relatedTo?: {
    people: { name: string; photo: Figure }[];
    sessions: string[];
    venues: string[];
  };
};
