import { Figure } from './Figure';

export type SponsorLevel = 'Community' | 'Partner' | 'Premier';

export type Sponsor = {
  _id: string;
  _type: 'sponsor';
  _key: string;
  callToActionURL: string;
  image?: Figure;
  title: string;
  url: string;
};
