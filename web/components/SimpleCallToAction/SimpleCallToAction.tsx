import { SimpleCallToAction as SimpleCallToActionProps } from '../../types/SimpleCallToAction';
import ButtonLink from '../ButtonLink';
import urlJoin from 'proper-url-join';

export const SimpleCallToAction = ({
  text,
  url,
  reference,
}: SimpleCallToActionProps) =>
  text && reference?.slug?.current ? (
    <ButtonLink text={text} url={urlJoin(reference?.slug?.current)} />
  ) : text && url ? (
    <ButtonLink text={text} url={url} />
  ) : null;
