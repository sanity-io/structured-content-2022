export type Ticket = {
  _id: string;
  type: string;
  price: number;
  included: ['workshop', 'recordings'];
};
