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
}: PortableTextComponentProps<SimpleCallToActionProps>) => {
  const url = reference?.slug?.current ? `/${reference?.slug?.current}` : '#';
  return <ButtonLink text={text} url={url} />;
};
