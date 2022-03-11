import { SimpleCallToAction as SimpleCallToActionProps } from '../../types/SimpleCallToAction';
import ButtonLink from '../ButtonLink';
import urlJoin from 'proper-url-join';

export const SimpleCallToAction = ({ text, link }: SimpleCallToActionProps) => {
  const openInNewTab = Boolean(link?.blank);
  return text && link?.internal?.slug?.current ? (
    <ButtonLink
      text={text}
      url={urlJoin(link.internal.slug.current)}
      openInNewTab={openInNewTab}
    />
  ) : text && link?.external ? (
    <ButtonLink text={text} url={link.external} openInNewTab={openInNewTab} />
  ) : null;
};
