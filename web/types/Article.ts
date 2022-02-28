import { Slug } from "./Slug";
import { Section } from "./Section";

export type Article = {
  _id: string;
  _rev: string;
  _type: 'article';
  content: Section[];
  heading: string;
  publishedAt: string;
  slug: Slug;
  summary: string;
  _updatedAt: string;
};
