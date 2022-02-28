import { PortableTextComponentProps } from '@portabletext/react';
import { SimpleCallToAction as SimpleCallToActionProps } from '../../../types/SimpleCallToAction';
import ButtonLink from '../../ButtonLink';

export const SimpleCallToAction = ({
  value: { text, reference },
}: PortableTextComponentProps<SimpleCallToActionProps>) =>
  reference?.slug?.current ? (
    <ButtonLink text={text} url={`/${reference?.slug?.current}`} />
  ) : null;
