import Image from 'next/image';
import { imageUrlFor } from '../../lib/sanity';
import Heading from '../Heading';
import { RichText } from './RichText';

const MailchimpSection = ({ value: { buttonText, id, title } }) => (
  <form>
    <label htmlFor={id}>{title}</label>
    <br />
    <input type="text" id={id} />
    <button>{buttonText}</button>
  </form>
);

const Figure = ({ value: { alt, asset } }) => (
  <Image
    src={imageUrlFor(asset).size(200, 200).url()}
    width={200}
    height={200}
    alt={alt}
  />
);

export const SharedSections = ({ value: { name, sections } }) => (
  <>
    <Heading type="h2">{name}</Heading>
    {sections.map((section) => {
      switch (section._type) {
        case 'mailchimp':
          return <MailchimpSection key={section._key} value={section} />;
        case 'figure':
          return <Figure key={section._key} value={section} />;
        case 'richText':
          return <RichText key={section._key} value={section} />;
        default:
          console.error(
            `Unrecognized SharedSections section type '${section._type}'`
          );
          return null;
      }
    })}
  </>
);
