import { Slug } from './Slug';

export type SponsorLevel = 'Silver' | 'Gold' | 'Premier';

export type Sponsor = {
  _id: string;
  _type: 'sponsor';
  title: string;
  image: {
    _type: 'image';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  sponsorship: {
    _id: string;
    type: 'sponsorship';
    title: SponsorLevel;
  };
  slug: Slug;
};
