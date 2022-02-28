import { PortableTextComponentProps } from '@portabletext/react';
import { SimpleCallToAction as SimpleCallToActionProps } from '../../../types/SimpleCallToAction';
import Cta from '../../SimpleCallToAction';

export const SimpleCallToAction = ({
  value,
}: PortableTextComponentProps<SimpleCallToActionProps>) => <Cta {...value} />;
