import { SimpleCallToAction as SimpleCallToActionProps } from '../../types/SimpleCallToAction';
import ButtonLink from '../ButtonLink';
import urlJoin from 'proper-url-join';

export const SimpleCallToAction = ({ text, link }: SimpleCallToActionProps) => {
  const openInNewTab = Boolean(link?.blank);
  if (text && link?.internal?.slug?.current) {
    return (
      <ButtonLink
        text={text}
        url={urlJoin(link.internal.slug.current)}
        openInNewTab={openInNewTab}
      />
    );
  }
  if (text && link?.external) {
    return (
      <ButtonLink text={text} url={link.external} openInNewTab={openInNewTab} />
    );
  }
  return null;
};
