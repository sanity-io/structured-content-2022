export type Figure = {
  _type: 'figure';
  alt?: string;
  caption?: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
};
