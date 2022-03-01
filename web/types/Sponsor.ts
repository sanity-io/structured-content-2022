export type SponsorLevel = 'Community' | 'Partner' | 'Premier';

export type Sponsor = {
  _id: string;
  _type: 'sponsor';
  _key: string;
  callToActionURL: string;
  image?: {
    _type: 'figure';
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
  title: string;
  url: string;
};
