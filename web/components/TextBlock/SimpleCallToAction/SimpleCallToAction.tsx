import { PortableTextComponentProps } from '@portabletext/react';
import ButtonLink from '../../ButtonLink';

type SimpleCallToActionProps = {
  text: string;
  reference?: {
    slug?: {
      current: string;
    };
  };
};

export const SimpleCallToAction = ({
  value: { text, reference },
}: PortableTextComponentProps<SimpleCallToActionProps>) =>
  reference?.slug?.current ? (
    <ButtonLink text={text} url={`/${reference?.slug?.current}`} />
  ) : null;
