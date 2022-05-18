import { Section } from './Section';

export type TicketGroup = {
  name: string;
  soldOut?: boolean;
  priceAndAvailability: {
    _key: string;
    from: string;
    label: string;
    price: number;
  }[];
};

export type Ticket = {
  _id: string;
  _type: 'ticket';
  description?: Section[];
  groups?: TicketGroup[];
  included: string[];
  type: string;
};
