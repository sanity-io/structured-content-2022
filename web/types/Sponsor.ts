import { Slug } from './Slug';

export type SponsorLevel = 'Community' | 'Partner' | 'Premier';

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
    _type: 'sponsorship';
    type: SponsorLevel;
  };
  slug: Slug;
};
