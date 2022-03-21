import { SimpleCallToAction as SimpleCallToActionProps } from '../../types/SimpleCallToAction';
import ButtonLink from '../ButtonLink';
import { getEntityPath } from '../../util/entityPaths';

export const SimpleCallToAction = ({ text, link }: SimpleCallToActionProps) => {
  const openInNewTab = Boolean(link?.blank);
  if (text && link?.internal?.slug?.current) {
    return (
      <ButtonLink
        text={text}
        url={getEntityPath({
          _type: link.internal._type,
          slug: link.internal.slug,
        })}
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
