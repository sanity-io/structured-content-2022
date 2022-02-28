import { SimpleCallToAction as SimpleCallToActionProps } from '../../../types/SimpleCallToAction';
import ButtonLink from '../ButtonLink';

export const SimpleCallToAction = ({
  text,
  url,
  reference,
}: SimpleCallToActionProps) =>
  text && reference?.slug?.current ? (
    <ButtonLink text={text} url={`/${reference?.slug?.current}`} />
  ) : text && url ? (
    <ButtonLink text={text} url={url} />
  ) : null;
