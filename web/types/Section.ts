export type Section = {
  _key: string;
  _type: 'block';
  children: {
    _key: string;
    _type: 'span';
    marks: [];
    text: string;
  }[];
  markDefs: [];
  style: 'normal';
};
