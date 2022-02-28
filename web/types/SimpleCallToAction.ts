import { Slug } from './Slug';

export type SimpleCallToAction = {
  text?: string;
  url?: string;
  reference?: {
    slug?: Slug;
  };
};
