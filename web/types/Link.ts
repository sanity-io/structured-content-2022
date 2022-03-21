import { Slug } from './Slug';

export type Link = {
  internal?: {
    slug?: Slug;
  };
  external?: string;
  blank?: boolean;
};
