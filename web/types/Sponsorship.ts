import { Sponsor, SponsorLevel } from './Sponsor';

export type Sponsorship = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: 'sponsorship';
  _updatedAt: string;
  available: number;
  offering: string[];
  passes?: {
    inPerson: number;
    online: number;
    workshop: number;
  };
  price: number;
  sponsors?: Omit<Sponsor, '_id'>[];
  type: SponsorLevel;
};
