import Image from 'next/image';
import { imageUrlFor } from '../../../lib/sanity';
import ConferenceUpdatesForm from '../../ConferenceUpdatesForm';
import Heading from '../../Heading';
import RichText from '../RichText';
import SimpleCallToAction from '../SimpleCallToAction';
import VenuesSection from '../VenuesSection';
import SponsorsSection from '../SponsorsSection';

const Figure = ({ value: { alt, asset } }) => (
  <Image
    src={imageUrlFor(asset).size(200, 200).url()}
    width={200}
    height={200}
    alt={alt}
  />
);

export const SharedSections = ({
  value: { name, sections, ...rest },
  ...rest2
}) => (
  <>
    <Heading type="h2">{name}</Heading>
    {sections.map((section) => {
      switch (section._type) {
        case 'mailchimp':
        case 'mailchimpSection':
          return (
            <ConferenceUpdatesForm
              key={section._key}
              value={section}
              {...(rest as any)}
            />
          );
        case 'figure':
          return <Figure key={section._key} value={section} />;
        case 'richText':
        case 'articleSection':
          return <RichText key={section._key} value={section} />;
        case 'venuesSection':
          return <VenuesSection key={section._key} value={section} />;
        case 'simpleCallToAction':
          return (
            <SimpleCallToAction
              key={section._key}
              value={section}
              {...(rest as any)}
            />
          );
        case 'sponsors':
        case 'sponsorsSection':
          return <SponsorsSection key={section._key} value={section} />;
        default:
          console.error(
            `Unrecognized SharedSections section type '${section._type}'`
          );
          return null;
      }
    })}
  </>
);
