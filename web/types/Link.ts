import { Slug } from './Slug';

export type Link = {
  internal?: {
    _type: string;
    slug?: Slug;
  };
  external?: string;
  blank?: boolean;
};
