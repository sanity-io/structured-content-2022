import { NextSeo } from 'next-seo';
import urlJoin from 'proper-url-join';
import opengraphImage from '../../images/opengraph-image.png';
import { imageUrlFor } from '../../lib/sanity';
import { Figure } from '../../types/Figure';

interface MetaTagsProps {
  title: string;
  description: string;
  image?: Figure;
  currentPath: string;
  noIndex?: boolean;
  rewrittenArticleSlugs?: string[];
}

export const MetaTags = ({
  title,
  description,
  image,
  currentPath,
  noIndex,
  rewrittenArticleSlugs,
}: MetaTagsProps) => {
  const isRewrittenPath =
    Array.isArray(rewrittenArticleSlugs) &&
    rewrittenArticleSlugs.includes(
      urlJoin(currentPath, { leadingSlash: false })
    );
  const canonicalPath = isRewrittenPath
    ? urlJoin('article', currentPath)
    : currentPath;
  return (
    <NextSeo
      title={title}
      description={description}
      canonical={urlJoin('https://structuredcontent.live', canonicalPath)}
      noindex={noIndex}
      openGraph={{
        images: [
          image
            ? {
                url: imageUrlFor(image)
                  .ignoreImageParams()
                  .size(1260, 630)
                  .url(),
                alt: image.alt,
              }
            : {
                url: opengraphImage.src,
                width: opengraphImage.width,
                height: opengraphImage.height,
              },
        ],
      }}
      twitter={{
        cardType: 'summary_large_image',
        site: '@sanity_io',
        handle: '@sanity_io',
      }}
    />
  );
};
