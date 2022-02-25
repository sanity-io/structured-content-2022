import { Section } from "./Section";

export type Ticket = {
  _id: string;
  _type: 'ticket';
  description?: Section[];
  included: string[];
  priceAndAvailability: {
    _key: string;
    _type: 'available';
    from: string;
    label: string;
    price: number;
  }[];
  type: string;
};
