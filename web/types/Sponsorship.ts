import { Sponsor, SponsorLevel } from './Sponsor';

export type Sponsorship = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: 'sponsorship';
  _updatedAt: string;
  benefits?: {
    benefit: Benefit;
    number?: number;
    description?: string;
  }[];
  price: number;
  sponsors?: Omit<Sponsor, '_id'>[];
  type: SponsorLevel;
};

type Benefit = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: 'benefit';
  _updatedAt: string;
  name: string;
};
