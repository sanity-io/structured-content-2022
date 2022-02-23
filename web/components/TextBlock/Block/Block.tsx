import RichText from '../RichText';
import Person from '../Person';
import Venue from '../Venue';

export const Block = ({ value }) =>
  value.children.map((child, index) => {
    if (!child._key && child._type) {
      switch (child._type) {
        case 'richText':
          return <RichText value={child} />;
        case 'person':
          return <Person value={child} />;
        case 'venue':
          return <Venue value={child} />;
        default:
          console.error(`Unknown Block child type: "${child._type}"`);
          return null;
      }
    }

    return <span key={index}>{child.text}</span>;
  });
