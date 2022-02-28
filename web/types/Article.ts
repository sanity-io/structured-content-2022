import { Slug } from "./Slug";

export type Article = {
  _id: string;
  _rev: string;
  _type: 'article';
  content: any[];
  heading: string;
  publishedAt: string;
  slug: Slug;
  summary: string;
  _updatedAt: string;
};
