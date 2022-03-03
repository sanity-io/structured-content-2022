export type Figure = {
  _type: 'figure';
  _key: string;
  alt?: string;
  caption?: string;
  asset: {
    _ref: string;
    _type: 'reference';
  };
};
