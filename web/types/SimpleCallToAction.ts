import { Slug } from './Slug';

export type SimpleCallToAction = {
  text: string;
  reference?: {
    slug?: Slug;
  };
};
